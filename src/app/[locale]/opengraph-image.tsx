import { ImageResponse } from "next/og";

export const alt = "ClinoraX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #071016 0%, #0f1c24 55%, #115e59 100%)",
          color: "#e8eef2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, color: "#2dd4bf", marginBottom: 18 }}>
          ClinoraX
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          The Clinic Management Platform
        </div>
        <div style={{ fontSize: 28, color: "#9bb0bc", marginTop: 24 }}>
          Run your clinic. Not the paperwork.
        </div>
      </div>
    ),
    { ...size },
  );
}
