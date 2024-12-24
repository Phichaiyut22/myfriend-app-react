import React from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "./../components/FooterSAU.jsx";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useState } from "react";

// Import images
import logo1 from "./../assets/logo.png";
import logo2 from "./../assets/logo2.png";

function SauLogin() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLoninClick = async (e) => {
    e.preventDefault();

    /// varlidate for empty field
    if (userName === "" || userPassword === "") {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
      ///
      try {
        const response = await fetch(
          "http://127.0.0.1:3030/user/" + userName + "/" + userPassword,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          //go to myfriend page
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data["data"]));
          window.location.href = "/myfriend";
        } else {
          alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง...😅");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  return (
    <>
      <HeaderSAU />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "70%", boxShadow: 2, my: 2, p: 3 }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{ mb: 3 }}
          >
            <Avatar
              alt="SAU-Logo-1"
              src={logo1}
              variant="square"
              sx={{
                width: 100,
                height: 100,
                boxShadow: 2,
                my: 2,
                mx: "auto",
              }}
            />
            <Avatar
              alt="SAU-Logo-2"
              src="https://webapp.sau.ac.th/cv-scholarship/Images/sau_logo.png"
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                boxShadow: 2,
                my: 2,
                mx: "auto",
              }}
            />
            <Avatar
              alt="SAU-Logo-3"
              src={logo2}
              variant="square"
              sx={{
                width: 100,
                height: 100,
                boxShadow: 2,
                my: 2,
                mx: "auto",
              }}
            />
          </Stack>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "darkblue" }}
          >
            Welcome to SAU-Friend
          </Typography>
          <Box sx={{ my: 2 }} />
          <Typography variant="h5">User name</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="userName"
            variant="outlined"
            placeholder="Username *"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography variant="h5">Password</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="userPassword"
            variant="outlined"
            placeholder="Password *"
            fullWidth
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2 }}
            onClick={handleLoninClick}
          >
            Sign In
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </Typography>
        </Box>
      </Box>

      <FooterSAU />
    </>
  );
}

export default SauLogin;
