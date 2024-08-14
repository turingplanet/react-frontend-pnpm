import { React, useEffect, useState } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useMediaQuery, useTheme } from "@mui/material";

import { Link } from "react-router-dom";
import { NEW_RESTFUL_SERVER_URL } from "./utils/config";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fafafa",
    color: "black",
    fontWeight: "bold",
    border: "1px solid #fafafa",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#9e9e9e",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainerWrapper = styled("div")({
  maxWidth: "80%",
  margin: "10px 10%",
  textAlign: "center",
});

function TopCompany() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  const [company_info_list, setCompanyInfoList] = useState([]);
  const [display_company_info_list, setDisplayCompanyInfoList] = useState([]);
  const [activeTabNum, setActiveTabNum] = useState(0);

  const [company_stock_list, setCompanyStockList] = useState([]);
  const [display_company_stock_list, setDisplayCompanyStockList] = useState([]);
  const [stockActiveTabNum, setStockActiveTabNum] = useState(0);

  const [allRiskyCompany, setAllRiskyCompany] = useState([]);
  const [displayRiskyCompany, setDisplayRiskyCompany] = useState([]);
  const [riskyCompanyActiveTabNum, setRiskyCompanyActiveTabNum] = useState(0);

  const handleCompanyPaginationChange = (event, value) => {
    const idx = value - 1;
    const company_info = company_info_list.slice(idx * 10, idx * 10 + 10);
    setDisplayCompanyInfoList(company_info);
    setActiveTabNum(idx);
  };

  const handleStockPaginationChange = (event, value) => {
    const idx = value - 1;
    const company_stock = company_stock_list.slice(idx * 10, idx * 10 + 10);
    setDisplayCompanyStockList(company_stock);
    setStockActiveTabNum(idx);
  };

  const handleRiskyCompanyPaginationChange = (event, value) => {
    const idx = value - 1;
    const sliced_risky_companies = allRiskyCompany.slice(
      idx * 10,
      idx * 10 + 10,
    );
    setDisplayRiskyCompany(sliced_risky_companies);
    setRiskyCompanyActiveTabNum(idx);
  };

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
          console.log(response_company_info_list);
          setCompanyInfoList(response_company_info_list);
          setDisplayCompanyInfoList(response_company_info_list.slice(0, 10));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getCompanyStockInfo = async () => {
      fetch(
        `${NEW_RESTFUL_SERVER_URL}/company_overview?sort_field=PEGRatio&sort_order=asc&limit=100`,
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
          const company_stock_list = JSON.parse(data["response"]);
          const filteredCompanyStockList = company_stock_list.filter(
            (company) => {
              return company.PEGRatio > 0.0 && company.PEGRatio <= 20.0;
            },
          );
          console.log(filteredCompanyStockList);
          setCompanyStockList(filteredCompanyStockList);
          setDisplayCompanyStockList(filteredCompanyStockList.slice(0, 10));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getRiskyCompany = async () => {
      fetch(
        `${NEW_RESTFUL_SERVER_URL}/company_overview?sort_field=Beta&sort_order=desc&limit=100`,
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
          const company_list = JSON.parse(data["response"]).filter(
            (company) => {
              return company.Beta > -10;
            },
          );
          console.log(company_list);
          setAllRiskyCompany(company_list);
          setDisplayRiskyCompany(company_list.slice(0, 10));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDefaultValues();
    getCompanyStockInfo();
    getRiskyCompany();
  }, []);

  return (
    <div>
      <h1
        className="text-2xl font-semibold text-center"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        Top Market Titans
      </h1>
      <TableContainerWrapper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell align="left">Symbol</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">
                  MarketCapitalization
                </StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {display_company_info_list.map((company_info, index) => (
                <StyledTableRow key={company_info["Symbol"] + index}>
                  <StyledTableCell component="th" scope="row">
                    {activeTabNum * 10 + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={
                          company_info["image_url"] ||
                          "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png"
                        }
                        alt={company_info["Name"]}
                        style={{ width: "20px", marginRight: "10px" }}
                      />

                      <Link
                        to={`/company_info/${company_info["Symbol"]}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {company_info["Symbol"]}
                      </Link>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {company_info["Name"]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {company_info["MarketCapitalization"].toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span
                      style={{
                        backgroundColor: "#e8f5e9", // Light green background
                        color: "#43a047", // Darker green text
                        borderRadius: "10px", // Rounded corners
                        padding: "8px",
                        fontWeight: "bold", // Optional: make text bold
                        fontSize: "12px",
                      }}
                    >
                      Growing
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} style={{ alignItems: "center", marginTop: "10px" }}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={handleCompanyPaginationChange}
            hidden={isMobile}
          />
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            boundaryCount={0}
            hidePrevButton={true}
            hideNextButton={true}
            showFirstButton={true}
            showLastButton={true}
            page={activeTabNum + 1}
            onChange={handleCompanyPaginationChange}
            hidden={!isMobile}
          />
        </Stack>
      </TableContainerWrapper>

      <h1
        className="text-2xl font-semibold text-center"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        High-Growth Prospects
      </h1>

      <TableContainerWrapper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell align="left">Symbol</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">PEGRatio</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {display_company_stock_list.map((company_info, index) => (
                <StyledTableRow key={company_info["Symbol"] + index}>
                  <StyledTableCell component="th" scope="row">
                    {stockActiveTabNum * 10 + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={
                          company_info["image_url"] ||
                          "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png"
                        }
                        alt={company_info["Name"]}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      <Link
                        to={`/company_info/${company_info["Symbol"]}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {company_info["Symbol"]}
                      </Link>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {company_info["Name"]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {company_info["PEGRatio"]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} style={{ alignItems: "center", marginTop: "10px" }}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            boundaryCount={0}
            hidePrevButton={true}
            hideNextButton={true}
            showFirstButton={true}
            showLastButton={true}
            page={stockActiveTabNum + 1}
            onChange={handleStockPaginationChange}
            hidden={!isMobile}
          />
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={handleStockPaginationChange}
            hidden={isMobile}
          />
        </Stack>
      </TableContainerWrapper>

      <h1
        className="text-2xl font-semibold text-center"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        High-Risk High-Reward Ventures
      </h1>
      <TableContainerWrapper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell align="left">Symbol</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Beta</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayRiskyCompany.map((company_info, index) => (
                <StyledTableRow key={company_info["Symbol"] + index}>
                  <StyledTableCell component="th" scope="row">
                    {stockActiveTabNum * 10 + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={
                          company_info["image_url"] ||
                          "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png"
                        }
                        alt={company_info["Name"]}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      <Link
                        to={`/company_info/${company_info["Symbol"]}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {company_info["Symbol"]}
                      </Link>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {company_info["Name"]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {company_info["Beta"]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} style={{ alignItems: "center", marginTop: "10px" }}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            boundaryCount={0}
            hidePrevButton={true}
            hideNextButton={true}
            showFirstButton={true}
            showLastButton={true}
            page={riskyCompanyActiveTabNum + 1}
            onChange={handleRiskyCompanyPaginationChange}
            hidden={!isMobile}
          />
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={handleRiskyCompanyPaginationChange}
            hidden={isMobile}
          />
        </Stack>
      </TableContainerWrapper>
    </div>
  );
}

export default TopCompany;
