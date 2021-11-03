import React, { useState } from "react";
import UpdateUserForm from "../updateUserForm";
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

export default function AdminUserCard(props) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 275, width: 800, m: 4 }}>
        <CardContent>
          <Typography>Name : {props.name} </Typography>
          <Typography>FirstName : {props.firstname} </Typography>
          <Typography>Email : {props.email} </Typography>
          <Typography>Phone : {props.phone} </Typography>
          <Typography>Age : {props.age} </Typography>
          <Typography>Sexe :{props.sexe} </Typography>
          <Typography>Role : {props.role} </Typography>
          <Typography>compagny_id :{props.compagny_id} </Typography>
          <Typography>id : {props.id} </Typography>
          <Typography>Created at : {props.created_at} </Typography>
        </CardContent>
        <Button variant="contained" onClick={handleOpenUpdate}>
          Update user
        </Button>
        <Modal
          keepMounted
          open={openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 250 }}>
            <UpdateUserForm user_id={props.id} />
          </Box>
        </Modal>
        <Button variant="outlined">Delete user</Button>
      </Card>
    </div>
  );
}
