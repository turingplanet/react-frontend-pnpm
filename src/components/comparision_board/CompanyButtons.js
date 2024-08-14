import Button from "@mui/material/Button";
import React from "react";

function CompanyButtons({
  chosenCompany,
  headCompany,
  companyDict,
  deleteCompany,
  addNewCompanyInfo,
  defaultImageUrl,
  setCompanyMoreOpen,
}) {
  return (
    <>
      {headCompany
        .filter((company) => !chosenCompany.includes(company))
        .map((company_value, index) => (
          <Button
            variant="outlined"
            style={{
              margin: "5px",
              alignItems: "center",
              color: "black",
              borderColor: "#cfd8dc",
            }}
            onClick={() => addNewCompanyInfo(company_value)}
            key={index}
          >
            <img
              src={companyDict[company_value]?.image_url || defaultImageUrl}
              alt={`${company_value} logo`}
              style={{ width: "15px", height: "15px", marginRight: "5px" }}
            />
            {company_value}
          </Button>
        ))}

      <Button
        variant="outlined"
        style={{
          margin: "5px",
          alignItems: "center",
          color: "black",
          borderColor: "#cfd8dc",
        }}
        onClick={() => setCompanyMoreOpen((prev) => !prev)}
      >
        More
      </Button>

      <div
        style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}
      >
        {chosenCompany.map((company_value, index) => (
          <Button
            variant="contained"
            style={{
              margin: "5px",
              backgroundColor: "#eceff1",
              alignItems: "center",
              color: "black",
              borderColor: "#78909c",
            }}
            onClick={() => deleteCompany(company_value)}
            key={index}
          >
            <img
              src={companyDict[company_value]?.image_url || defaultImageUrl}
              alt={`${company_value} logo`}
              style={{ width: "15px", height: "15px", marginRight: "5px" }}
            />
            {company_value}
          </Button>
        ))}
      </div>
    </>
  );
}

export default CompanyButtons;
