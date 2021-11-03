module.exports = class compagnies {
  static getAll(pool, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * from COMPAGNIES", (err, rows) => {
        if (!err) {
          res.status(200).json(rows);
        } else {
          res.status(401).json("error get", err);
        }
        connection.release();
      });
    });
  }

  static getCompagny(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * from COMPAGNIES where id=?",
        [req.body.id],
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

  static createCompany(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const params = req.body;
      connection.query("INSERT INTO COMPAGNIES SET ?", params, (err, rows) => {
        if (!err) {
          res.status(201).json(rows);
        } else {
          res.status(401).json(err);
        }
        connection.release();
      });
    });
  }

  static updateCompany(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const { id, name, adress, description } = req.body;
      connection.query(
        "UPDATE COMPAGNIES SET name = ?, adress = ?, description = ? where id=?",
        [name, adress, description, id],
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

  static deleteCompany(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "UPDATE COMPAGNIES SET isActive = ? where id = ?",
        [req.body.isActive, req.body.id],
        (err, rows) => {
          console.log("OAUIAOUAIOUAI");
          if (!err) {
            console.log("Company desactiver");
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
