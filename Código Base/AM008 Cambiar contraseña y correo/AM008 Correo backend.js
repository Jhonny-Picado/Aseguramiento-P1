class EmailController {
    static async store(req, res) {
        const { correo } = req.body;
        try {
            await db.sequelize.transaction(async t => {
                await db.Correo.create({ correo: correo, cedula: req.params.cedula });
                res.json({
                    success: true
                });
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error interno del servidor.'
            });
        }
    }
    static async isEmailTaken(req, res) {
        const { correo } = req.body;
        try {
          await db.sequelize.transaction(async t => {
            const count = await db.Correo.count({ where: { correo: correo } });
            if (count > 0) {
              res.json({
                taken: true
              });
            } else {
              res.json({
                taken: false
              });
            }
          });
        } catch (error) {
          res.status(500).json({
            msg: 'Error interno del servidor.'
          });
        }
    }
    static async remove(req, res) {
        const { correo } = req.body;
        try {
            await db.sequelize.transaction(async t => {
                await db.Correo.destroy({ where: { correo: correo } });
                res.json({
                    success: true
                });
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error interno del servidor.'
            });
        }
    }
    static async removeById(req, res) {
        try {
            await db.sequelize.transaction(async t => {
                await db.Correo.destroy({ where: { cedula: req.params.cedula } });
                res.json({
                    success: true
                });
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error interno del servidor.'
            });
        }
    }
}