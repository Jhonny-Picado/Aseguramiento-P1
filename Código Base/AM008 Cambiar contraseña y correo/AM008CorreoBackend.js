const bcrypt = require('bcrypt');


const CorreoController = (db) => {

  const store = async (req, res) =>{
    const { correo } = req.body;
      db.Correo.create({ correo: correo, cedula: req.params.cedula });
      res.json({
        success: true
      });
  }

  return {
    store,
  };
};



module.exports = CorreoController;
