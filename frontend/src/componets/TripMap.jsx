import React, { useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { TripContext } from "../context/TripContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Truck icon
const createTruckIcon = (tripId, fuel) =>
  L.divIcon({
    html: `
      <div style="
        display:flex;
        flex-direction:column;
        align-items:center;
        font-size:26px;
        transform: translateY(-5px);
      ">
        🚚
        <span style="
          font-size:11px;
          background:#fff;
          padding:2px 4px;
          border-radius:4px;
          box-shadow:0 0 3px rgba(0,0,0,0.5);
          margin-top:2px;
        ">${tripId}</span>

        <div style="
          margin-top:2px;
          width:28px;
          height:4px;
          background:#ddd;
          border-radius:2px;
          overflow:hidden;
        ">
          <div style="
            width:${fuel}%;
            height:100%;
            background:${fuel < 30 ? "#dc3545" : fuel < 60 ? "#ffc107" : "#28a745"};
            transition: width 0.5s ease;
          "></div>
        </div>
      </div>
    `,
    className: "",
    iconSize: [35, 45],
    iconAnchor: [17, 45],
  });

const TripMap = () => {
  const { tripState } = useContext(TripContext);

  const center = [39.8283, -98.5795];

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {tripState.map((trip, index) => {
        // ✅ SAFE INDEX (fix missing trips)
        const safeIndex =
          trip.currentEventIndex < 0
            ? 0
            : Math.min(trip.currentEventIndex, trip.events.length - 1);

        const event = trip.events[safeIndex].data;

        // ✅ STABLE OFFSET (no overlap, no flicker)
        const offset = (index + 1) * 0.05;

        const markerPosition = [
          trip.position[0] + offset,
          trip.position[1] + offset,
        ];

        // ✅ FULL PATH (includes route start)
        const path = [
          [trip.tripRoute.start.lat, trip.tripRoute.start.lng],
          ...trip.events.map((e) => [
            e.data.location.lat,
            e.data.location.lng,
          ]),
        ];

        // Dynamic route color
        let lineColor = "#0d6efd"; // green
        

        return (
          <React.Fragment key={trip.tripId}>
            {/* 🚚 Marker */}
            <Marker
              position={markerPosition}
              icon={createTruckIcon(trip.tripId, event.fuel.level)}
            >
              <Popup>
                <div style={{ width: "220px" }}>
                  <h6 className="mb-1">{trip.tripName}</h6>

                  <p className="mb-1">
                    👨‍✈️ <strong>{trip.driver}</strong>
                  </p>

                  <span
                    className={`badge bg-${trip.status === "IN_PROGRESS"
                      ? "warning"
                      : trip.status === "COMPLETED"
                        ? "success"
                        : "danger"
                      }`}
                  >
                    {trip.status.replace("_", " ")}
                  </span>

                  <hr className="my-2" />

                  <p className="mb-1">⛽ Fuel: {event.fuel.level}%</p>
                  <p className="mb-1">📈 Speed: {event.speed} km/h</p>
                  <p className="mb-1">
                    ⚠{" "}
                    {event.alert?.type !== "NONE"
                      ? event.alert.type
                      : "No Alerts"}
                  </p>

                  <small>📍 {event.location.name}</small>
                </div>
              </Popup>
            </Marker>

            {/* 🛣 Route */}
            <Polyline
              positions={path}
              color={lineColor}
              weight={5}
              opacity={0.7}
              dashArray={trip.status === "COMPLETED" ? "5,5" : ""}
            />
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default TripMap;