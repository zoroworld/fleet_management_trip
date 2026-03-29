import React from "react";

function KpiCard({
  title,
  value,
  icon,
  trend,
  trendType = "neutral",
  bg = "light",
  onClick,
  stats = [] // ✅ default
}) {
  const isMulti = Array.isArray(stats) && stats.length > 0;

  return (
    <div
      className={`card shadow-sm border-0 bg-${bg}`}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <div className="card-body">

        {/* ✅ HEADER (COMMON FOR BOTH) */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          {title && <p className="text-muted mb-0">{title}</p>}
          {icon && <div style={{ fontSize: "22px" }}>{icon}</div>}
        </div>

        {/* ✅ MULTI STATS MODE */}
        {isMulti ? (
          <div className="row text-center">
            {stats.map((item, i) => (
              <div className="col" key={i}>
                <h5 className={`fw-bold text-${item.color || "dark"}`}>
                  {item.value}
                </h5>
                <small className="text-muted">{item.label}</small>
              </div>
            ))}
          </div>
        ) : (
          /* ✅ SINGLE KPI MODE */
          <div>
            <h4 className="fw-bold mb-0">{value}</h4>

            {trend && (
              <small
                className={
                  trendType === "success"
                    ? "text-success"
                    : trendType === "danger"
                    ? "text-danger"
                    : "text-muted"
                }
              >
                {trendType === "success" && "↑ "}
                {trendType === "danger" && "↓ "}
                {trend}
              </small>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default KpiCard;