export interface TrackPoint {
  lat: number;
  lng: number;
  ele: number;
  dist: number; // cumulative km from start
}

export interface GpxStats {
  totalDist: number; // km
  elevGain: number;  // m
  elevLoss: number;  // m
  minEle: number;    // m
  maxEle: number;    // m
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function parseGpx(xml: string): TrackPoint[] {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const nodes = Array.from(doc.querySelectorAll("trkpt,rtept"));

  const points: TrackPoint[] = [];
  let dist = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const lat = parseFloat(node.getAttribute("lat") ?? "0");
    const lng = parseFloat(node.getAttribute("lon") ?? "0");
    const eleEl = node.querySelector("ele");
    const ele = eleEl ? parseFloat(eleEl.textContent ?? "0") : 0;

    if (i > 0) {
      const prev = points[i - 1];
      dist += haversineKm(prev.lat, prev.lng, lat, lng);
    }

    points.push({ lat, lng, ele, dist });
  }

  return points;
}

export function downsample(points: TrackPoint[], maxN: number): TrackPoint[] {
  if (points.length <= maxN) return points;
  const step = (points.length - 1) / (maxN - 1);
  const result = Array.from({ length: maxN }, (_, i) =>
    points[Math.min(Math.round(i * step), points.length - 1)]
  );
  // Ensure last point is always the actual last point (for correct total distance)
  result[result.length - 1] = points[points.length - 1];
  return result;
}

export function calcStats(points: TrackPoint[]): GpxStats {
  if (!points.length) {
    return { totalDist: 0, elevGain: 0, elevLoss: 0, minEle: 0, maxEle: 0 };
  }

  let elevGain = 0;
  let elevLoss = 0;
  let minEle = points[0].ele;
  let maxEle = points[0].ele;

  for (let i = 1; i < points.length; i++) {
    const diff = points[i].ele - points[i - 1].ele;
    // Filter GPS noise — ignore sub-2m changes
    if (diff > 2) elevGain += diff;
    else if (diff < -2) elevLoss += Math.abs(diff);
    if (points[i].ele < minEle) minEle = points[i].ele;
    if (points[i].ele > maxEle) maxEle = points[i].ele;
  }

  return {
    totalDist: points[points.length - 1].dist,
    elevGain,
    elevLoss,
    minEle,
    maxEle,
  };
}
