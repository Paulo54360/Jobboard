module.exports = class advertisement {
  static getInfoById(pool, id, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT description, wages, places, schedule from COMPAGNIES_OFFERS where id=?",
        [id],
        (err, rows) => {
          if (!err) {
            console.log("id annonces", id);
            console.log("rows", rows);
            res.json(rows);
          } else {
            console.log(err);
          }
          connection.release();
        }
      );
    });
  }

  static getAll(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * from COMPAGNIES_OFFERS", (err, rows) => {
        if (!err) {
          console.log("rows", rows);
          res.status(200).json(rows);
        } else {
          res.status(401);
        }
        connection.release();
      });
    });
  }

  //   INSERT INTO client (prenom, nom, ville, age)
  //           (compagnies_id, job, description, wages, places, schedule)
  //  VALUES
  //ici on peut passer le compagnies id, car il sera rattaché au user, donc on passera celui du recruter

  //methode post pour créer une annonces
  static createAdvertisement(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const params = req.body;
      connection.query(
        "INSERT INTO COMPAGNIES_OFFERS SET ?",
        params,
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

  //modification annonces
  static updateAdvertisement(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const { id, description, job, wages, places, schedule } = req.body;
      connection.query(
        "UPDATE COMPAGNIES_OFFERS SET description = ?, job = ?, wages = ?, places = ?, schedule = ? where id=?",
        [description, job, wages, places, schedule, id],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.status(201).json(rows);
          } else {
            res.status(401).json(err);
          }
        }
      );
    });
  }

  //delete annonces
  static deleteAdvertisementById(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "UPDATE COMPAGNIES_OFFERS SET isActive = ? where id = ?",
        [req.body.isActive, req.params.id],
        (err, rows) => {
          connection.release();
          if (!err) {
            res
              .status(201)
              .send(`The offers as ${req.params.id}  as been archived`);
          } else {
            res.status(401).send(err);
          }
        }
      );
    });
  }

  static getAdveristementByCompanyId(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * from COMPAGNIES_OFFERS where compagnies_id = ?",
        [req.params.company_id],
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
};
