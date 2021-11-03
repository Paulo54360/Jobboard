module.exports = class apply {
  static applyToAdvertisement(pool, res, req) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const params = req.body;
      connection.query(
        "INSERT INTO OFFERS_APPLY SET ?",
        params,
        (err, rows) => {
          if (!err) {
            res.status(201).send(rows);
          } else {
            res.status(401).json(err);
          }
        }
      );
    });
  }

  static getAll(pool, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * from OFFERS_APPLY", (err, rows) => {
        if (!err) {
          console.log("all apply", rows);
          res.status(200).json(rows);
        } else {
          res.status(401).json(err);
        }
        connection.release();
      });
    });
  }

  // voir comment marche les jointures pour recuper selon l'id de la boite
  //   static getApplyAdvertisementById(pool, res) {
  //       pool.getConnection((err, connection) => {
  //           if (err) throw err;
  //           connection.query(
  //               "SELECT * from OFFERS_APPLU where"
  //           )
  //       })
  //   }
};
