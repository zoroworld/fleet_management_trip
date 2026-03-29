import React, { createContext, useState, useEffect, useMemo } from "react";
import trip1 from "../genrated_file/trip_1_cross_country.json";
import trip2 from "../genrated_file/trip_2_urban_dense.json";
import trip3 from "../genrated_file/trip_3_mountain_cancelled.json";
import trip4 from "../genrated_file/trip_4_southern_technical.json";
import trip5 from "../genrated_file/trip_5_regional_logistics.json";
import trip6 from "../genrated_file/trip_6_complete.json";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const allTrips = [trip1, trip2, trip3, trip4, trip5, trip6];

  const [tripState, setTripState] = useState(
    allTrips.map((trip) => ({
      tripId: trip.tripId,
      tripName: trip.tripName,
      tripRoute: trip.route,
      driver: trip.driver,
      status: trip.status,
      currentEventIndex: 0,
      position: [trip.route.start.lat, trip.route.start.lng], // start at first location
      events: trip.events,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTripState((prev) =>
        prev.map((t) => {
          const currentEvent = t.events[t.currentEventIndex];
          const data = currentEvent.data;

          
          const pos = [data.location.lat, data.location.lng];
          // console.log(data);
          

          let nextIndex = t.currentEventIndex;

          //  STOP if already completed or cancelled
          if (t.status === "COMPLETED" || t.status === "CANCELLED") {
            return { ...t, position: pos };
          }

          //  STOP at alert locations (but DO NOT reset)
          if (data.alert && data.alert.type !== "NONE") {
            return { ...t, position: pos };
          }

          // ⏭ Move forward if possible
          if (t.currentEventIndex < t.events.length - 1) {
            nextIndex = t.currentEventIndex + 1;
          }

          const nextEvent = t.events[nextIndex];

          // ✅ Dynamic status update
          let newStatus = t.status;

          if (nextEvent.type === "ARRIVAL") {
            newStatus = "COMPLETED";
          } else if (nextEvent.type === "CANCELLED") {
            newStatus = "CANCELLED";
          } else {
            newStatus = "IN_PROGRESS";
          }

          return {
            ...t,
            position: [
              nextEvent.data.location.lat,
              nextEvent.data.location.lng,
            ],
            currentEventIndex: nextIndex,
            status: newStatus, // 🔥 FIXED
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // KPIs
  const kpis = useMemo(() => {
    const totalVehicles = tripState.length;

    let active = 0, completed = 0, cancelled = 0, alerts = 0;
    let totalSpeed = 0, totalFuel = 0;

    tripState.forEach((trip) => {
      const current = trip.events[trip.currentEventIndex].data;

      if (trip.status === "IN_PROGRESS") active++;
      else if (trip.status === "COMPLETED") completed++;
      else if (trip.status === "CANCELLED") cancelled++;

      if (current.alert && current.alert.type !== "NONE") alerts++;

      totalSpeed += Number(current.speed || 0);
      totalFuel += Number(current.fuel?.level || 0);
    });

    const avgSpeed = tripState.length ? (totalSpeed / tripState.length).toFixed(1) : 0;
    const avgFuel = tripState.length ? (totalFuel / tripState.length).toFixed(0) : 0;

    return [
      { id: "TOTAL_VEHICLES", title: "Total Vehicles", value: totalVehicles, icon: "🚚" },
      {
        id: "TRIP_STATUS", title: "Trip Status", stats: [
          { label: "Active", value: active, color: "success" },
          { label: "Completed", value: completed, color: "primary" },
          { label: "Cancelled", value: cancelled, color: "danger" },
        ]
      },
      { id: "AVG_SPEED", title: "Avg Speed", value: `${avgSpeed} km/h`, icon: "📈" },
      { id: "FUEL", title: "Avg Fuel", value: `${avgFuel}%`, icon: "⛽" },
      { id: "ALERTS", title: "Alerts Today", value: alerts, icon: "⚠️", trendType: "danger" }
    ];
  }, [tripState]);


  const chartData = useMemo(() => {
    return {
      fuelData: {
        labels: tripState.map(t => t.driver),
        datasets: [{
          label: "Fuel Level (%)",
          data: tripState.map(t => t.events[t.currentEventIndex].data.fuel.level),
          backgroundColor: "rgba(13,110,253,0.7)"
        }]
      },

      speedData: {
        labels: tripState.map(t => t.driver),
        datasets: [{
          label: "Speed (km/h)",
          data: tripState.map(t => t.events[t.currentEventIndex].data.speed),
          backgroundColor: "rgba(25,135,84,0.7)"
        }]
      },

      weatherData: {
        labels: tripState.map(t => t.driver),
        datasets: [{
          label: "Temperature (°C)",
          data: tripState.map(t => t.events[t.currentEventIndex].data.weather.temperature),
          backgroundColor: "rgba(255,193,7,0.7)"
        }]
      },

      // ✅ NEW: Trip Progress
      progressData: {
        labels: tripState.map(t => t.driver),
        datasets: [{
          label: "Trip Progress (%)",
          data: tripState.map(t => t.events[t.currentEventIndex].data.progress),
          borderColor: "#6f42c1",
          backgroundColor: "rgba(111,66,193,0.2)",
          tension: 0.4
        }]
      },

      // ✅ NEW: Traffic Distribution
      trafficData: (() => {
        const trafficCount = { LOW: 0, MEDIUM: 0, DENSE: 0 };

        tripState.forEach(t => {
          const traffic = t.events[t.currentEventIndex].data.environment.traffic;
          if (trafficCount[traffic] !== undefined) {
            trafficCount[traffic]++;
          }
        });

        return {
          labels: ["Low", "Medium", "Dense"],
          datasets: [{
            label: "Traffic Conditions",
            data: [
              trafficCount.LOW,
              trafficCount.MEDIUM,
              trafficCount.DENSE
            ],
            backgroundColor: [
              "#198754",  // green
              "#ffc107",  // yellow
              "#dc3545"   // red
            ]
          }]
        };
      })()

    };
  }, [tripState]);

  const alertsAndLogs = useMemo(() => {
    let alerts = [];
    let logs = [];

    tripState.forEach((trip) => {
      trip.events.forEach((event, index) => {
        const data = event.data;

        const logItem = {
          id: `${trip.tripId}_${event.eventId}`,
          tripId: trip.tripId,
          tripName: trip.tripName,
          driver: trip.driver,
          type: event.type,
          timestamp: event.timestamp,
          location: data.location.name,
          speed: data.speed,
          fuel: data.fuel.level,
        };

        logs.push(logItem);

        // ✅ Only push alerts if severity exists
        if (data.alert && data.alert.type && data.alert.type !== "NONE") {
          alerts.push({
            ...logItem,
            alertType: data.alert.type,
            severity: data.alert.severity,
            message: data.alert.message,
          });
        }
      });
    });

    // Sort latest first
    alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return { alerts, logs };
  }, [tripState]);

  return (
    <TripContext.Provider value={{
      tripState, allTrips, kpis, chartData, alerts: alertsAndLogs.alerts,
      logs: alertsAndLogs.logs
    }}>
      {children}
    </TripContext.Provider>
  );
};