import React from "react";
import { Eye, Navigation, ExternalLink } from "lucide-react";

const ROSTER = ["Sita Rai", "Anil Gurung", "Maya Tamang", "Kiran Thapa"];

const styles = `
  .sdc-root {
    --ink: #16213A;
    --muted: #647082;
    --paper: #E1EBF0;
    --card: #FFFFFF;
    --pickup: #2E7D5B;
    --drop: #B3541E;
    --route: #065B80;
    --staff: #5B4B8A;
    --line: #E3E7E6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    width: 100%;
  }

  @keyframes sdc-card-in {
    from { opacity: 0; transform: translateY(10px) scale(0.985); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes sdc-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sdc-dash-flow {
    to { stroke-dashoffset: -64; }
  }
  @keyframes sdc-pulse-pickup {
    0%   { transform: scale(0.9); opacity: 0.55; }
    70%  { transform: scale(2.6); opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes sdc-pulse-drop {
    0%   { transform: scale(0.9); opacity: 0.55; }
    70%  { transform: scale(2.6); opacity: 0; }
    100% { opacity: 0; }
  }

  .sdc-card {
    width: 100%;
    max-width: 440px;
    background: var(--card);
    border-radius: 14px;
    box-shadow: 0 1px 2px rgba(22,33,58,0.06), 0 12px 28px rgba(22,33,58,0.10);
    overflow: hidden;
    animation: sdc-card-in 0.5s ease both;
    margin: 0 auto;
  }
  .sdc-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    border-bottom: 1px solid var(--line);
    background: #fff;
  }
  .sdc-who { display: flex; gap: 12px; }
  .sdc-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--route); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 600; font-size: 14px; flex-shrink: 0;
  }
  .sdc-name { font-size: 15px; font-weight: 600; line-height: 1.3; }
  .sdc-line { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
  .sdc-date { font-size: 12.5px; color: var(--muted); white-space: nowrap; padding-top: 2px; text-align: right; }

  .sdc-route-panel {
    position: relative;
    height: 460px;
    background:
      radial-gradient(circle, #BFD6E0 1px, transparent 1px) 0 0/16px 16px,
      var(--paper);
    overflow: hidden;
  }
  .sdc-route-panel svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .sdc-route-line { animation: sdc-dash-flow 2.6s linear infinite; }

  .sdc-stop {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 9px;
    opacity: 0;
    animation: sdc-fade-in 0.5s ease both;
    z-index: 5;
  }
  .sdc-dot-wrap { position: relative; width: 11px; height: 11px; flex-shrink: 0; }
  .sdc-dot {
    position: relative;
    width: 11px; height: 11px; border-radius: 50%;
    border: 2.5px solid #fff;
    box-shadow: 0 0 0 1px rgba(22,33,58,0.12);
    z-index: 1;
  }
  .sdc-dot.pickup { background: var(--pickup); }
  .sdc-dot.drop { background: var(--drop); }
  .sdc-ping {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    transform-origin: center;
  }
  .sdc-ping.pickup { background: var(--pickup); animation: sdc-pulse-pickup 2.2s ease-out infinite; }
  .sdc-ping.drop { background: var(--drop); animation: sdc-pulse-drop 2.2s ease-out infinite; animation-delay: 1.1s; }
  .sdc-kind { font-size: 13.5px; font-weight: 700; }
  .sdc-kind.pickup { color: var(--pickup); }
  .sdc-kind.drop { color: var(--drop); }
  .sdc-place { font-size: 14px; font-weight: 600; color: var(--ink); }

  .sdc-roster {
    position: absolute;
    background: var(--card);
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(22,33,58,0.06), 0 6px 16px rgba(22,33,58,0.10);
    padding: 9px 12px;
    width: 148px;
    opacity: 0;
    animation: sdc-fade-in 0.5s ease both;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 4;
  }
  .sdc-roster:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(22,33,58,0.08), 0 10px 22px rgba(22,33,58,0.14);
  }
  .sdc-roster-count { font-size: 11px; font-weight: 600; color: var(--staff); margin-bottom: 5px; }
  .sdc-roster ul { list-style: none; margin: 0; padding: 0; }
  .sdc-roster li { font-size: 12px; color: var(--ink); line-height: 1.55; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }

  .sdc-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: #fff;
    border-top: 1px solid var(--line);
    font-size: 12px;
    gap: 8px;
  }
`;

function Roster({ names = [], style, delay = 0 }) {
  const staffList = Array.isArray(names) ? names : [];
  if (staffList.length === 0) return null;

  return (
    <div className="sdc-roster" style={{ ...style, animationDelay: `${delay}s` }}>
      <div className="sdc-roster-count">Staff · {staffList.length}</div>
      <ul>
        {staffList.map((item, idx) => {
          const nameStr = typeof item === "string" ? item : (item?.full_name || item?.name || item?.staff_name || "Staff");
          return <li key={idx}>{nameStr}</li>;
        })}
      </ul>
    </div>
  );
}

function Stop({ type, time, place, style, delay = 0 }) {
  const label = type === "pickup" ? "Pickup" : "Drop";
  return (
    <div className="sdc-stop" style={{ ...style, animationDelay: `${delay}s` }}>
      <div className="sdc-dot-wrap">
        <div className={`sdc-ping ${type}`}></div>
        <div className={`sdc-dot ${type}`}></div>
      </div>
      <div>
        <div className={`sdc-kind ${type}`}>
          {label} {time ? `· ${time}` : ""}
        </div>
        <div className="sdc-place">{place || (type === "pickup" ? "Baneshwor" : "Bouddha")}</div>
      </div>
    </div>
  );
}

export default function ShuttleDispatchCard({
  driverName = "Rajesh Shrestha",
  vehicleNumber = "BA 2 KHA 3456",
  phoneNumber = "+977 98XXXXXXXX",
  date = "Sat, 5 Sep 2026",
  pickup = { place: "Baneshwor", time: "9:15 AM" },
  drop = { place: "Bouddha", time: "9:52 AM" },
  pickupStaff = ROSTER,
  dropStaff = ROSTER,
  status = "Scheduled",
  isDriver = false,
  onViewDetails,
}) {
  const initials = driverName
    ? driverName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "RS";

  const pStaff = Array.isArray(pickupStaff) && pickupStaff.length > 0 ? pickupStaff : ROSTER;
  const dStaff = Array.isArray(dropStaff) && dropStaff.length > 0 ? dropStaff : pStaff;

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup?.place || "Baneshwor")}&destination=${encodeURIComponent(drop?.place || "Bouddha")}`;

  return (
    <div className="sdc-root">
      <style>{styles}</style>
      <div className="sdc-card">
        {/* Card Header */}
        <div className="sdc-header">
          <div className="sdc-who">
            <div className="sdc-avatar">{initials}</div>
            <div>
              <div className="sdc-name">{driverName}</div>
              <div className="sdc-line">{vehicleNumber}</div>
              <div className="sdc-line">{phoneNumber}</div>
            </div>
          </div>
          <div className="sdc-date">
            <div>{date}</div>
            {isDriver ? (
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#4338ca", background: "#eef2ff", padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginTop: "4px" }}>
                🚗 Assigned Driver
              </span>
            ) : (
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#15803d", background: "#f0fdf4", padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginTop: "4px" }}>
                👥 Passenger
              </span>
            )}
          </div>
        </div>

        {/* Route Panel with Animated SVG Curve */}
        <div className="sdc-route-panel">
          <svg viewBox="0 0 400 460" preserveAspectRatio="none">
            <path
              className="sdc-route-line"
              d="M104 52 C 170 110, 210 260, 274 350"
              fill="none"
              stroke="#065B80"
              strokeWidth="2.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Pickup Stop & Pickup Staff Roster */}
          <Stop
            type="pickup"
            time={pickup?.time}
            place={pickup?.place}
            style={{ left: 88, top: 34 }}
            delay={0.05}
          />
          <Roster names={pStaff} style={{ left: 14, top: 90 }} delay={0.15} />

          {/* Drop-off Staff Roster & Drop Stop */}
          <Roster names={dStaff} style={{ left: 240, top: 190 }} delay={0.25} />
          <Stop
            type="drop"
            time={drop?.time}
            place={drop?.place}
            style={{ left: 250, top: 340 }}
            delay={0.35}
          />
        </div>

        {/* Card Actions Footer */}
        <div className="sdc-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--muted)" }}>Status:</span>
            <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{status}</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {onViewDetails && (
              <button
                type="button"
                onClick={onViewDetails}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#334155",
                }}
              >
                <Eye size={13} />
                Details
              </button>
            )}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "#08709d",
                color: "#fff",
                fontSize: "11.5px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Navigation size={12} />
              Directions
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
