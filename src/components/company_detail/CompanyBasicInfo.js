import { Grid, Paper, Typography } from "@mui/material";

import React from "react";

function CompanyBasicInfo({ companyInfo }) {
  return (
    <div>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>{companyInfo.Description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Asset Type:</strong> {companyInfo.AssetType}
            </Typography>
            <Typography>
              <strong>CIK:</strong> {companyInfo.CIK}
            </Typography>
            <Typography>
              <strong>Exchange:</strong> {companyInfo.Exchange}
            </Typography>
            <Typography>
              <strong>Currency:</strong> {companyInfo.Currency}
            </Typography>
            <Typography>
              <strong>Country:</strong> {companyInfo.Country}
            </Typography>
            <Typography>
              <strong>Sector:</strong> {companyInfo.Sector}
            </Typography>
            <Typography>
              <strong>Industry:</strong> {companyInfo.Industry}
            </Typography>
            <Typography>
              <strong>Address:</strong> {companyInfo.Address}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Fiscal Year End:</strong> {companyInfo.FiscalYearEnd}
            </Typography>
            <Typography>
              <strong>Latest Quarter:</strong> {companyInfo.LatestQuarter}
            </Typography>
            <Typography>
              <strong>Market Capitalization:</strong>{" "}
              {companyInfo.MarketCapitalization}
            </Typography>
            <Typography>
              <strong>EBITDA:</strong> {companyInfo.EBITDA}
            </Typography>
            <Typography>
              <strong>PE Ratio:</strong> {companyInfo.PERatio}
            </Typography>
            <Typography>
              <strong>PEG Ratio:</strong> {companyInfo.PEGRatio}
            </Typography>
            <Typography>
              <strong>Book Value:</strong> {companyInfo.BookValue}
            </Typography>
            <Typography>
              <strong>Dividend Per Share:</strong>{" "}
              {companyInfo.DividendPerShare}
            </Typography>
            <Typography>
              <strong>Dividend Yield:</strong> {companyInfo.DividendYield}
            </Typography>
            <Typography>
              <strong>EPS:</strong> {companyInfo.EPS}
            </Typography>
            <Typography>
              <strong>Revenue Per Share TTM:</strong>{" "}
              {companyInfo.RevenuePerShareTTM}
            </Typography>
            <Typography>
              <strong>Profit Margin:</strong> {companyInfo.ProfitMargin}
            </Typography>
            <Typography>
              <strong>Operating Margin TTM:</strong>{" "}
              {companyInfo.OperatingMarginTTM}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default CompanyBasicInfo;
