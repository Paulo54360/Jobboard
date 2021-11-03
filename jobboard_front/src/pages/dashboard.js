import * as React from "react";
import CardComponent from "../components/card_component";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";

export default function Dashboard(...appProps) {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    user &&
      fetch(`http://localhost:5000/api/user/${user.id}`, {
        headers: myHeaders,
      })
        .then((response) => {
          console.log("reponse", response);
          return response.json();
        })
        .then((userData) => {
          console.log(userData);
          setUserData(userData);
        });
    fetch(`http://localhost:5000/api/advertisements`, {
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("an error occur for fetch", error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome on JobBoard {userData != null && userData[0].firstname} </h1>
      {loading ? (
        <CircularProgress />
      ) : (
        data.map((item) => (
          <CardComponent
            key={item.id + item.compagny_name}
            id={item.id}
            compagny_name={item.compagny_name}
            job={item.job}
            userData={userData}
          />
        ))
      )}
    </div>
  );
}
