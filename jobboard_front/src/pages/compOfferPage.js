import * as React from "react";
import { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Box,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function CompofferPage(props) {
  console.log("recruiter phase", props);
  const [inputs, setInputs] = useState({});
  const [open, setOpen] =
    React.useState(false); /* début: define popup du bouton */

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }; /* fin: define popup du bouton */

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let compagny_name =
      props.compagnies &&
      props.compagnies.find((x) => x.id === inputs.compagnies_id);
    inputs["compagny_name"] = props.compagnies && compagny_name.name;
    if (props && props.id) {
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
    props && props.modify
      ? fetch(
          `http://localhost:5000/api/advertisement/${props.id}/update`,
          requestOptions
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("data", data);
          })
          .catch((error) => {
            console.log("an error occur when fetching put data", error);
          })
      : fetch(`http://localhost:5000/api/advertisement/create`, requestOptions)
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
      <form onSubmit={handleSubmit} error={true}>
        <div>
          {props && props.compagnies && (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Company
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="compagnies_id"
                value={TextField.name}
                onChange={handleChange}
              >
                {props.compagnies &&
                  props.compagnies.map((company) => (
                    <MenuItem value={company.id}>{company.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div>
          <div>
            <TextField //places//
              required
              // error={true}
              value={TextField.name}
              onChange={handleChange}
              type="text"
              id="standard-size-normal"
              name="job"
              label="job"
              variant="standard"
              margin={"dense"}
            />
          </div>
          <div>
            <TextField //places//
              required
              // error={true}
              value={TextField.name}
              onChange={handleChange}
              type="text"
              id="standard-size-normal"
              name="places"
              label="places"
              variant="standard"
              margin={"dense"}
            />
          </div>
          <TextField //wages//
            required
            // error={true}
            value={TextField.name}
            onChange={handleChange}
            type="number"
            id="standard-size-normal"
            name="wages"
            label="wages"
            variant="standard"
            margin={"dense"}
          />
        </div>
        <div>
          <TextField //schedules//
            required
            // error={true}
            value={TextField.name}
            onChange={handleChange}
            type="number"
            id="standard-size-normal"
            name="schedule"
            label="schedules"
            variant="standard"
            margin={"dense"}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div>
          <TextareaAutosize //description//
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
          <Button type="submit" variant="contained" onClick={handleClick}>
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
