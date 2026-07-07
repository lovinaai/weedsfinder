import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "WeedsFinder — Cannabis strains, laws, and dosing tools";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(74,222,128,0.18), #0a0e0b 60%), #0a0e0b",
          color: "#eaf0e7",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "linear-gradient(135deg, #5ce992, #22c55e 50%, #15803d)",
            }}
          />
          <span>
            Weeds<span style={{ color: "#4ade80" }}>Finder</span>
          </span>
        </div>
        <div style={{ marginTop: 48, fontSize: 84, fontWeight: 600, letterSpacing: "-0.02em" }}>
          The world&rsquo;s cannabis,
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 600 }}>
          <span style={{ color: "#4ade80" }}>under</span>
          <span style={{ color: "#a3e635" }}>sto</span>
          <span style={{ color: "#f5c518" }}>od.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 30, color: "#9aa596" }}>
          Strain guides, law summaries, and dosing calculators.
        </div>
      </div>
    ),
    size
  );
}
