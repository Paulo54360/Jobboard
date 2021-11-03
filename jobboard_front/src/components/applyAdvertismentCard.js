import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

export default function ApplyAdvertisementsComponent(props) {
  //   const deleteCompany = () => {
  //faire le call pour delete une postulation
  //     window.location.reload(false);
  //   };
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 275, width: 800, m: 4 }}>
        <CardContent>
          <Typography>Applicant name : {props.item.name} </Typography>
          <Typography>Applicant firstname : {props.item.firstname} </Typography>
          <Typography>Applicant phone : {props.item.phone} </Typography>
          <Typography>Applican sexe : {props.item.sexe} </Typography>
          <Typography>Applicant age : {props.item.age} </Typography>
          <Typography>Applicant message : {props.item.message} </Typography>
          <Typography>Applicant id : {props.item.user_id} </Typography>
          <Typography>id : {props.item.id} </Typography>
          <Typography>
            Advertisement id: {props.item.advertisement_id}{" "}
          </Typography>
          <Typography>Postuled at : {props.item.postuled_at} </Typography>
        </CardContent>

        <Button variant="outlined">Delete</Button>
      </Card>
    </div>
  );
}
