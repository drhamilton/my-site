import React from "react";
import { CodeChip } from "../CodeChip/CodeChip.jsx";

/**
 * IdentityPanel — the home/hero: yellow signage panel with an ink stripe,
 * mono eyebrow, big Helvetica name, role, and a numbered nav list.
 */
export function IdentityPanel({
  eyebrow = "Portfolio · DH/SIG",
  name = "Dillon\nHamilton",
  role = "Software Engineer",
  items = [
    { code: "01", label: "Projects" },
    { code: "02", label: "Résumé" },
  ],
  footerLeft = "Sections",
  style,
  className,
}) {
  return (
    <div
      className={className}
      style={{
        boxSizing: "border-box",
        width: 330,
        border: "3px solid #16150f",
        background: "#f4c500",
        color: "#16150f",
        ...style,
      }}
    >
      <div style={{ height: 5, background: "#16150f" }} />
      <div style={{ padding: "24px 22px 18px" }}>
        <p style={{ fontFamily: "var(--sig-font-mono)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.65, margin: 0 }}>
          {eyebrow}
        </p>
        <h2 style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 0.9, margin: "14px 0 0", whiteSpace: "pre-line" }}>
          {name}
        </h2>
        <p style={{ fontSize: 14, fontWeight: 700, opacity: 0.72, margin: "8px 0 0" }}>{role}</p>
        <ul style={{ listStyle: "none", margin: "22px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
          {items.map((it, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CodeChip label={it.code} tone="outline" />
              <span style={{ fontSize: 15, fontWeight: 700 }}>{it.label}</span>
            </li>
          ))}
        </ul>
        <p style={{ fontFamily: "var(--sig-font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6, margin: "22px 0 0", display: "flex", justifyContent: "space-between", borderTop: "2px solid rgba(22,21,15,0.25)", paddingTop: 12 }}>
          <span>{footerLeft}</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </p>
      </div>
    </div>
  );
}
