import { Box, CircularProgress, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import React from "react";

function CircularProgressWithLabel(props) {
  return (
    <Box
      style={{ margin: "0px 10px 0px 0px" }}
      sx={{ position: "relative", display: "inline-flex" }}
    >
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

const ScoreEvaluationTab = ({ company_scores }) => {
  return (
    <>
      <Table style={{ marginBottom: "20px", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}
            >
              Score
            </TableCell>
            <TableCell
              style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}
            >
              Explanation
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(company_scores).map((key, index) => (
            <TableRow key={index}>
              <TableCell style={{ textAlign: "center" }}>
                <CircularProgressWithLabel
                  value={company_scores[key]["score"]}
                />
                <div>{key}</div>
              </TableCell>
              <TableCell style={{ textAlign: "left" }}>
                <div>{company_scores[key]["reason"]}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ScoreEvaluationTab;
