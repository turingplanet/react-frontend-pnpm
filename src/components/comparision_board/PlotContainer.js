import Plot from "react-plotly.js";
import React from "react";

const PlotContainer = ({ chartData, stockData, cashFlowData }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plot
          data={chartData}
          layout={{
            autosize: true,
            title: "Company Quarterly Earnings Per Share (EPS)",
            showlegend: true,
            legend: {
              x: 0.5,
              y: -0.1,
              xanchor: "center",
              borderwidth: 1,
              orientation: "h",
            },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plot
          data={stockData.map((data) => ({
            ...data,
            mode: "lines+markers",
            type: "scatter",
          }))}
          layout={{
            title: "Weekly Stock Closing Prices",
            showlegend: true,
            legend: {
              xanchor: "center",
              x: 0.5,
              y: -0.1,
              borderwidth: 1,
              orientation: "h",
            },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plot
          data={cashFlowData}
          layout={{
            autosize: true,
            title: "Operating Cash Flow and Market Valuation",
            xaxis: { title: "Fiscal Quarter Ending" },
            yaxis: { title: "Amount (USD)" },
            legend: { x: 0.5, y: -0.3, xanchor: "center", orientation: "h" },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
};

export default PlotContainer;
