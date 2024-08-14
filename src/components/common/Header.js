import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Typography from "@mui/material/Typography";

const pageList = [
  ["Top Companies", "/top"],
  ["Comparison Board", "/compare"],
  ["Forum", "/forum"],
  ["About", "/about"],
];

function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    props.setGlobalIsLogin(false);
    props.setGlobalUserInfo({});
  };

  return (
    <AppBar style={{ background: "#2b2d42" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TrendingUpIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 550,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            InvestorData
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pageList.map((item) => (
                <MenuItem key={item[0]} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    noWrap
                    component={Link}
                    to={item[1]}
                  >
                    {item[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <CloudIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <TrendingUpIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            InvestorData
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pageList.map((item) => (
              <Button
                component={Link}
                to={item[1]}
                key={item[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {item[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {props.globalIsLogin ? (
                <Button onClick={handleOpenUserMenu} sx={{ color: "white" }}>
                  {props.globalUserInfo.name}
                </Button>
              ) : (
                <Button sx={{ color: "white" }}>
                  <Link
                    to="/login"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Button>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key="1"
                component={Link}
                to="my-publish"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">My publish</Typography>
              </MenuItem>
              <br />
              <MenuItem
                key="2"
                component={Link}
                to="submit-post"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Write post</Typography>
              </MenuItem>
              <br />
              <MenuItem
                key="3"
                onClick={handleLogout}
                component={Link}
                to="login"
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
