import React, { useState } from "react";
import CompofferPage from "../../pages/compOfferPage";
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

export default function AdminAdvertisementsComponent(props) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const deleteAdvertisement = () => {
    //problem on the delete
    console.log("id to delete", props.item.id);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id: props.item.id, isActive: 0 }),
    };
    fetch(
      `http://localhost:5000/api/advertisement/${props.item.id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("an erroc occur", error);
      });
    // window.location.reload(false);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 275, width: 800, m: 4 }}>
        <CardContent>
          <Typography>Name : {props.item.compagny_name} </Typography>
          <Typography>Job : {props.item.job} </Typography>
          <Typography>Places : {props.item.places} </Typography>
          <Typography>Description : {props.item.description} </Typography>
          <Typography>Schedule : {props.item.schedule} </Typography>
          <Typography>Wages :{props.item.wages} </Typography>
          <Typography>compagny_id :{props.item.compagnies_id} </Typography>
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
          <Box sx={{ ...style, width: 300 }}>
            <CompofferPage
              modify={true}
              id={props.item.id}
              compagnies={props.isAdmin && props.compagnies}
            />
          </Box>
        </Modal>
        <Button variant="outlined" onClick={deleteAdvertisement}>
          Delete
        </Button>
      </Card>
    </div>
  );
}
