import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { TripContext } from "../context/TripContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔷 Custom truck icon with fuel indicator and tripId
const createTruckIcon = (tripId, fuel) =>
  L.divIcon({
    html: `
      <div style="
        position: relative;
        display: flex; 
        flex-direction: column;
        align-items: center;
        font-size: 26px;
        text-shadow: 0 0 3px #000;
      ">
        🚚
        <span style="
          font-size: 12px; 
          background: #fff; 
          padding: 2px 4px; 
          border-radius: 4px; 
          box-shadow: 0 0 3px #000;
          margin-top: 2px;
        ">${tripId}</span>
        <div style="
          margin-top: 2px;
          width: 28px;
          height: 4px;
          background: #ccc;
          border-radius: 2px;
          overflow: hidden;
        ">
          <div style="
            width: ${fuel}%;
            height: 100%;
            background: linear-gradient(90deg, #28a745, #ffc107);
          "></div>
        </div>
      </div>
    `,
    className: "",
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
  });

const TripMap = () => {
  const { tripState } = useContext(TripContext);
  const center = [39.8283, -98.5795];

  return (
    <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {tripState.map((trip) => {
        const path = [
          [trip.tripRoute.start.lat, trip.tripRoute.start.lng],
          ...trip.events.map((e) => [e.data.location.lat, e.data.location.lng]),
          [trip.tripRoute.end.lat, trip.tripRoute.end.lng],
        ];

        const event = trip.events[trip.currentEventIndex].data;

        // 🔹 Polyline color based on alert
        let lineColor = "green";
        if (event.alert?.type && event.alert.type !== "NONE") {
          lineColor = "red";
        } else if (trip.status === "COMPLETED") {
          lineColor = "blue";
        }

        return (
          <React.Fragment key={trip.tripId}>
            <Marker
              position={[event.location.lat, event.location.lng]}
              icon={createTruckIcon(trip.tripId, event.fuel.level)}
            >
              <Popup>
                <div style={{ width: "200px" }}>
                  <h6 className="mb-1">{trip.tripName}</h6>
                  <p className="mb-1"><strong>Driver:</strong> {trip.driver}</p>
                  <p className="mb-1">
                    <span className={`badge bg-${trip.status === 'IN_PROGRESS' ? 'warning' : trip.status === 'COMPLETED' ? 'success' : 'danger'}`}>
                      {trip.status.replace("_"," ")}
                    </span>
                  </p>
                  <p className="mb-1">⛽ Fuel: {event.fuel.level}%</p>
                  <p className="mb-1">📈 Speed: {event.speed} km/h</p>
                  <p className="mb-1">⚠ Alert: {event.alert?.type || "None"}</p>
                  <small>📍 {event.location.name}</small>
                </div>
              </Popup>
            </Marker>

            <Polyline positions={path} color={lineColor} weight={5} opacity={0.6} />
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default TripMap;