import * as React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import AdminAdvertisementsComponent from "../../components/admin/adminAdvertisements_component";
import { Button } from "@mui/material";

export default function RecruiterHome(...appProps) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);
  const [page, setPage] = useState(0);
  const [isUser, setIsUser] = useState(false);

  let user = JSON.parse(localStorage.getItem("userInfo"));
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  let maxPage = Math.ceil(advertisements.length / 3);
  const next = () => setPage((page + 1) % maxPage);
  const prev = () => {
    setPage((page - 1) % maxPage);
  };
  useEffect(() => {
    user &&
      fetch(`http://localhost:5000/api/user/${user.id}`, {
        headers: myHeaders,
      })
        .then((response) => {
          return response.json();
        })
        .then((userData) => {
          console.log(userData[0].compagny_id);
          setUserData(userData);
        });
    fetch(`http://localhost:5000/api/advertisement/all/${user.compagny_id}}`, {
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((advertisements) => {
        setAdvertisements(advertisements);
        console.log("advertismeent", advertisements);
      })
      .catch((error) => {
        console.log("error fetching advertisment", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Advertisment of your company</h1>
      {!loading &&
        advertisements.map((item) => (
          <AdminAdvertisementsComponent
            item={item}
            compagnies={item}
            isAdmin={false}
          />
        ))}
      <div>
        <Button onClick={prev} disabled={!page}>
          &lt;Prev
        </Button>
        <Button
          onClick={next}
          disabled={page === Math.ceil(advertisements.length / 3) - 1}
        >
          Next&gt;
        </Button>
      </div>
    </div>
  );
}
