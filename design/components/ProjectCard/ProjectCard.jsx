import React from "react";
import { CodeChip } from "../CodeChip/CodeChip.jsx";
import { PixelAccent } from "../PixelAccent/PixelAccent.jsx";

/**
 * ProjectCard — a work-showcase entry. Frontend projects get a demo pane
 * (children, or a striped placeholder); server / no-UI projects pass a mono
 * terminal block as children instead of a screenshot.
 */
export function ProjectCard({
  code = "P01",
  title = "Project",
  type = "frontend",
  description = "",
  tech = "",
  paneLabel = "demo",
  liveHref,
  repoHref,
  docsHref,
  caseHref,
  children,
  style,
  className,
}) {
  const server = type === "server" || type === "backend";
  const techs = String(tech).split(",").map((s) => s.trim()).filter(Boolean);
  const links = [
    liveHref && { l: "Live", h: liveHref, ext: true },
    repoHref && { l: "Repo", h: repoHref },
    docsHref && { l: "Docs", h: docsHref, ext: true },
    caseHref && { l: "Case study", h: caseHref },
  ].filter(Boolean);

  const hasPane = children != null && (!Array.isArray(children) || children.length > 0);

  return (
    <article
      className={className}
      style={{
        boxSizing: "border-box",
        border: "3px solid #16150f",
        background: "#f6f4ec",
        display: "flex",
        flexDirection: "column",
        boxShadow: "6px 6px 0 rgba(22,21,15,0.9)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "2px solid #16150f" }}>
        <CodeChip label={code} tone="outline" />
        <span
          style={{
            fontFamily: "var(--sig-font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 3,
            whiteSpace: "nowrap",
            background: server ? "#16150f" : "#f4c500",
            color: server ? "#f4c500" : "#16150f",
          }}
        >
          {server ? "Server · No UI" : "Frontend"}
        </span>
        <PixelAccent size={26} mode="solid" color="#16150f" glow={0} style={{ marginLeft: "auto" }} />
      </div>

      <div style={{ borderBottom: "2px solid #16150f" }}>
        {hasPane ? (
          children
        ) : (
          <div
            style={{
              height: 210,
              backgroundColor: "#d9d6c9",
              backgroundImage: "repeating-linear-gradient(135deg, rgba(22,21,15,0.07) 0 9px, transparent 9px 18px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--sig-font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(22,21,15,0.5)",
                whiteSpace: "nowrap",
                border: "1.5px dashed rgba(22,21,15,0.4)",
                padding: "8px 14px",
                background: "rgba(246,244,236,0.7)",
              }}
            >
              {paneLabel}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: "18px 18px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(22,21,15,0.75)", margin: "9px 0 0" }}>{description}</p>
        {techs.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "16px 0 0" }}>
            {techs.map((t, i) => (
              <span key={i} style={{ fontFamily: "var(--sig-font-mono)", fontSize: 10.5, color: "rgba(22,21,15,0.7)", border: "1px solid rgba(22,21,15,0.3)", borderRadius: 2, padding: "2px 7px" }}>
                {t}
              </span>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div style={{ display: "flex", gap: 16, margin: "18px 0 0", paddingTop: 14, borderTop: "1px solid rgba(22,21,15,0.15)" }}>
            {links.map((lk, i) => (
              <a key={i} href={lk.h} style={{ fontFamily: "var(--sig-font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", color: "#16150f", textDecoration: "none" }}>
                {lk.l}{lk.ext ? " ↗" : ""}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
