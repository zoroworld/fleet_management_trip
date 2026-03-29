import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";

const LogsPanel = () => {
  const { logs } = useContext(TripContext);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">📜 Activity Logs</h5>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {logs.map((log) => (
            <div key={log.id} className="border-bottom mb-2 pb-2">
              <strong>{log.type}</strong> ({log.tripId})
              <br />
              <small>
                📍 {log.location} | 🚚 {log.driver} | ⛽ {log.fuel}% | 📈 {log.speed} km/h
              </small>
              <br />
              <small className="text-muted">
                {new Date(log.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogsPanel;