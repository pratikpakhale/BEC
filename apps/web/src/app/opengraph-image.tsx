import { ImageResponse } from "next/og";

export const alt = "Basaveshwar Engineering College, Bagalkote";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ORANGE = "#bf5700";
const SLATE = "#222a30";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: SLATE,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 16, height: 56, background: ORANGE }} />
          <div
            style={{
              color: "#cbd5e1",
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Est. 1963 · Autonomous
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              color: "white",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Basaveshwar Engineering College
          </div>
          <div style={{ color: ORANGE, fontSize: 44, fontWeight: 600 }}>
            Bagalkote, Karnataka
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#94a3b8",
            fontSize: 28,
          }}
        >
          <div>Affiliated to VTU, Belagavi</div>
          <div style={{ color: "#e2e8f0", fontWeight: 600 }}>becbgk.edu</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

// Required by the static export: a metadata route has to say it is built once.
export const dynamic = "force-static";
