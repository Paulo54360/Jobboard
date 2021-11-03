import * as React from "react";
import { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import AdminAdvertisementsComponent from "../../components/admin/adminAdvertisements_component";
import CompofferPage from "../compOfferPage";
import { Redirect } from "react-router";

export default function AdminAdvertisements(appProps) {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [compagnies, setCompagnies] = useState(null);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  let maxPage = Math.ceil(advertisements.length / 3);
  const next = () => setPage((page + 1) % maxPage);
  const prev = () => {
    setPage((page - 1) % maxPage);
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
        setCompagnies(compagnies);
      });
    fetch("http://localhost:5000/api/advertisement/all", {
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((advertisements) => {
        console.log("advertisements", advertisements);
        setAdvertisements(advertisements);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  return (
    <div>
      {(!appProps.appProps || appProps.appProps.role !== 1) && (
        <Redirect to="/" />
      )}
      <h1>Advertisements jobBoard</h1>
      {!loading ? (
        <div>
          <Button variant="contained" onClick={handleOpenModal}>
            Create advertisement
          </Button>{" "}
          <Modal
            keepMounted
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 350 }}>
              <CompofferPage compagnies={compagnies} isAdmin={true} />
            </Box>
          </Modal>
          {advertisements.slice(page * 3, 3 * (page + 1)).map((item) => (
            <AdminAdvertisementsComponent item={item} compagnies={compagnies} />
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
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
