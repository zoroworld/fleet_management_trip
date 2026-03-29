import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";

const AlertsPanel = () => {
  const { alerts } = useContext(TripContext);

  const getColor = (severity) => {
    switch (severity) {
      case "HIGH": return "danger";
      case "MEDIUM": return "warning";
      case "LOW": return "info";
      default: return "secondary";
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">⚠️ Alerts</h5>

        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {alerts.length === 0 && <p className="text-muted">No alerts</p>}

          {alerts.map((a) => (
            <div key={a.id} className={`alert alert-${getColor(a.severity)} py-2 mb-2`}>
              <strong>{a.alertType}</strong> - {a.message}
              <br />
              <small>
                {a.tripName} | {a.driver} | {a.location}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;