class AttendantController {

    static async store(req, res) {
        try {
            await db.sequelize.transaction(async t => {
                const { consecutivo, convocados, limite_solicitud } = req.body;
                console.log(limite_solicitud);
                let mailList = [];
                for (let i = 0; i < convocados.length; i++) {
                    await db.Convocado.create({ cedula: convocados[i], consecutivo: consecutivo, limite_solicitud: limite_solicitud });
                    let correos = await db.Correo.findAll({ attributes: ['correo'], where: { cedula: convocados[i] } });
                    mailList = mailList.concat(correos);
                }
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error interno del servidor.'
            });
        }
    }
}