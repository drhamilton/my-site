import React from "react";
import { CodeChip } from "../CodeChip/CodeChip.jsx";
import { PixelAccent } from "../PixelAccent/PixelAccent.jsx";

/**
 * NavTile — blocky pixel nav tile: code chip top-left, living PixelAccent
 * top-right, name + sub below. Hard drop-shadow, hover lift.
 */
export function NavTile({
  code = "01",
  name = "About",
  sub = "who I am",
  lit = false,
  dark = false,
  href,
  accentSize = 40,
  style,
  className,
}) {
  // tolerate string props (e.g. when mounted via <x-import> in a template)
  lit = lit === true || lit === "true" || lit === "";
  dark = dark === true || dark === "true" || dark === "";
  accentSize = +accentSize || 40;
  const [hover, setHover] = React.useState(false);
  const bg = dark ? "#16150f" : lit ? "#f4c500" : "#f6f4ec";
  const fg = dark ? "#ffffff" : "#16150f";
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        boxSizing: "border-box",
        width: 212,
        border: "3px solid #16150f",
        background: bg,
        color: fg,
        padding: 16,
        boxShadow: hover ? "7px 7px 0 #16150f" : "5px 5px 0 #16150f",
        transform: hover ? "translate(-2px,-2px)" : "none",
        transition: "transform .08s, box-shadow .08s",
        cursor: href ? "pointer" : "default",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 26 }}>
        <CodeChip label={code} tone={dark ? "yellow" : "ink"} />
        <PixelAccent
          size={accentSize}
          grid={4}
          mode={dark ? "alive" : "solid"}
          color="#16150f"
          glow={dark ? 0.4 : 0}
        />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>{name}</div>
      <div
        style={{
          fontFamily: "var(--sig-font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.04em",
          color: dark ? "rgba(255,255,255,0.55)" : "rgba(22,21,15,0.6)",
          marginTop: 3,
        }}
      >
        {sub}
      </div>
    </Comp>
  );
}
