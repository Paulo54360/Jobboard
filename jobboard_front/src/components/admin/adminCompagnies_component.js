import React, { useState } from "react";
import SignupCompPage from "../../pages/SignupCompPage";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AdminCompagniesComponent(props) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const deleteCompany = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id: props.item.id, isActive: 0 }),
    };
    fetch(`http://localhost:5000/api/company/delete`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("an error occur when fetching post data", error);
      });
    window.location.reload(false);
  };
  console.log("props", props.item);
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 275, width: 800, m: 4 }}>
        <CardContent>
          <Typography>Name : {props.item.name} </Typography>
          <Typography>Places : {props.item.adress} </Typography>
          <Typography>Description : {props.item.description} </Typography>
          <Typography>id : {props.item.id} </Typography>
          <Typography>isActive : {props.item.isActive} </Typography>
          <Typography>Created at : {props.item.created_at} </Typography>
        </CardContent>
        <Button variant="contained" onClick={handleOpenUpdate}>
          Update info
        </Button>
        <Modal
          keepMounted
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 250 }}>
            <SignupCompPage modify={true} id={props.item.id} />
          </Box>
        </Modal>
        <Button variant="outlined" onClick={deleteCompany}>
          Delete
        </Button>
      </Card>
    </div>
  );
}
