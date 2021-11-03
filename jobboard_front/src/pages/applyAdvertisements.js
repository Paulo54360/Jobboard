import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ApplyAdvertisementsComponent from "../components/applyAdvertismentCard";
import { Redirect } from "react-router-dom";

export default function ApplyAdverisements(appProps) {
  const [applyAdverisements, setApplyAdverisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  let maxPage = Math.ceil(applyAdverisements.length / 3);
  const next = () => setPage((page + 1) % maxPage);
  const prev = () => {
    setPage((page - 1) % maxPage);
  };

  useEffect(() => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    fetch("http://localhost:5000/api/apply", {
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((applyAdverisements) => {
        setApplyAdverisements(applyAdverisements);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(appProps.appProps);
  return (
    <div>
      {(!appProps.appProps || appProps.appProps.role !== 1) && (
        <Redirect to="/" />
      )}
      <h1>applyAdverisements jobBoard</h1>
      {!loading ? (
        <div>
          {applyAdverisements.slice(page * 3, 3 * (page + 1)).map((item) => (
            <ApplyAdvertisementsComponent item={item} />
          ))}
          <div>
            <Button onClick={prev} disabled={!page}>
              &lt;Prev
            </Button>
            <Button
              onClick={next}
              disabled={page === Math.ceil(applyAdverisements.length / 3) - 1}
            >
              Next&gt;
            </Button>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
