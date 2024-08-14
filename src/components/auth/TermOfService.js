import React from "react";
import { styled } from "@mui/system";

const SectionHeading = styled("h3")(({ theme }) => ({
  fontSize: "1.5rem",
  color: "#333",
  fontWeight: "bold",
  margin: "10px 0 10px 0",
}));

function TermOfService() {
  const headingStyles = {
    marginBottom: "10px",
  };

  const definitionStyles = {
    marginBottom: "10px",
  };

  const listItemStyles = {
    marginBottom: "5px",
  };

  return (
    <div style={{ margin: "20px" }}>
      <SectionHeading>InvestorData Terms of Service</SectionHeading>
      <h2 style={headingStyles}>Effective Date: [Date]</h2>
      <p>
        Welcome to InvestorData, your premier destination for in-depth stock
        market analytics and insights. By accessing or using our services, you
        agree to the following terms and conditions.
      </p>
      <SectionHeading>Definitions</SectionHeading>
      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          "InvestorData" refers to our platform offering advanced analytics on
          stock market trends, company performance, and financial insights.
        </li>
        <li style={listItemStyles}>
          "User" refers to any individual or entity using the InvestorData
          platform for accessing stock market data and analytics.
        </li>
        <li style={listItemStyles}>
          "Content" includes all data, analytics, text, images, and other
          materials provided or analyzed through the InvestorData platform.
        </li>
        <li style={listItemStyles}>
          "Third-Party Services" encompasses additional services or data that
          may be integrated with the InvestorData platform.
        </li>
      </ol>
      <SectionHeading>Use of Service</SectionHeading>
      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          InvestorData provides tools for analyzing stock market data, such as
          EPS, weekly stock prices, and financial forecasts. Users must use
          these tools responsibly and lawfully.
        </li>
        <li style={listItemStyles}>
          The platform is intended for those seeking to enhance their financial
          understanding and should not be used for unlawful purposes.
        </li>
        <li style={listItemStyles}>
          Users must be at least 18 years old and agree to use InvestorData for
          legal and ethical purposes.
        </li>
        <li style={listItemStyles}>
          We reserve the right to modify or terminate access to InvestorData at
          our discretion.
        </li>
      </ol>
      <h3 style={headingStyles}>Ownership and Copyright</h3>
      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          Users maintain ownership of their data but grant InvestorData a
          license to use this data as part of our analytical services.
        </li>
        <li style={listItemStyles}>
          All intellectual property rights in the InvestorData platform,
          including algorithms and user interfaces, belong to InvestorData.
        </li>
      </ol>
      <SectionHeading>Third-Party Services</SectionHeading>

      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          InvestorData may include third-party services, which are subject to
          their respective terms and conditions.
        </li>
        <li style={listItemStyles}>
          InvestorData is not responsible for any issues related to the use of
          third-party services integrated with our platform.
        </li>
      </ol>
      <SectionHeading>Limitation of Liability</SectionHeading>
      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          InvestorData disclaims liability for any losses or damages arising
          from the use of our platform, including investment decisions based on
          our analytics.
        </li>
        <li style={listItemStyles}>
          Users are solely responsible for any risks associated with their
          reliance on financial data and analysis provided by InvestorData.
        </li>
      </ol>
      <SectionHeading>Changes to Terms of Service</SectionHeading>
      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          InvestorData reserves the right to modify these terms at any time.
          Continued use of our services constitutes acceptance of new terms.
        </li>
      </ol>
      <SectionHeading>Governing Law</SectionHeading>
      <ol style={definitionStyles}>
        <li style={listItemStyles}>
          These terms are governed by [Jurisdiction]'s laws. Disputes will be
          resolved through arbitration.
        </li>
      </ol>
      <SectionHeading>Contact Us</SectionHeading>
      <p>If you have any questions about these terms, please contact us at:</p>
      <p style={{ marginBottom: "10px" }}>
        InvestorData
        <br />
        456 Market Street
        <br />
        Tech City, TC 67890
        <br />
        support@insightdata.com
      </p>
    </div>
  );
}

export default TermOfService;
