removeByUser(req, res) {
    try {
      await db.sequelize.transaction(async t => {
        await db.Convocado.destroy({ where: { consecutivo: req.params.consecutivo, cedula: req.params.cedula } });
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