import * as React from "react";
import { useState, useEffect } from "react";
import AdminUserCard from "../../components/admin/adminUserCard_component";
import { Modal, Box, Button } from "@mui/material";
import SignupField from "../../components/signup";

export default function AdminUser(appProps) {
  const [userDatas, setUserDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  let maxPage = Math.ceil(userDatas.length / 3);
  const next = () => setPage((page + 1) % maxPage);
  const prev = () => {
    setPage((page - 1) % maxPage);
  };

  useEffect(() => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    fetch("http://localhost:5000/api/users", { headers: myHeaders })
      .then((response) => {
        return response.json();
      })
      .then((userDatas) => {
        console.log("userDatas", userDatas);
        setUserDatas(userDatas);
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
      <h1>Users of JobBoard application</h1>
      {!loading ? (
        <div>
          <Button variant="contained" onClick={handleOpenModal}>
            Create user
          </Button>{" "}
          <Modal
            keepMounted
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 350 }}>
              <SignupField role={1} />
            </Box>
          </Modal>
          {userDatas.slice(page * 3, 3 * (page + 1)).map((item) => (
            <AdminUserCard
              key={item.name + item.id}
              name={item.name}
              firstname={item.firstname}
              email={item.email}
              phone={item.phone}
              age={item.age}
              sexe={item.sexe}
              role={item.role}
              compagny_id={item.compagny_id}
              id={item.id}
              created_at={item.created_at}
            />
          ))}
          <div>
            <Button onClick={prev} disabled={!page}>
              &lt;Prev
            </Button>
            <Button
              onClick={next}
              disabled={page === Math.ceil(userDatas.length / 3) - 1}
            >
              Next&gt;
            </Button>
          </div>
        </div>
      ) : (
        <p> loading</p>
      )}
    </div>
  );
}
