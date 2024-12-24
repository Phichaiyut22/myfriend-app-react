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
import { useParams } from "react-router-dom";

// Import images
import logo1 from "./../assets/logo.png";
import logo2 from "./../assets/logo2.png";

function SauUpdateMyFriend() {
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  ///--------------------------------------------------
  const [myfriendFullname, setMyfriendFullname] = useState("");
  const [myfriendPhone, setMyfriendPhone] = useState("");
  const [myfriendAge, setMyfriendAge] = useState("");
  const [myfriendMajor, setMyfriendMajor] = useState("");

  ////-------------------------------------------------
  const { myfriendId } = useParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserFullname(user.userFullname);
      setUserEmail(user.userEmail);
      setUserId(user.userId);
      ///ดึงข้อมูลเพื่อแสดงในตาราง เพื่อแก้ไขข้อมูลมาแสดงในฟอร์ม
      try {
        const fetchData = async () => {
          const response = await fetch(
            "http://127.0.0.1:3030/myfriend/myfriendId/" + myfriendId,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          /// เอาค่าที่ได้จาก API มาแสดง ในฟอร์ม
          if (response.status === 200) {
            const data = await response.json();
            setMyfriendFullname(data["data"].myfriendFullname);
            setMyfriendPhone(data["data"].myfriendPhone);
            setMyfriendAge(data["data"].myfriendAge);
            setMyfriendMajor(data["data"].myfriendMajor);
          }
        };

        fetchData();
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล...😅");
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handUpdateMyFriend = async (e) => {
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
        const response = await fetch(
          "http://127.0.0.1:3030/myfriend/" + myfriendId,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // userId: userId,
              myfriendId: myfriendId,
              myfriendFullname: myfriendFullname,
              myfriendPhone: myfriendPhone,
              myfriendAge: myfriendAge,
              myfriendMajor: myfriendMajor,
            }),
          }
        );

        if (response.status === 200) {
          alert("แก้ไขเพื่อนสําเร็จ...😁");
          window.location.href = "/myfriend";
        } else {
          alert("แก้ไขเพื่อนไม่สําเร็จ ลองใหม่อีกครั้ง....😭");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการแก้ไขเพื่อน...กรุณาลองใหม่อีกครั้ง");
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
            แก้ไขเพื่อน
          </Typography>
          <Box sx={{ my: 2 }} />

          <Typography variant="h5">ชื่อ-นามสกุลเพื่อน</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            required
            id="myfriendFullname"
            label="First/Last name"
            variant="outlined"
            fullWidth
            value={myfriendFullname}
            onChange={(e) => setMyfriendFullname(e.target.value)}
          />

          <Box sx={{ my: 2 }} />

          <Typography variant="h5">เบอร์โทร</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            required
            id="myfriendPhone"
            label="Phone"
            variant="outlined"
            fullWidth
            value={myfriendPhone}
            type="tel"
            onChange={(e) => setMyfriendPhone(e.target.value)}
          />

          <Box sx={{ my: 2 }} />

          <Typography variant="h5">อายุ</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            required
            id="myfriendAge"
            label="Age"
            variant="outlined"
            fullWidth
            value={myfriendAge}
            onChange={(e) => setMyfriendAge(e.target.value)}
          />

          <Box sx={{ my: 2 }} />

          <Typography variant="h5">สาขาวิชา</Typography>
          <Box sx={{ my: 1 }} />
          <TextField
            required
            id="myfriendMajor"
            label="Major"
            variant="outlined"
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
              onClick={handUpdateMyFriend}
            >
              Save
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

export default SauUpdateMyFriend;
