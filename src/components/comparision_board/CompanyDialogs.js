import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { FixedSizeList } from "react-window";
import { Link } from "react-router-dom";
import React from "react";

const renderRow = (props) => {
  const { data, index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText
          primary={`${data.companyList[index]}`}
          onClick={() => {
            data.addNewCompanyInfo(`${data.companyList[index]}`);
            data.handleOpenMoreCompany(true);
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const CompanyDialogs = ({
  companyMoreOpen,
  handleOpenMoreCompany,
  handleSearch,
  filteredCompanyList,
  companyOverviewOpen,
  handleOpenCompanyOverview,
  companyDict,
  companyOverviewSymbol,
  addNewCompanyInfo,
}) => {
  return (
    <>
      <Dialog
        open={companyMoreOpen}
        onClose={() => handleOpenMoreCompany(companyMoreOpen)}
      >
        <Box
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <TextField
            label="search"
            style={{ width: "100%" }}
            variant="filled"
            onChange={handleSearch}
          />
          <FixedSizeList
            height={400}
            width={360}
            itemSize={46}
            itemCount={filteredCompanyList.length}
            overscanCount={5}
            itemData={{
              addNewCompanyInfo,
              handleOpenMoreCompany,
              companyList: filteredCompanyList,
            }}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </Dialog>

      <Dialog
        open={companyOverviewOpen}
        onClose={() => handleOpenCompanyOverview(undefined)}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {companyDict[companyOverviewSymbol] &&
                `${companyDict[companyOverviewSymbol].Exchange} - ${companyOverviewSymbol}`}
            </Typography>
            <Typography variant="h5" component="div">
              {companyDict[companyOverviewSymbol] &&
                companyDict[companyOverviewSymbol].Name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {companyDict[companyOverviewSymbol] &&
                companyDict[companyOverviewSymbol].Sector}
            </Typography>
            <Typography variant="body2">
              {companyDict[companyOverviewSymbol] &&
                companyDict[companyOverviewSymbol].Description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link
                to={`/company_info/${companyOverviewSymbol}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Learn More
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
};

export default CompanyDialogs;
