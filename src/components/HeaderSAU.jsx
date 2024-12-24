import React from "react";
import { Typography, Box } from "@mui/material";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
// import { Menu as MenuIcon } from "@mui/icons-material";
import Diversity3Icon from "@mui/icons-material/Diversity3";

function HeaderSAU() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Diversity3Icon sx={{ color: "yellow", scale: 1.5 }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MyFriend - เพื่อนของฉัน
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default HeaderSAU;
