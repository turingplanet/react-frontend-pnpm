import { Button, Tooltip } from "@mui/material";

import React from "react";

function CompanyDetails({
  companyInfo,
  chosenCompany,
  companyDict,
  deleteCompany,
  handleOpenCompanyOverview,
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "25px" }}>
      {companyInfo &&
        companyInfo.map((company, index) => (
          <div
            style={{
              float: "left",
              width: `${100 / chosenCompany.length}%`,
              cursor: "pointer",
            }}
            key={index}
          >
            <div
              style={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                style={{
                  color: "black",
                  borderRadius: "10px",
                  borderColor: "gray",
                  boxShadow: "4px 4px 8px #bdbdbd", // Shadow for depth
                  margin: "4px",
                }}
                onClick={() => handleOpenCompanyOverview(company)}
              >
                {company}
              </Button>
              <span
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  fontWeight: "bold",
                  margin: "4px",
                }}
                onClick={() => deleteCompany(company)}
              >
                X
              </span>
            </div>
            <Tooltip
              title={
                <>
                  <p>
                    Market Capitalization: The total value of a company's
                    outstanding shares of stock.
                  </p>
                  <p>
                    Value:{" "}
                    {companyDict[
                      company
                    ]?.MarketCapitalization.toLocaleString() || "N/A"}
                  </p>
                </>
              }
            >
              <div
                id={`compare-${index + 1}-1`}
                style={{
                  padding: "10px",
                  margin: "2px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                {companyDict[company]?.MarketCapitalization.toLocaleString() ||
                  "N/A"}
              </div>
            </Tooltip>

            <Tooltip
              title={
                <>
                  <p>
                    PEGRatio: A stock's price/earnings-to-growth ratio, measures
                    a stock's valuation relative to its growth prospects.
                  </p>
                  <p>Value: {companyDict[company]?.PEGRatio || "N/A"}</p>
                </>
              }
            >
              <div
                id={`compare-${index + 1}-2`}
                style={{
                  padding: "10px",
                  margin: "2px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                {companyDict[company]?.PEGRatio || "N/A"}
              </div>
            </Tooltip>

            <Tooltip
              title={
                <>
                  <p>
                    Beta: A measure of a stock's volatility in relation to the
                    overall market.
                  </p>
                  <p>Value: {companyDict[company]?.Beta || "N/A"}</p>
                </>
              }
            >
              <div
                id={`compare-${index + 1}-3`}
                style={{
                  padding: "10px",
                  margin: "2px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                {companyDict[company]?.Beta || "N/A"}
              </div>
            </Tooltip>
          </div>
        ))}
    </div>
  );
}

export default CompanyDetails;
