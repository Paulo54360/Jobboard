import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  TextareaAutosize,
  Snackbar,
  Alert,
} from "@mui/material";

export default function SignupCompPage(props) {
  const [inputs, setInputs] = useState({});
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  console.log(props);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(props);
    if (props && props.id) {
      console.log("wsh ca fout quoi ?");
      inputs["id"] = props.id;
    }
    console.log(inputs);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inputs),
    };
    props && props.modify === true
      ? fetch(`http://localhost:5000/api/company/update`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("data", data);
          })
          .catch((error) => {
            console.log("an error occur when fetching post data", error);
          })
      : fetch(`http://localhost:5000/api/company/create`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("data", data);
          })
          .catch((error) => {
            console.log("an error occur when fetching post data", error);
          });
  };
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit} r>
        <div>
          <TextField //name//
            required
            value={TextField.name}
            onChange={handleChange}
            type="text"
            id="standard-size-normal"
            name="name"
            label="Compagnie"
            variant="standard"
            margin={"dense"}
          />
        </div>
        <br />
        <div>
          <TextField //adress//
            required
            value={TextField.name}
            onChange={handleChange}
            type="text"
            id="standard-size-normal"
            name="adress"
            label="Adress"
            variant="standard"
            margin={"dense"}
          />
        </div>
        <div>
          <TextareaAutosize
            required
            value={TextField.name}
            onChange={handleChange}
            name="description"
            label="Description"
            aria-label="minimum height"
            minRows={4}
            style={{ width: 200 }}
            placeholder="Description"
            margin={"dense"}
          />
        </div>
        <div>
          {" "}
          {/* div = bouton submit + popup */}
          <Button type="submit" variant="contained">
            Create
          </Button>
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error" // "succes" pour valide et "error" pour faux
              sx={{ width: "100%" }}
            >
              Try again !
            </Alert>
          </Snackbar> */}
        </div>
      </form>
    </Box>
  );
}
