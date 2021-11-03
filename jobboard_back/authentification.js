const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = class auth {
  //register
  static register(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const {
        email,
        password,
        name,
        firstname,
        phone,
        role,
        sexe,
        age,
        compagny_id,
        created_at,
      } = req.body;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        connection.query(
          "INSERT INTO USERS SET email = ?, password = ?, name = ?, firstname = ?, phone= ?, role = ?, sexe = ? ,age = ?, compagny_id = ? ,created_at = ? ",
          [
            email,
            hash,
            name,
            firstname,
            phone,
            role,
            sexe,
            age,
            compagny_id,
            created_at,
          ],
          (err, rows) => {
            if (!err) {
              res.status(201).json(rows);
            } else {
              res.status(401).json(err);
            }
          }
        );
        connection.release();
      });
    });
  }

  //login
  static login(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const { email, password } = req.body;
      connection.query(
        "SELECT * from USERS where email = ? and isActive = 1",
        email,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, rows) => {
              if (rows) {
                const id = result[0].id;
                const token = jwt.sign({ id }, "jwtSecret", {
                  expiresIn: 864000,
                });
                res.status(201).json({
                  auth: true,
                  token,
                  id: result[0].id,
                  role: result[0].role,
                  firstname: result[0].firstname,
                  compagny_id: result[0].compagny_id,
                });
              } else {
                res
                  .status(401)
                  .send({ message: "Wrong combinaison email/paswword" });
              }
            });
          } else {
            res.status(404).send({ message: "User dont exist" });
          }
          connection.release();
        }
      );
    });
  }

  //get all user info
  static getUsers(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * from USERS", (err, rows) => {
        if (!err) {
          console.log("all user", rows);
          res.status(201).json(rows);
        } else {
          res.status(401).json(err);
        }
        connection.release();
      });
    });
  }

  //get user by id
  static getUserById(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * from USERS where id = ?",
        [req.params.id],
        (err, rows) => {
          if (!err) {
            res.status(201).json(rows);
          } else {
            res.status(401).json(err);
          }
          connection.release();
        }
      );
    });
  }

  //update user by id
  static updateUser(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("update body", req.body);
      connection.query(
        "UPDATE USERS SET name = ?, firstname = ?, phone = ? where id=?",
        [req.body.name, req.body.firstname, req.body.phone, req.body.id],
        (err, rows) => {
          if (!err) {
            console.log("Update user");
            res.status(201).json(rows);
          } else {
            res.status(401).json(err);
          }
          connection.release();
        }
      );
    });
  }

  //delete user by id
  //
  static deleteUser(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("desactive user", req.body);
      connection.query(
        "UPDATE USERS SET isActive = ? where id=?",
        [req.body.isActive, req.body.id],
        (err, rows) => {
          if (!err) {
            console.log("Desactiver");
            res.status(201).json(rows);
          } else {
            res.status(401).json(err);
          }
          connection.release();
        }
      );
    });
  }
};
