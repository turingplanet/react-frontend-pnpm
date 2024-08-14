import {
  fetchCashFlowData,
  fetchCompanyOverview,
  fetchQuarterlyEarnings,
  fetchStockWeeklyData,
} from "./companyService";
import { useEffect, useState } from "react";

import CompanyButtons from "./CompanyButtons";
import CompanyDetails from "./CompanyDetails";
import CompanyDialogs from "./CompanyDialogs";
import { NEW_RESTFUL_SERVER_URL } from "../utils/config";
import PlotContainer from "./PlotContainer";

function Board() {
  const [companyInfo, setCompanyInfo] = useState([]);
  const chosenLimit = 4;
  const [chosenCompany, setChosenCompany] = useState(["AAPL", "MSFT", "AMZN"]);
  const headCompany = [
    "AAPL",
    "MSFT",
    "AMZN",
    "NVDA",
    "TSLA",
    "GOOG",
    "ADBE",
    "NFLX",
  ];
  const [companyDict, setCompanyDict] = useState({});
  const [companyList, setCompanyList] = useState([
    "INTU",
    "WMT",
    "FB",
    "AMZN",
    "UNH",
    "GOOGL",
    "JNJ",
    "V",
  ]);
  const [companyMoreOpen, setCompanyMoreOpen] = useState(false);
  const [companyOverviewOpen, setCompanyOverviewOpen] = useState(false);
  const [companyOverviewSymbol, setCompanyOverviewSymbol] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [barColorList, setBarColorList] = useState([
    "rgb(6, 136, 254)",
    "rgb(0, 196, 159)",
    "rgb(255, 187, 40)",
    "rgb(255, 129, 66)",
  ]);
  const default_image_url =
    "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png";

  const [chartData, setChartData] = useState([
    {
      x: ["Q1", "Q2", "Q3", "Q4"],
      y: [1.29, 1.88, 1.52, 1.26],
      type: "bar",
      name: "AAPL",
      marker: { color: barColorList[0] },
    },
    {
      x: ["Q1", "Q2", "Q3", "Q4"],
      y: [2.35, 2.32, 2.45, 2.69],
      type: "bar",
      name: "MSFT",
      marker: { color: barColorList[1] },
    },
    {
      x: ["Q1", "Q2", "Q3", "Q4"],
      y: [0.17, 0.25, 0.31, 0.65],
      type: "bar",
      name: "AMZN",
      marker: { color: barColorList[2] },
    },
  ]);

  const [stockData, setStockData] = useState([
    {
      x: ["2023-12-08", "2023-12-15", "2023-12-22", "2023-12-29"],
      y: [175.01, 174.79, 171.21, 177.49],
      type: "bar",
      name: "AAPL",
      marker: { color: barColorList[0] },
    },
    {
      x: ["2023-12-08", "2023-12-15", "2023-12-22", "2023-12-29"],
      y: [330.22, 317.01, 315.75, 327.26],
      type: "bar",
      name: "MSFT",
      marker: { color: barColorList[1] },
    },
    {
      x: ["2023-12-08", "2023-12-15", "2023-12-22", "2023-12-29"],
      y: [140.39, 129.12, 127.12, 127.96],
      type: "bar",
      name: "AMZN",
      marker: { color: barColorList[2] },
    },
  ]);

  const [cashFlowData, setData] = useState([
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
    {
      type: "scatter",
      mode: "markers",
      x: [
        "2023-06-30",
        "2023-03-31",
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
        28770000000, 24441000000, 11173000000, 23198000000, 24629000000,
        25386000000, 14480000000, 24540000000, 22710000000, 22179000000,
      ],
      marker: {
        color: barColorList[1],
        size: [
          15.85276169613519, 11.670317634173056, 7.271944922547332,
          9.92645908308559, 8.011265842591143, 7.983101236113285,
          12.764043185729932, 16.847911125019557, 7.349397590361446, 5,
        ],
      },
      text: ["size: 30", "size: 80", "size: 50"], // Hover text
      name: "MSFT",
      profitLoss: [
        20081000000, 18299000000, 16425000000, 17556000000, 16740000000,
        16728000000, 18765000000, 20505000000, 16458000000, 15457000000,
      ],
    },
    {
      type: "scatter",
      mode: "markers",
      x: [
        "2023-06-30",
        "2023-03-31",
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
        16476000000, 4788000000, 29173000000, 11404000000, 8965000000,
        -2790000000, 22086000000, 7313000000, 12715000000, 4213000000,
      ],
      marker: {
        color: barColorList[2],
        size: [
          17.390965327233978, 13.206061236159485, 6.314654052087124,
          12.855174923324842, 7.124031813692364, 5, 26.237978894838072,
          13.18734729947497, 18.593335759214014, 18.97814108228934,
        ],
      },
      text: ["size: 30", "size: 80", "size: 50"], // Hover text
      name: "AMZN",
      profitLoss: [
        6750000000, 3172000000, -2720000000, 2872000000, -2028000000,
        -3844000000, 14314000000, 3156000000, 7778000000, 8107000000,
      ],
    },
  ]);

  useEffect(() => {
    const getDefaultValues = async () => {
      fetch(
        `${NEW_RESTFUL_SERVER_URL}/company_overview?sort_field=MarketCapitalization&sort_order=desc&limit=100`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        },
      )
        .then((response) => {
          console.log("Raw response: ", response);
          return response.json();
        })
        .then((data) => {
          const response_company_info_list = JSON.parse(data["response"]);
          const symbolList = response_company_info_list.map(
            (info) => info.Symbol,
          );
          let companyDict = {};
          response_company_info_list.forEach((company) => {
            companyDict[company.Symbol] = company;
          });
          setCompanyDict(companyDict);
          setCompanyInfo(chosenCompany);
          setChosenCompany(chosenCompany);
          setCompanyList(symbolList.sort());
          console.log(response_company_info_list);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDefaultValues();
    console.log("Board useEffect");
  }, [chosenCompany]);

  const deleteCompany = (company_symbol) => {
    // Update chosen list
    let newChosenCompanies = [...chosenCompany];
    const index = newChosenCompanies.indexOf(company_symbol);
    if (index > -1) {
      // only splice array when item is found
      newChosenCompanies.splice(index, 1); // 2nd parameter means remove one item only
    }
    setChosenCompany(newChosenCompanies);
    // Update company list
    let companyList = companyInfo;
    const index2 = companyInfo.indexOf(company_symbol);
    if (index2 > -1) {
      companyList.splice(index2, 1);
    }
    setCompanyInfo(companyList);
  };

  const addNewCompanyInfo = async (company_symbol) => {
    const index = chosenCompany.indexOf(company_symbol);
    if (index <= -1) {
      // If haven't queries company info
      const company_info = await fetchCompanyOverview(company_symbol);
      if (company_info) {
        setCompanyInfo((prevInfo) => {
          const updatedCompanyInfo = [...prevInfo, company_info.Symbol];
          return updatedCompanyInfo.slice(-chosenLimit);
        });

        setCompanyDict((prevDict) => {
          return { ...prevDict, [company_info.Symbol]: company_info };
        });

        setChosenCompany((prevChosen) => {
          const updatedChosen = [...prevChosen, company_info.Symbol];
          return updatedChosen.slice(-chosenLimit);
        });
      }

      const quarterlyEarnings = await fetchQuarterlyEarnings(company_symbol);
      if (quarterlyEarnings) {
        const eps = quarterlyEarnings.map((item) => item.reportedEPS);
        let newBarColorList = [...barColorList]; // Create a copy of the current state
        if (chartData.length >= 4) {
          const firstColor = newBarColorList.shift(); // Remove the first color from the array
          newBarColorList.push(firstColor); // Add the removed color to the end of the array
          setBarColorList(newBarColorList); // Update the state
        }
        // Add a new bar to the chart
        setChartData((prevData) => {
          let lastThreeCompanies = prevData.slice(-3);
          lastThreeCompanies.push({
            x: ["Q1", "Q2", "Q3", "Q4"],
            y: eps,
            type: "bar",
            name: company_symbol,
            marker: {
              color:
                newBarColorList[
                  lastThreeCompanies.length % newBarColorList.length
                ],
            },
          });
          return lastThreeCompanies;
        });
      }

      const stockData = await fetchStockWeeklyData(company_symbol);
      if (stockData) {
        const dates = stockData.map((item) => item.date);
        const closePrices = stockData.map((item) => item["4. close"]);

        let newBarColorList = [...barColorList]; // Create a copy of the current state
        if (chartData.length >= 4) {
          const firstColor = newBarColorList.shift(); // Remove the first color from the array
          newBarColorList.push(firstColor); // Add the removed color to the end of the array
          setBarColorList(newBarColorList); // Update the state
        }

        setStockData((prevData) => {
          const updatedData = prevData.slice(-3);
          updatedData.push({
            x: dates,
            y: closePrices,
            text: closePrices.map((value) => `Close: ${value}`),
            type: "bar",
            name: company_symbol,
            marker: {
              color:
                newBarColorList[updatedData.length % newBarColorList.length],
            },
          });
          return updatedData;
        });
      }

      const newCashFlowData = await fetchCashFlowData(company_symbol);
      if (newCashFlowData) {
        const dates = newCashFlowData.map((item) => item.fiscalDateEnding);
        const profitLoss = newCashFlowData.map((item) => item.profitLoss);
        const operatingCashflow = newCashFlowData.map(
          (item) => item.operatingCashflow,
        );

        // Define the desired range for marker sizes
        const minSize = 5;
        const maxSize = 50;

        // Retrieve profitLoss values from the last 3 items in prevData
        const lastThreeProfitLoss = cashFlowData
          .slice(-3)
          .flatMap((dataset) => dataset.profitLoss);

        // Combine with the new profitLoss values to determine local min and max
        const allProfitLoss = [...lastThreeProfitLoss, ...profitLoss];
        const maxProfitLoss = Math.max(...allProfitLoss);
        const minProfitLoss = Math.min(...allProfitLoss);

        // Define the scaling function
        const scaleSize = (value, minProfitLoss, maxProfitLoss) => {
          return (
            minSize +
            ((value - minProfitLoss) * (maxSize - minSize)) /
              (maxProfitLoss - minProfitLoss)
          );
        };

        // Use the scaling function to adjust the marker sizes
        const scaledSizes = profitLoss.map((value) =>
          scaleSize(value, minProfitLoss, maxProfitLoss),
        );
        console.log(scaledSizes);

        // Prepare the new data set
        const newDataSet = {
          type: "scatter",
          mode: "markers",
          x: dates,
          y: operatingCashflow,
          marker: {
            size: scaledSizes,
          },
          text: operatingCashflow.map(
            (value) => `Operating Cashflow: ${value}`,
          ), // Updated hover text
          name: company_symbol,
          profitLoss: profitLoss,
        };

        // Update the state with the new data
        setData((prevData) => {
          // Update the marker sizes for the last 3 items in prevData
          const updatedPrevData = prevData.map((dataset, index) => {
            if (index >= prevData.length - 3) {
              const updatedSizes = dataset.profitLoss.map((value) =>
                scaleSize(value, minProfitLoss, maxProfitLoss),
              );
              return {
                ...dataset,
                marker: {
                  ...dataset.marker,
                  size: updatedSizes,
                },
              };
            }
            return dataset;
          });

          // Combine the updated previous data with the new data
          let lastThreeCompanies = updatedPrevData.slice(-3);
          lastThreeCompanies.push(newDataSet);
          return lastThreeCompanies;
        });
      }
    }
  };

  const handleOpenMoreCompany = (open) => {
    if (open) {
      setCompanyMoreOpen(false);
      setSearchTerm("");
    } else {
      setCompanyMoreOpen(true);
      setSearchTerm("");
    }
  };

  const handleOpenCompanyOverview = (companySymbol) => {
    if (companySymbol) {
      setCompanyOverviewSymbol(companySymbol);
    }
    if (companyOverviewOpen) {
      setCompanyOverviewOpen(false);
    } else {
      setCompanyOverviewOpen(true);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCompanyList = companyList
    .filter((company) => !chosenCompany.includes(company))
    .filter((company) =>
      company.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div style={{ padding: "10px", maxWidth: "1250px", margin: "auto" }}>
      <CompanyButtons
        chosenCompany={chosenCompany}
        headCompany={headCompany}
        companyDict={companyDict}
        deleteCompany={deleteCompany}
        addNewCompanyInfo={addNewCompanyInfo}
        companyMoreOpen={companyMoreOpen}
        defaultImageUrl={default_image_url}
        setCompanyMoreOpen={setCompanyMoreOpen} // Pass the state setter function directly
      />
      <CompanyDetails
        companyInfo={companyInfo}
        chosenCompany={chosenCompany}
        companyDict={companyDict}
        deleteCompany={deleteCompany}
        handleOpenCompanyOverview={handleOpenCompanyOverview}
      />
      <PlotContainer
        chartData={chartData}
        stockData={stockData}
        cashFlowData={cashFlowData}
      />

      <CompanyDialogs
        companyMoreOpen={companyMoreOpen}
        handleOpenMoreCompany={handleOpenMoreCompany}
        handleSearch={handleSearch}
        filteredCompanyList={filteredCompanyList}
        companyOverviewOpen={companyOverviewOpen}
        handleOpenCompanyOverview={handleOpenCompanyOverview}
        companyDict={companyDict}
        companyOverviewSymbol={companyOverviewSymbol}
        addNewCompanyInfo={addNewCompanyInfo}
      />
    </div>
  );
}

export default Board;
