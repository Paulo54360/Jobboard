import * as React from "react";
import { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import AdminCompagniesComponent from "../../components/admin/adminCompagnies_component";
import SignupCompPage from "../SignupCompPage";
import { Redirect } from "react-router";

export default function AdminCompagnies(appProps) {
  const [compagnies, setCompagnies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  let maxPage = Math.ceil(compagnies.length / 3);
  const next = () => setPage((page + 1) % maxPage);
  const prev = () => {
    setPage((page - 1) % maxPage);
  };

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

  useEffect(() => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    fetch("http://localhost:5000/api/compagnies", {
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((compagnies) => {
        console.log("compagnies", compagnies);
        setCompagnies(compagnies);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {(!appProps.appProps || appProps.appProps.role !== 1) && (
        <Redirect to="/" />
      )}
      <h1>compagnies jobBoard</h1>
      {!loading ? (
        <div>
          <Button variant="contained" onClick={handleOpenModal}>
            Create company
          </Button>{" "}
          <Modal
            keepMounted
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 350 }}>
              <SignupCompPage />
            </Box>
          </Modal>
          {compagnies.slice(page * 3, 3 * (page + 1)).map((item) => (
            <AdminCompagniesComponent item={item} />
          ))}
          <div>
            <Button onClick={prev} disabled={!page}>
              &lt;Prev
            </Button>
            <Button
              onClick={next}
              disabled={page === Math.ceil(compagnies.length / 3) - 1}
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
