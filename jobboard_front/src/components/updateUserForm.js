import * as React from "react";
import { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { Redirect } from "react-router-dom";

export default function UpdateUserForm(props) {
  const [inputs, setInputs] = useState({});
  const [success, setSucces] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  let user = JSON.parse(localStorage.getItem("userInfo"));
  const handleSubmit = (event) => {
    //rajouter une alert si c'est bon
    event.preventDefault();
    inputs["id"] = props.user_id ? props.user_id : user.id;
    console.log("value", inputs);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inputs),
    };
    fetch(
      `http://localhost:5000/api/user/update/:${props.user_id}`,
      requestOptions
    )
      .then((response) => {
        setSucces(true);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("an error occur when fetching put data", error);
      });
  };

  return (
    <div>
      {!user && <Redirect to="/connect" />}
      {user && <h1>Modify my account</h1>}
      {success && <Alert>Changes is ok</Alert>}
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Name"
              name="name"
              id="standard-size-normal"
              value={TextField.name}
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField // Nom //
              label="First Name"
              id="outlined-required"
              variant="standard"
              value={TextField.name}
              name="firstname"
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <TextField // numéro téléphone //
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label=" Phone "
                id="standard-size-normal"
                variant="standard"
                value={TextField.name}
                onChange={handleChange}
                name="phone"
              />
            </div>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}
