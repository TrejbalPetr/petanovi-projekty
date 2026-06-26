"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { colors, mono, sans } from "@/lib/typography";

const SIZE = 5;
type Board = boolean[][];

function applyClick(board: Board, row: number, col: number): Board {
  const next = board.map((r) => [...r]);
  const dirs = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of dirs) {
    const r = row + dr, c = col + dc;
    if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) next[r][c] = !next[r][c];
  }
  return next;
}

function makePuzzle(): Board {
  let board: Board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(false));
  const clicks = 12 + Math.floor(Math.random() * 9);
  for (let i = 0; i < clicks; i++) {
    board = applyClick(board, Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE));
  }
  if (board.flat().every((c) => !c)) return makePuzzle();
  return board;
}

function getRating(moves: number): { label: string; color: string } {
  if (moves <= 18) return { label: "EFEKTIVITA: MAXIMÁLNÍ ★★★", color: colors.yellow };
  if (moves <= 30) return { label: "EFEKTIVITA: USPOKOJIVÁ ★★☆", color: colors.blue };
  return { label: "EFEKTIVITA: PŘIJATELNÁ ★☆☆", color: colors.textSecondary };
}

export default function GamePage() {
  const router = useRouter();
  const [board, setBoard] = useState<Board>(() => makePuzzle());
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleClick = useCallback(
    (r: number, c: number) => {
      if (solved) return;
      setBoard((prev) => {
        const next = applyClick(prev, r, c);
        if (next.flat().every((cell) => !cell)) setSolved(true);
        return next;
      });
      setMoves((m) => m + 1);
    },
    [solved]
  );

  // Spustí se jednou při výhře — spolehlivý interval místo chained state timeoutů
  useEffect(() => {
    if (!solved) return;
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        router.push("/");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [solved, router]);

  function restart() {
    setBoard(makePuzzle());
    setMoves(0);
    setSolved(false);
    setCountdown(3);
  }

  const rating = getRating(moves);

  return (
    <div style={{ padding: "5rem 2rem 8rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span className="font-mono" style={{ color: colors.blue, fontSize: mono.base, letterSpacing: "0.12em", display: "block", marginBottom: "0.75rem" }}>
          MINI_GAME // LIGHTS_OUT
        </span>
        <h1 style={{ fontSize: sans.h1, fontWeight: 700, color: colors.yellow, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Lights Out
        </h1>
        <p style={{ color: colors.textSecondary, fontSize: sans.sm, lineHeight: 1.7, maxWidth: "400px", margin: "0 auto" }}>
          Vypni všechna světla. Kliknutím na políčko přepneš ho i všechny sousední.
        </p>
      </div>

      {/* Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 64px)`,
          gap: "6px",
          padding: "1.5rem",
          border: `1px solid ${solved ? colors.yellow : colors.border}`,
          backgroundColor: colors.surface,
          marginBottom: "1.5rem",
          transition: "border-color 0.3s ease",
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: cell ? colors.yellow : colors.bg,
                border: `1px solid ${cell ? colors.yellow : colors.borderMedium}`,
                cursor: solved ? "default" : "pointer",
                borderRadius: "2px",
                transition: "background-color 0.1s ease, border-color 0.1s ease",
                boxShadow: cell ? `0 0 12px ${colors.yellowBorder}` : "none",
              }}
            />
          ))
        )}
      </div>

      {/* Move counter */}
      <span className="font-mono" style={{ color: colors.textSecondary, fontSize: mono.md, letterSpacing: "0.1em", marginBottom: "2rem" }}>
        TAHY: {String(moves).padStart(3, "0")}
      </span>

      {/* Solved banner */}
      {solved && (
        <div
          className="font-mono"
          style={{
            textAlign: "center",
            padding: "2rem 3rem",
            border: `2px dashed ${colors.yellow}`,
            backgroundColor: colors.yellowMuted,
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          <span style={{ color: colors.yellow, fontSize: "1.1rem", letterSpacing: "0.1em", fontWeight: 700 }}>
            ✓ VŠECHNA SVĚTLA ZHASLA
          </span>
          <span style={{ color: colors.textPrimary, fontSize: mono.base, letterSpacing: "0.05em" }}>
            Dokončeno v {moves} tazích.
          </span>
          <span style={{ color: rating.color, fontSize: mono.base, letterSpacing: "0.08em" }}>
            {rating.label}
          </span>
          <div style={{ borderTop: `1px solid ${colors.borderSubtle}`, marginTop: "0.5rem", paddingTop: "0.75rem" }}>
            <span style={{ color: colors.textSecondary, fontSize: mono.sm, letterSpacing: "0.05em" }}>
              Přesměrování na základnu za {countdown}s...
            </span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={restart} className="btn-secondary">
          RESTART
        </button>
      </div>

    </div>
  );
}
