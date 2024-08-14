import { Box, Container, Typography } from "@mui/material";

import React from "react";

function Footer() {
  return (
    <div style={{ marginTop: "auto" }}>
      <Box sx={{ bgcolor: "#2b2d42", color: "white", mt: 5, py: 3 }}>
        <Container maxWidth="xl">
          <Typography variant="body1" align="center">
            © 2030 InvestorData. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;
