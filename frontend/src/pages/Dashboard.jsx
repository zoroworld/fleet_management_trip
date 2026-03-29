import React, { useContext } from "react";
import Base from "./layout/Base";
import KpiCard from "../componets/KpiCard";
import TripTable from "../componets/TripTable";
import TripMap from "../componets/TripMap";
import { TripContext } from "../context/TripContext";
import ChartCard from "../componets/ChartCard";
import AlertsPanel from "../componets/Alerts";
import LogsPanel from "../componets/Logs";


function Dashboard() {

  const { kpis, chartData } = useContext(TripContext);

  const handleCardClick = (action) => {
    if (!action) return;

    switch (action) {
      case "GO_TO_TRIPS":
        console.log("/trips");
        break;
      case "GO_TO_ALERTS":
        console.log("/alerts");
        break;
      case "GO_TO_DRIVERS":
        console.log("/drivers");
        break;
      default:
        console.log("No action");
    }
  };

  return (
    <Base>
      <div className="container-fluid">
        <div className="row g-3">
          {kpis.map((kpi) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6"
              key={kpi.id}
            >
              <KpiCard
                {...kpi}
                onClick={
                  kpi.action
                    ? () => handleCardClick(kpi.action)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
        <div className="row py-3">
          <div className="col-md-6">
            <TripTable />
          </div>
          <div className="col-md-6"><TripMap /></div>
        </div>
        <div className="row py-3">
          <div className="col-md-4">
            <ChartCard title="Fuel Levels" type="pie" data={chartData.fuelData} />
          </div>
          <div className="col-md-4">
            <ChartCard title="Current Speed" type="bar" data={chartData.speedData} />
          </div>
          <div className="col-md-4">
            <ChartCard title="Temperature" type="line" data={chartData.weatherData} />
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-6">
            <AlertsPanel />
          </div>
          <div className="col-md-6">
            <LogsPanel />
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Dashboard;