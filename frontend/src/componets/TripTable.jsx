import React, { useState, useContext } from "react";
import { TripContext } from "../context/TripContext";

function TripTable() {
  const [openRow, setOpenRow] = useState(null);
  const { tripState } = useContext(TripContext);

  const toggleRow = (id) => setOpenRow(openRow === id ? null : id);

  const statusColor = (status) => {
    switch (status) {
      case "IN_PROGRESS": return "warning";
      case "COMPLETED": return "success";
      case "CANCELLED": return "danger";
      default: return "secondary";
    }
  };

  const alertColor = (alertType) => {
    switch (alertType) {
      case "FUEL_LOW":
      case "TECHNICAL_ISSUE":
      case "BREAKDOWN":
      case "WEATHER_ALERT": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-4 text-primary">🚛 Trip Management</h4>

        {/* Scrollable container */}
        <div style={{ maxHeight: "360px", overflowY: "auto" }}>
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light sticky-top" style={{ zIndex: 1 }}>
              <tr>
                <th>Trip ID</th>
                <th>Driver</th>
                <th>Status / Fuel / Speed / Alerts</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tripState.map((trip) => {
                const currentEvent = trip.events[trip.currentEventIndex].data;
                return (
                  <React.Fragment key={trip.tripId}>

                    {/* MAIN ROW */}
                    <tr
                      onClick={() => toggleRow(trip.tripId)}
                      style={{ cursor: "pointer" }}
                      className={openRow === trip.tripId ? "table-primary" : ""}
                    >
                      <td><strong>{trip.tripId}</strong></td>
                      <td>🚚 {trip.driver}</td>
                      <td>
                        <span className={`badge bg-${statusColor(trip.status)} me-1`}>
                          {trip.status.replace("_", " ")}
                        </span>
                        <span className="badge bg-info me-1">
                          ⛽ {currentEvent.fuel.level}%
                        </span>
                        <span className="badge bg-secondary me-1">
                          📈 {currentEvent.speed} km/h
                        </span>
                        <span className={`badge bg-${alertColor(currentEvent.alert?.type)}`}>
                          ⚠ {currentEvent.alert?.type || "None"}
                        </span>
                      </td>
                      <td>{openRow === trip.tripId ? "▲" : "▼"}</td>
                    </tr>

                    {/* EXPANDED ROW */}
                    {openRow === trip.tripId && (
                      <tr>
                        <td colSpan="4">
                          <div className="p-3 bg-light rounded shadow-sm">
                            <div className="row text-center">

                              <div className="col-md-2 mb-2">
                                <p className="mb-1 text-muted">Trip Name</p>
                                <strong>{trip.tripName}</strong>
                              </div>

                              <div className="col-md-2 mb-2">
                                <p className="mb-1 text-muted">Status</p>
                                <span className={`badge bg-${statusColor(trip.status)}`}>
                                  {trip.status.replace("_", " ")}
                                </span>
                              </div>

                              <div className="col-md-2 mb-2">
                                <p className="mb-1 text-muted">Fuel</p>
                                <div className="progress" style={{ height: "20px" }}>
                                  <div
                                    className="progress-bar bg-info"
                                    role="progressbar"
                                    style={{ width: `${currentEvent.fuel.level}%` }}
                                    aria-valuenow={currentEvent.fuel.level}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    {currentEvent.fuel.level}%
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-2 mb-2">
                                <p className="mb-1 text-muted">Speed</p>
                                <strong>{currentEvent.speed} km/h</strong>
                              </div>

                              <div className="col-md-2 mb-2">
                                <p className="mb-1 text-muted">Location</p>
                                <strong>{currentEvent.location.name}</strong>
                                <br />
                                <small>
                                  ({currentEvent.location.lat.toFixed(3)}, {currentEvent.location.lng.toFixed(3)})
                                </small>
                              </div>

                              <div className="col-md-2 mb-2">
                                <p className="mb-1 text-muted">Alert</p>
                                <span className={`badge bg-${alertColor(currentEvent.alert?.type)}`}>
                                  {currentEvent.alert?.type || "None"}
                                </span>
                                <br />
                                <small>{currentEvent.alert?.message || ""}</small>
                              </div>

                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default TripTable;