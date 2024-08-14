import Plot from "react-plotly.js";
import React from "react";

const CompanyDetailPlots = ({
  companyStockInfo,
  scatterData,
  cashFlowData,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {companyStockInfo && (
          <Plot
            data={companyStockInfo.map((data) => ({
              ...data,
              mode: "lines+markers",
              type: "scatter",
            }))}
            layout={{
              title: "Historical Stock Prices",
              yaxis: { title: "Stock Price (USD)" },
              showlegend: true,
              legend: {
                xanchor: "center", // Center the legend
                x: 0.5,
                y: -0.1,
                borderwidth: 1,
                orientation: "h", // Make the legend items display in a horizontal row instead of a vertical column
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plot
          data={scatterData}
          layout={{
            autosize: true,
            title: "Operating Cash Flow vs. Profit/Loss",
            yaxis: { title: "Amount (USD)" },
            legend: {
              x: 0.5, // Centered horizontally
              y: -0.3, // Positioned below the plot
              xanchor: "center", // Anchor the x-axis in the center
              orientation: "h", // Horizontal orientation
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
            title: "Quarterly Earnings Per Share (EPS)",
            yaxis: { title: "Earnings Per Share (EPS)" },
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
    </>
  );
};

export default CompanyDetailPlots;
