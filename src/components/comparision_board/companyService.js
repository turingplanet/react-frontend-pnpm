import { NEW_RESTFUL_SERVER_URL } from "../utils/config";

export const fetchCompanyOverview = async (symbol) => {
  const url = `${NEW_RESTFUL_SERVER_URL}/company_overview?symbol=${symbol}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data["response"];
  } catch (error) {
    console.error("Error fetching company overview:", error);
  }
};

export const fetchQuarterlyEarnings = async (company_symbol) => {
  const url = `${NEW_RESTFUL_SERVER_URL}/quarterly_earnings?symbol=${company_symbol}&sort_field=fiscalDateEnding&sort_order=desc`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.slice(0, 4); // Only want the first four entries
};

export const fetchStockWeeklyData = async (company_symbol) => {
  try {
    const response = await fetch(
      `${NEW_RESTFUL_SERVER_URL}/stock_weekly_data?symbol=${company_symbol}&sort_field=date&sort_order=desc`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Assuming the API returns an array of data
    return data.slice(0, 4); // Need only the last 4 items
  } catch (error) {
    console.error("Error fetching stock weekly data:", error);
    throw error; // rethrow the error if you want to handle it elsewhere
  }
};

export const fetchCashFlowData = async (symbol) => {
  try {
    const response = await fetch(
      `${NEW_RESTFUL_SERVER_URL}/cash_flow?symbol=${symbol}&sort_field=fiscalDateEnding&sort_order=desc`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.text();

    // Replace NaN with "null" in the response text
    const sanitizedData = data.replace(/NaN/g, "null");
    return JSON.parse(sanitizedData);
  } catch (err) {
    console.error("Fetch error: ", err);
    throw err;
  }
};
