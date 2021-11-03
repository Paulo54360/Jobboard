const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const advertisement = require("./advertisement");
const apply = require("./applyAdvertisement");
const auth = require("./authentification");
const compagnies = require("./compagnies");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

// MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "api_user",
  password: "api_pwd",
  database: "Joboard",
});

//verify token
const verifyJWT = (req, res, next) => {
  console.log("debut de verify");
  const token = req.headers["authorization"].split(" ")[1];
  console.log("token w/ bearer", token);
  if (!token) {
    res.send("You need a token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ auth: false, message: "Authentification failed" });
      } else {
        console.log("OEOEOE");
        req.params.id = decoded.id;
        next();
      }
    });
  }
};

//first get

app.get("/api/advertisement/all", (req, res) => {
  advertisement.getAll(pool, res, req);
});

app.get("/api/advertisements", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("error", err);
    connection.query(
      "SELECT id, compagnies_id, compagny_name, job from COMPAGNIES_OFFERS where isActive = 1",
      (err, rows) => {
        connection.release();
        if (!err) {
          console.log(rows);
          res.status(201).json(rows);
        } else {
          res.status(err);
        }
      }
    );
  });
});

app.get("/api/advertisement/all/:company_id", (req, res) => {
  console.log("passe ???");
  advertisement.getAdveristementByCompanyId(pool, res, req);
});

app.get("/api/learnMore/:id", (req, res) => {
  console.log(req);
  advertisement.getInfoById(pool, req.params.id, res);
});

app.post("/api/advertisement/create", (req, res) => {
  advertisement.createAdvertisement(pool, res, req);
});

app.post("/api/advertisement/:id/update", (req, res) => {
  console.log("pass in put", req.body);
  advertisement.updateAdvertisement(pool, res, req);
});

app.post("/api/advertisement/:id", (req, res) => {
  advertisement.deleteAdvertisementById(pool, res, req);
});

//requete offers apply
app.post("/api/apply/:id", (req, res) => {
  console.log("bonne route ?");
  apply.applyToAdvertisement(pool, res, req);
});

app.get("/api/apply", (req, res) => {
  apply.getAll(pool, res);
});

//requete USERS

//register
app.post("/api/register", (req, res) => {
  auth.register(pool, res, req);
});

//login
app.post("/api/login", (req, res) => {
  auth.login(pool, res, req);
});

//getAllUsers
app.get("/api/users", (req, res) => {
  auth.getUsers(pool, res, req);
});

//isAuth
app.get("/api/user/isAuth", verifyJWT, (req, res) => {
  console.log("isAuthfunction");
  res.json("Yo u are authentificated");
});

//update user
app.post("/api/user/update/:id", (req, res) => {
  console.log("passe dans update");
  auth.updateUser(pool, res, req);
});

//deletUser
app.post("/api/user/delete/:id", (req, res) => {
  auth.deleteUser(pool, res, req);
});

//getUserbyId
app.get("/api/user/:id", (req, res) => {
  auth.getUserById(pool, res, req);
});

//requete compagny :

app.get("/api/compagnies", (req, res) => {
  compagnies.getAll(pool, res, req);
});

app.get("/api/company", (req, res) => {
  compagnies.getCompagny(pool, res, req);
});

app.post("/api/company/create", (req, res) => {
  compagnies.createCompany(pool, res, req);
});

app.post("/api/company/delete", (req, res) => {
  compagnies.deleteCompany(pool, res, req);
});

app.post("/api/company/update", (req, res) => {
  compagnies.updateCompany(pool, res, req);
});

// Listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`));
