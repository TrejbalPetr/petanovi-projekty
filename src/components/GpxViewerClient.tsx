"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { parseGpx, downsample, calcStats, type TrackPoint } from "@/lib/parseGpx";
import { colors, mono } from "@/lib/typography";

const MAPYCZ_KEY = process.env.NEXT_PUBLIC_MAPYCZ_API_KEY ?? "";
const MAX_POINTS = 800;

// ── Helpers ──────────────────────────────────────────────────────────────────

function nearestIndex(points: TrackPoint[], lat: number, lng: number): number {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < points.length; i++) {
    const d = (points[i].lat - lat) ** 2 + (points[i].lng - lng) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FitBounds({ points }: { points: TrackPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const lats = points.map((p) => p.lat);
    const lngs = points.map((p) => p.lng);
    map.fitBounds(
      [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ],
      { padding: [28, 28] }
    );
  }, [map, points]);
  return null;
}

function MapHoverHandler({
  points,
  onHover,
  onLeave,
}: {
  points: TrackPoint[];
  onHover: (lat: number, lng: number) => void;
  onLeave: () => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMove = (e: any) => onHover(e.latlng.lat, e.latlng.lng);
    const handleOut = () => onLeave();
    map.on("mousemove", handleMove);
    map.on("mouseout", handleOut);
    return () => {
      map.off("mousemove", handleMove);
      map.off("mouseout", handleOut);
    };
  }, [map, points, onHover, onLeave]);
  return null;
}

function StatItem({
  label, value, dim, mobile,
}: {
  label: string; value: string; dim?: boolean; mobile: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: mobile ? "row" : "column",
        justifyContent: mobile ? "space-between" : "flex-start",
        alignItems: mobile ? "center" : "flex-start",
        gap: mobile ? 0 : "4px",
        padding: mobile ? "5px 0" : 0,
        borderBottom: mobile ? "1px solid rgba(45,74,111,0.3)" : "none",
      }}
    >
      <span className="gpx-stat-label font-mono">{label}</span>
      <span
        className="gpx-stat-value font-mono"
        style={{ ...(dim ? { opacity: 0.4 } : {}), ...(mobile ? { fontSize: "0.8rem" } : {}) }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Custom Recharts Tooltip (we handle hover via ReferenceLine so hide default) ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HiddenTooltip = () => null as any;

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  gpxFile: string;
  title?: string;
}

export default function GpxViewerClient({ gpxFile, title }: Props) {
  const [pts, setPts] = useState<TrackPoint[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 499px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hasEle = useMemo(() => pts.some((p) => p.ele !== 0), [pts]);
  const stats = useMemo(() => calcStats(pts), [pts]);

  useEffect(() => {
    setStatus("loading");
    setPts([]);
    setHovered(null);
    fetch(gpxFile)
      .then((r) => {
        if (!r.ok) throw new Error(r.status.toString());
        return r.text();
      })
      .then((xml) => {
        const all = parseGpx(xml);
        setPts(downsample(all, MAX_POINTS));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [gpxFile]);

  const handleMapHover = useCallback(
    (lat: number, lng: number) => {
      if (!pts.length) return;
      setHovered(nearestIndex(pts, lat, lng));
    },
    [pts]
  );

  const handleMapLeave = useCallback(() => setHovered(null), []);

  // ── Render states ─────────────────────────────────────────────────────────

  if (status === "loading") {
    return (
      <div
        style={{
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          height: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <span
          className="font-mono"
          style={{
            color: colors.textMuted,
            fontSize: mono.base,
            letterSpacing: "0.15em",
          }}
        >
          LOADING_MAP...
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        style={{
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          padding: "1.5rem",
          margin: "2rem 0",
        }}
      >
        <span
          className="font-mono"
          style={{
            color: colors.orange,
            fontSize: mono.base,
            letterSpacing: "0.1em",
          }}
        >
          ERR // Nelze načíst GPX soubor: {gpxFile}
        </span>
      </div>
    );
  }

  const positions: [number, number][] = pts.map((p) => [p.lat, p.lng]);
  const hovPt = hovered !== null ? pts[hovered] : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        margin: "2rem 0",
        border: `1px solid ${colors.border}`,
        background: colors.surface,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "rgba(13, 37, 64, 0.8)",
          borderBottom: `1px solid ${colors.border}`,
          padding: "0.6rem 1rem",
        }}
      >
        <span
          className="font-mono"
          style={{
            color: colors.yellow,
            fontSize: mono.xs,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {title ? `TRASA // ${title}` : "GPX_TRASA"}
        </span>
      </div>

      {/* ── Stats bar ── */}
      <div
        style={{
          background: "rgba(13, 37, 64, 0.6)",
          borderBottom: `1px solid ${colors.borderSubtle}`,
          padding: "0.75rem 1rem",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 0 : "0.75rem 1.5rem",
        }}
      >
        <StatItem mobile={isMobile} label="VZDÁLENOST" value={`${stats.totalDist.toFixed(1)} km`} />
        <StatItem mobile={isMobile} label="PŘEVÝŠENÍ ↑" value={`${Math.round(stats.elevGain)} m`} />
        <StatItem mobile={isMobile} label="PŘEVÝŠENÍ ↓" value={`${Math.round(stats.elevLoss)} m`} />
        <StatItem mobile={isMobile} label="MAX. NADM. V." value={`${Math.round(stats.maxEle)} m n.m.`} />
      </div>

      {/* ── Map ── */}
      <div style={{ height: "380px", position: "relative" }}>
        <MapContainer
          center={
            pts.length ? [pts[Math.floor(pts.length / 2)].lat, pts[Math.floor(pts.length / 2)].lng] : [50, 15]
          }
          zoom={12}
          style={{ width: "100%", height: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://api.mapy.cz/copyright" target="_blank">Mapy.cz a OpenStreetMap</a>'
            url={`https://api.mapy.cz/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPYCZ_KEY}`}
            maxZoom={19}
          />

          {/* Shadow polyline for visibility against busy map tiles */}
          <Polyline
            positions={positions}
            pathOptions={{ color: "#0F2B47", weight: 7, opacity: 0.6 }}
          />
          <Polyline
            positions={positions}
            pathOptions={{ color: colors.yellow, weight: 4, opacity: 1 }}
          />

          {hovPt && (
            <CircleMarker
              center={[hovPt.lat, hovPt.lng]}
              radius={8}
              pathOptions={{
                color: colors.bg,
                fillColor: colors.yellow,
                fillOpacity: 1,
                weight: 2.5,
              }}
            />
          )}

          <FitBounds points={pts} />
          <MapHoverHandler
            points={pts}
            onHover={handleMapHover}
            onLeave={handleMapLeave}
          />
        </MapContainer>
      </div>

      {/* ── Elevation profile ── */}
      {hasEle && (
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            background: "rgba(13, 37, 64, 0.4)",
          }}
        >
          <div
            style={{
              padding: "0.5rem 1rem",
              borderBottom: `1px solid ${colors.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              className="font-mono"
              style={{
                color: colors.yellow,
                fontSize: mono.xs,
                letterSpacing: "0.15em",
              }}
            >
              PROFIL PŘEVÝŠENÍ
            </span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ minWidth: "6rem" }}>
                <StatItem mobile={false} label="POZICE" value={hovPt ? `${hovPt.dist.toFixed(2)} km` : "—"} dim={!hovPt} />
              </div>
              <div style={{ minWidth: "5rem" }}>
                <StatItem mobile={false} label="NADM. VÝŠKA" value={hovPt ? `${Math.round(hovPt.ele)} m` : "—"} dim={!hovPt} />
              </div>
            </div>
          </div>

          <div style={{ padding: "0.5rem 0.25rem 0.25rem", touchAction: "pan-y" }}>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={pts}
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
                onMouseMove={(data) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const d = data as any;
                  if (d.activeTooltipIndex !== undefined && d.activeTooltipIndex !== null) {
                    setHovered(d.activeTooltipIndex as number);
                  }
                }}
                onMouseLeave={() => setHovered(null)}
              >
                <defs>
                  <linearGradient id="gpxElevFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.yellow} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={colors.yellow} stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="dist"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(v: number) => `${v.toFixed(0)} km`}
                  tick={{
                    fill: "#7A9BB5",
                    fontFamily: "monospace",
                    fontSize: 11,
                  }}
                  tickLine={{ stroke: colors.border }}
                  axisLine={{ stroke: colors.border }}
                  tickCount={5}
                />

                <YAxis
                  dataKey="ele"
                  tickFormatter={(v: number) => `${Math.round(v)}m`}
                  tick={{
                    fill: "#7A9BB5",
                    fontFamily: "monospace",
                    fontSize: 11,
                  }}
                  tickLine={{ stroke: colors.border }}
                  axisLine={{ stroke: colors.border }}
                  width={46}
                  tickCount={5}
                />

                <Area
                  type="monotone"
                  dataKey="ele"
                  stroke={colors.yellow}
                  strokeWidth={2}
                  fill="url(#gpxElevFill)"
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />

                {/* Cursor synced with map hover */}
                {hovered !== null && pts[hovered] && (
                  <>
                    <ReferenceLine
                      x={pts[hovered].dist}
                      stroke={colors.yellow}
                      strokeOpacity={0.6}
                      strokeDasharray="4 3"
                      strokeWidth={1}
                    />
                    <ReferenceDot
                      x={pts[hovered].dist}
                      y={pts[hovered].ele}
                      r={5}
                      fill={colors.yellow}
                      stroke={colors.bg}
                      strokeWidth={2}
                    />
                  </>
                )}

                <Tooltip content={HiddenTooltip} cursor={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
