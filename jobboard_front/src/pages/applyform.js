import * as React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextareaAutosize,
  Button,
} from "@mui/material";

export default function TextFieldSizes(props) {
  let [inputs, setInputs] = useState({});
  const clone = (obj) => Object.assign({}, obj);
  let userData = {};
  const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
  };

  if (props.user) {
    userData = (({ name, firstname, sexe, phone, age, id }) => ({
      name,
      firstname,
      sexe,
      phone,
      age,
      id,
    }))(props.user[0]);
    userData = renameKey(userData, "id", "user_id");
    console.log("THE INPUTS", inputs);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value, ...userData }));
    console.log("changes", inputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs["advertisement_id"] = props.advertisement_id;
    inputs["sexe"] = inputs["sexe"] === "man" ? 1 : 2;
    console.log("inputs", inputs);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inputs),
    };

    fetch(
      `http://localhost:5000/api/apply/${props.advertisement_id}`,
      requestOptions
    )
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
      <form onSubmit={handleSubmit}>
        {!props.user && (
          <>
            <div>
              <TextField // Prénom //
                label="Name"
                id="standard-size-normal"
                name="firstname"
                value={TextField.name}
                variant="standard"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField // Nom //
                label="First Name"
                id="outlined-required"
                variant="standard"
                value={TextField.name}
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField // age //
                label=" Age "
                id="standard-size-normal"
                type="number"
                variant="standard"
                value={TextField.name}
                name="age"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField // numéro téléphone //
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label=" Phone "
                id="standard-size-normal"
                variant="standard"
                value={TextField.name}
                onChange={handleChange}
                name="phone"
                required
              />
            </div>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="sexe"
                  value={TextField.name}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="woman"
                    control={<Radio />}
                    label="woman"
                  />
                  <FormControlLabel
                    value="man"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </>
        )}
        <div>
          <TextareaAutosize
            label="Send a message"
            aria-label="minimum height"
            minRows={3}
            placeholder="Description"
            style={{ width: 200 }}
            name="message"
            value={TextField.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}
