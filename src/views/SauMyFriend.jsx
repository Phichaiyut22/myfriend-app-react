import React from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "./../components/FooterSAU.jsx";
import { useEffect, useState } from "react";
import { Box, Typography, Avatar, TextField, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Import images
import logo1 from "./../assets/logo.png";
import logo2 from "./../assets/logo2.png";

function SauMyFriend() {
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  ////-------------------------------------------------
  const [myfriend, setMyfriend] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserFullname(user.userFullname);
      setUserEmail(user.userEmail);
      setUserId(user.userId);

      ///ดึงข้อมูลเพื่อแสดงในตาราง
      try {
        const fetchData = async () => {
          const response = await fetch(
            "http://127.0.0.1:3030/myfriend/" + user.userId,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            setMyfriend(data["data"]);
          }
        };

        fetchData();
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleDeleteClick = async (myfriendId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3030/myfriend/" + myfriendId,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        alert("ลบเพื่อนสําเร็จ...😁");
        window.location.reload();
      } else {
        alert("เกิดข้อผิดพลาดในการลบเพื่อน...😅");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการลบเพื่อน...😅");
    }
  };

  return (
    <>
      <HeaderSAU />
      <Box
        sx={{
          mx: "auto",
          boxShadow: 2,
          width: "70%",
          my: 2,
          p: 3,
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        ></Box>
        <Box sx={{ width: "70%", my: 2, p: 3, mx: "auto" }}>
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
        </Box>
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
        <Typography variant="h5" sx={{ textAlign: "left", color: "darkblue" }}>
          My Friend
          <Button
            variant="contained"
            sx={{ mr: 1, float: "right" }}
            component={Link}
            to="/addmyfriend"
          >
            Add Friend{" "}
          </Button>
        </Typography>
        <Box sx={{ my: 2 }} />
        {/* ---------------------- */}
        <TableContainer component={Paper} sx={{ my: "3" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#E0E0E0" }}>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Friend name </TableCell>
                <TableCell align="center">Friend Phone</TableCell>
                <TableCell align="center">Friend Age</TableCell>
                <TableCell align="center">Friend Major</TableCell>
                <TableCell align="center">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myfriend.map((row) => (
                <TableRow
                  key={row.myfriendId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {myfriend.indexOf(row) + 1}
                  </TableCell>
                  <TableCell align="center">{row.myfriendFullname}</TableCell>
                  <TableCell align="center">{row.myfriendPhone}</TableCell>
                  <TableCell align="center">{row.myfriendAge}</TableCell>
                  <TableCell align="center">{row.myfriendMajor}</TableCell>
                  {/* จัดปุ่ม Edit และ Delete ให้อยู่ใน TableCell เดียวกัน */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        component={Link}
                        to={"/updatemyfriend/" + row.myfriendId}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(row.myfriendId)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ---------------------- */}
      </Box>
      <FooterSAU />
    </>
  );
}

export default SauMyFriend;
