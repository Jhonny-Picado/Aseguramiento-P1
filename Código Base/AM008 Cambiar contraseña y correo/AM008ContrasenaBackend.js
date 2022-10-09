const bcrypt = require('bcrypt');


const UserController = (db) => {
  const encryptPassword = async (password) => {
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(password, salt);
    return password;
  };

  const changePassword = async (req, res) =>{
    const { cedula, clave } = req.body;
    try {
      const encryptedPass = await encryptPassword(clave);
      db.Usuario.update({ clave: encryptedPass },
        { where: { cedula: cedula } });
      res.json({
        success: true
      });
    } catch (error) {
      res.status(500).json({
        msg: 'Error interno del servidor.'
      });
    }
  }

  return {
    changePassword,
  };
};



module.exports = UserController;
