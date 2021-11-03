import {
  CardActions,
  Card,
  CardContent,
  Button,
  Typography,
  Collapse,
  Modal,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import TextFieldSizes from "../pages/applyform";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function CardComponent(props) {
  const [expanded, setExpanded] = useState(false);
  const [moreData, setMoreData] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = (id) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    props &&
      !expanded &&
      fetch(`http://localhost:5000/api/learnMore/${props.id}`, {
        headers: myHeaders,
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log("moreData", data);
          setMoreData(data[0]);
        })
        .catch((error) => {
          console.log("an error occur when fetching more data", error);
        });
    setExpanded(!expanded);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ minWidth: 275, width: 800, m: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.compagny_name}
          </Typography>
          Job offer : {props.job}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Learn more"}
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {moreData ? (
            <CardContent>
              <Typography paragraph>Job description:</Typography>
              <Typography paragraph>{moreData.description}</Typography>
              <Typography> Wages: {moreData.wages}K a years. </Typography>
              <Typography> Schedule: {moreData.schedule}h a week. </Typography>
              <Typography>Place: {moreData.places} </Typography>
            </CardContent>
          ) : (
            <CircularProgress />
          )}
          <Button onClick={handleOpen}>Apply</Button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 300 }}>
              <TextFieldSizes
                advertisement_id={props.id}
                user={props.userData}
              />
            </Box>
          </Modal>
        </Collapse>
      </Card>
    </div>
  );
}
