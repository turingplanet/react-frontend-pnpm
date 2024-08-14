import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";

import CompanyBasicInfo from "./CompanyBasicInfo";
import CompanyDetailPlots from "./CompanyDetailPlots";
import { NEW_RESTFUL_SERVER_URL } from "../utils/config";
import NewsSentimentTab from "./NewsSentimentTab";
import Plot from "react-plotly.js";
import ScoreEvaluationTab from "./ScoreEvaluationTab";
import { styled } from "@mui/system";
import { useParams } from "react-router";

const SelectedTab = styled(Tab)(({ theme }) => ({
  color: "black",
  fontWeight: "bold",
  borderBottom: "2px solid black",
}));

const monthMapping = {
  "0100": "Jan",
  "0200": "Feb",
  "0300": "Mar",
  "0400": "Apr",
  "0500": "May",
  "0600": "Jun",
  "0700": "Jul",
  "0800": "Aug",
  "0900": "Sep",
  1000: "Oct",
  1100: "Nov",
  1200: "Dec",
};

const convertDateFormat = (dateString) => {
  // return dateString.replace('-', '/');
  return dateString.replace("-", "");
};

const processStockDataByDate = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear(); // Extract year
    let monthDay = item.date.substring(5); // Get 'MM-DD' format
    monthDay = convertDateFormat(monthDay); // Converts to MM/DD format

    if (!groupedData[year]) {
      groupedData[year] = [];
    }
    groupedData[year].push({ ...item, monthDay });
  });

  return groupedData;
};

const getPlotDataByDate = (groupedData) => {
  return Object.keys(groupedData).map((year) => {
    const yearlyData = groupedData[year];
    return {
      x: yearlyData.map((item) => item.monthDay), // Sorted 'MM/DD' for x-axis
      y: yearlyData.map((item) => item["4. close"]), // Corresponding sorted values for y-axis
      text: yearlyData.map(
        (item) =>
          `(${year}-${item.monthDay.slice(0, 2)}-${item.monthDay.slice(2, 4)}, ${item["4. close"]}) `,
      ), // Custom hover text
      type: "scatter",
      mode: "lines+markers",
      name: year.toString(), // Name the series by year
      hoverinfo: "text", // Display only custom text on hover
    };
  });
};

function CompanyInfo() {
  const { symbol } = useParams();
  const [companyInfo, setCompanyInfo] = useState(null);
  const [companyStockInfo, setCompanyStockInfo] = useState(null);
  const [companyStockInfoByYear, setCompanyStockInfoByYear] = useState(null);
  const [value, setValue] = useState("1");
  // eslint-disable-next-line
  const [company_scores, set_company_scores] = useState({
    "Market Value": {
      score: 85,
      reason:
        "The company's market value is strong due to its consistent financial performance, diversified product line, and strong brand loyalty. Its market capitalization remains among the highest globally, reflecting its solid position in the market.",
    },
    Growth: {
      score: 75,
      reason:
        "While the company has shown substantial growth in the past, its growth rate has moderated in recent years. However, continuous innovation and expansion into new markets like streaming and financial services contribute to its favorable growth prospects.",
    },
    Risk: {
      score: 60,
      reason:
        "The company faces risks including market saturation in its core business, regulatory challenges, and global supply chain vulnerabilities. Nevertheless, its strong cash reserves and diversified revenue streams mitigate these risks to some extent.",
    },
    Overall: {
      score: 80,
      reason:
        "The company's overall score is high due to its robust financial health, innovative capabilities, and strong global brand. While challenges exist, the company's strategic initiatives and customer base position it well for sustained success.",
    },
  });
  const barColorList = useMemo(
    () => [
      "rgb(6, 136, 254)",
      "rgb(0, 196, 159)",
      "rgb(255, 187, 40)",
      "rgb(255, 129, 66)",
    ],
    [],
  );
  const [cashFlowData, setCashFlowData] = useState([]);
  const [scatterData] = useState([
    {
      type: "scatter",
      mode: "markers",
      x: [
        "2023-06-30",
        "2022-12-31",
        "2022-09-30",
        "2022-06-30",
        "2022-03-31",
        "2021-12-31",
        "2021-09-30",
        "2021-06-30",
        "2021-03-31",
      ],
      y: [
        26380000000, 34005000000, 24127000000, 22892000000, 28166000000,
        46966000000, 20200000000, 21094000000, 23981000000,
      ],
      marker: {
        color: barColorList[0],
        size: [
          30.83439159209909, 43.98094120649556, 31.925930751542904,
          30.263932436151673, 37.49927772160779, 50, 31.70502401689356,
          33.25526951357983, 35.70603481680725,
        ],
      },
      text: ["size: 30", "size: 80", "size: 50"], // Hover text
      name: "AAPL",
      profitLoss: [
        19881000000, 29998000000, 20721000000, 19442000000, 25010000000,
        34630000000, 20551000000, 21744000000, 23630000000,
      ],
    },
  ]);
  const [newsSentimentList, setNewsSentimentList] = useState([]);

  useEffect(() => {
    const getCompanyOverview = async () => {
      try {
        const response = await fetch(
          `${NEW_RESTFUL_SERVER_URL}/company_overview?symbol=${symbol}`,
        );
        const data = await response.json();
        setCompanyInfo(data.response);
      } catch (error) {
        console.error("Error fetching company overview:", error);
      }
    };
    getCompanyOverview();
  }, [symbol]);

  useEffect(() => {
    const getStockInfo = async () => {
      fetch(
        `${NEW_RESTFUL_SERVER_URL}/stock_weekly_data?symbol=${symbol}&sort_field=date&sort_order=desc`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          setCompanyStockInfo(data);
          console.log("Stock history: ", data);
          data.sort((a, b) => new Date(a.date) - new Date(b.date));
          const dates = data.map((item) => item.date);
          const close = data.map((item) => item["4. close"]);
          setCompanyStockInfo([
            {
              x: dates,
              y: close,
              text: close.map((value) => `Close: ${value}`),
              type: "bar",
              name: symbol,
            },
          ]);
          console.log(data);
          const groupedByYear = processStockDataByDate(data);
          const plotData = getPlotDataByDate(groupedByYear);
          console.log(plotData);
          setCompanyStockInfoByYear(plotData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getStockInfo();
  }, [symbol]);

  useEffect(() => {
    const getCashFlowData = async () => {
      fetch(
        `${NEW_RESTFUL_SERVER_URL}/cash_flow?symbol=${symbol}&sort_field=fiscalDateEnding&sort_order=asc`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          const fiscalDateEnding = data.map((item) => item.fiscalDateEnding);
          const operatingCashflow = data.map((item) => item.operatingCashflow);
          const cashflowFromInvestment = data.map(
            (item) => item.cashflowFromInvestment,
          );
          const cashflowFromFinancing = data.map(
            (item) => item.cashflowFromFinancing,
          );
          const paymentsForRepurchaseOfCommonStock = data.map(
            (item) => item.paymentsForRepurchaseOfCommonStock,
          );
          setCashFlowData([
            {
              x: fiscalDateEnding,
              y: operatingCashflow,
              type: "bar",
              name: "operatingCashflow",
              marker: { color: barColorList[0] },
            },
            {
              x: fiscalDateEnding,
              y: cashflowFromInvestment,
              type: "bar",
              name: "cashflowFromInvestment",
              marker: { color: barColorList[1] },
            },
            {
              x: fiscalDateEnding,
              y: cashflowFromFinancing,
              type: "bar",
              name: "cashflowFromFinancing",
              marker: { color: barColorList[2] },
            },
            {
              x: fiscalDateEnding,
              y: paymentsForRepurchaseOfCommonStock,
              type: "bar",
              name: "paymentsForRepurchaseOfCommonStock",
              marker: { color: barColorList[3] },
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCashFlowData();
  }, [symbol, barColorList]);

  useEffect(() => {
    const getNewsSentiment = async () => {
      try {
        const response = await fetch(
          `${NEW_RESTFUL_SERVER_URL}/news_sentiment?symbol=${symbol}&sort_field=time_published&sort_order=desc`,
        );
        const data = await response.json();
        setNewsSentimentList(data);
      } catch (error) {
        console.error("Error fetching news sentiment:", error);
      }
    };
    getNewsSentiment();
  }, [symbol]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <div style={{ margin: "10px 20px 5px 30px" }}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <img
            className="col-6"
            style={{
              float: "left",
              maxWidth: "30px",
              height: "30px",
              margin: "10px 10px 10px 0px",
            }}
            src={
              companyInfo && companyInfo["image_url"]
                ? companyInfo["image_url"]
                : "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png"
            }
            alt="icon"
          />
          <div
            style={{
              display: "flex",
              height: "50px",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            {companyInfo && companyInfo["Name"]}
          </div>
        </div>

        <table style={{ color: "grey" }}>
          <tbody>
            <tr>
              <td
                style={{ width: "50%", verticalAlign: "top", padding: "5px" }}
              >
                Symbol: {symbol}
                <br />
                Asset Type: {companyInfo && companyInfo["AssetType"]}
                <br />
                Exchange: {companyInfo && companyInfo["Exchange"]}
              </td>
              <td
                style={{ width: "50%", verticalAlign: "top", padding: "5px" }}
              >
                Sector: {companyInfo && companyInfo["Sector"]}
                <br />
                Industry: {companyInfo && companyInfo["Industry"]}
                <br />
                Address: {companyInfo && companyInfo["Address"]}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {companyStockInfoByYear && (
          <Plot
            data={companyStockInfoByYear.map((data) => ({
              ...data,
              mode: "lines+markers",
              type: "scatter",
            }))}
            layout={{
              title: {
                text: "Stock Price Trends",
                x: 0.5, // Center the title horizontally
                y: 0.1, // Adjust the y-position to move the title below the figure
                xanchor: "center",
                yanchor: "top", // Anchor the title from the top
              },
              xaxis: {
                tickvals: Object.keys(monthMapping),
                ticktext: Object.values(monthMapping),
              },
              showlegend: true,
              legend: {
                xanchor: "center",
                x: 0.5,
                y: 1.2,
                borderwidth: 1,
                orientation: "h",
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <div style={{ margin: "0px 30px" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="lab API tabs example"
              value={value}
            >
              <SelectedTab
                label="Basic Info"
                value="1"
                selected={value === "1"}
              />
              <SelectedTab label="Charts" value="2" selected={value === "2"} />
              <SelectedTab label="News" value="3" selected={value === "3"} />
              <SelectedTab
                label="Score Evaluation"
                value="4"
                selected={value === "4"}
              />
            </Tabs>
          </Box>

          <TabContext value={value}>
            <TabPanel
              value="1"
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            >
              {companyInfo && <CompanyBasicInfo companyInfo={companyInfo} />}
            </TabPanel>

            <TabPanel
              value="2"
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            >
              <CompanyDetailPlots
                companyStockInfo={companyStockInfo}
                scatterData={scatterData}
                cashFlowData={cashFlowData}
              />
            </TabPanel>

            <TabPanel
              value="3"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              <NewsSentimentTab newsSentimentList={newsSentimentList} />
            </TabPanel>

            <TabPanel
              value="4"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              <ScoreEvaluationTab company_scores={company_scores} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default CompanyInfo;
