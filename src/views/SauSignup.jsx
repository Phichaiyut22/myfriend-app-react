import React from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "./../components/FooterSAU.jsx";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

///// Import images
import logo1 from "./../assets/logo.png";
import logo2 from "./../assets/logo2.png";
/////--------------------/////
import { useState } from "react";
function SauSignup() {
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  ///// Function for signup
  const handleSaveClick = async (e) => {
    e.preventDefault();

    ///varlidate for empty field
    if (
      userFullname === "" ||
      userEmail === "" ||
      userName === "" ||
      userPassword === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
      ////
      try {
        const response = await fetch("http://127.0.0.1:3030/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userFullname: userFullname,
            userEmail: userEmail,
            userName: userName,
            userPassword: userPassword,
          }),
        });

        if (response.status === 201) {
          alert("ลงทะเบียนสําเร็จ...😁");
          window.location.href = "/";
        } else {
          alert("ลงทะเบียนไม่สําเร็จ ลองใหม่อีกครั้ง....😭");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการลงทะเบียน...กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  ///// Function for cancel
  const handleCancelClick = (e) => {
    e.preventDefault();
    // Reset all fields to empty strings
    setUserFullname("");
    setUserEmail("");
    setUserName("");
    setUserPassword("");
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
            variant="h4"
            sx={{ textAlign: "center", color: "darkblue" }}
          >
            Sign up
          </Typography>
          <Box sx={{ my: 2 }} />
          <Typography variant="h5">ชื่อ-นามสกุล</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="userFullname"
            variant="outlined"
            placeholder="First/Last name *"
            fullWidth
            value={userFullname}
            onChange={(e) => setUserFullname(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography variant="h5">อีเมล์</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="userEmail"
            variant="outlined"
            placeholder="Email *"
            fullWidth
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Box sx={{ my: 2 }} />

          <Typography variant="h5">ชื่อผู้ใช้</Typography>
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

          <Typography variant="h5">รหัสผ่าน</Typography>
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
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </Box>
          <Box sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ py: 1.5 }}
            component={Link}
            to="/"
          >
            Back to Sign in
          </Button>

          <Box sx={{ my: 2 }} />
        </Box>
      </Box>
      <FooterSAU />
    </>
  );
}

export default SauSignup;
