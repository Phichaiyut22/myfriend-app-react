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
import { useEffect } from "react";
import { useState } from "react";

// Import images
import logo1 from "./../assets/logo.png";
import logo2 from "./../assets/logo2.png";

function SauAddMyFriend() {
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserFullname(user.userFullname);
      setUserEmail(user.userEmail);
      setUserId(user.userId);
    } else {
      window.location.href = "/";
    }
  }, []);

  ///--------------------------------------------------
  const [myfriendFullname, setMyfriendFullname] = useState("");
  const [myfriendPhone, setMyfriendPhone] = useState("");
  const [myfriendAge, setMyfriendAge] = useState("");
  const [myfriendMajor, setMyfriendMajor] = useState("");

  ////-------------------------------------------------

  const handleSavefriendClick = async (e) => {
    e.preventDefault();

    ///varlidate for empty field
    if (
      myfriendFullname === "" ||
      myfriendPhone === "" ||
      myfriendAge === "" ||
      myfriendMajor === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
      ////
      try {
        const response = await fetch("http://127.0.0.1:3030/myfriend/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            myfriendFullname: myfriendFullname,
            myfriendPhone: myfriendPhone,
            myfriendAge: myfriendAge,
            myfriendMajor: myfriendMajor,
          }),
        });

        if (response.status === 201) {
          alert("เพิ่มเพื่อนสําเร็จ...😁");
          window.location.href = "/myfriend";
        } else {
          alert("เพิ่มเพื่อนไม่สําเร็จ ลองใหม่อีกครั้ง....😭");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการเพิ่มเพื่อน...กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  ///// Function for cancel
  const handleCancelClick = (e) => {
    e.preventDefault();
    // Reset all fields to empty strings
    setMyfriendFullname("");
    setMyfriendPhone("");
    setMyfriendAge("");
    setMyfriendMajor("");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
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
          <Box sx={{ my: 2 }} />
          <Typography
            variant="h3"
            sx={{ textAlign: "center", color: "darkblue" }}
          >
            {"Hi..." + userFullname}
          </Typography>
          <Button
            variant="text"
            color="error"
            sx={{ display: "block", mx: "auto" }}
            onClick={handleLogoutClick}
          >
            [LOGOUT]
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "darkblue" }}
          >
            เพิ่มเพื่อน
          </Typography>
          <Box sx={{ my: 2 }} />
          <Typography variant="h5">Name</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="myfriendFullname"
            variant="outlined"
            placeholder="input first name and last name *"
            fullWidth
            value={myfriendFullname}
            onChange={(e) => setMyfriendFullname(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography variant="h5">Telephone</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="myfriendPhone"
            variant="outlined"
            placeholder="input telephone *"
            fullWidth
            value={myfriendPhone}
            type="tel"
            onChange={(e) => setMyfriendPhone(e.target.value)}
          />
          <Box sx={{ my: 2 }} />

          <Typography variant="h5">Age</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="myfriendAge"
            variant="outlined"
            placeholder="input age *"
            fullWidth
            value={myfriendAge}
            onChange={(e) => setMyfriendAge(e.target.value)}
          />
          <Box sx={{ my: 2 }} />

          <Typography variant="h5">Major</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            id="myfriendMajor"
            variant="outlined"
            placeholder="Input major *"
            fullWidth
            value={myfriendMajor}
            onChange={(e) => setMyfriendMajor(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={handleSavefriendClick}
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
            to="/myfriend"
          >
            Go to My Friend
          </Button>

          <Box sx={{ my: 2 }} />
        </Box>
      </Box>
      <FooterSAU />
    </>
  );
}

export default SauAddMyFriend;
