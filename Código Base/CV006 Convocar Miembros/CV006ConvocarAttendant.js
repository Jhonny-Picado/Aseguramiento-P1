const AttendantController = (db) => {

    const getCouncilAttendant = async (req, res) => {
        try {
            const council = await db.sequelize.query(`SELECT "Consejo"."institucion", "Consejo"."carrera", "Consejo"."campus", "Consejo"."nombre_consejo", "Consejo"."consecutivo", "Consejo"."lugar", "Consejo"."fecha", "Consejo"."hora", "Consejo"."id_tipo_sesion", "Convocado"."limite_solicitud" FROM public."Consejo" INNER JOIN public."Convocado" ON "Consejo"."consecutivo" = "Convocado"."consecutivo" WHERE "Convocado"."cedula" = '${req.params.cedula}' AND "Consejo"."consecutivo" = '${req.params.consecutivo}'`);
            if (council[0].length > 0) {
              res.json({
                success: true,
                council: council[0][0]
              });
            } else {
              res.json({
                success: false,
                msg: 'No se encontró el consejo.'
              });
            }
          } catch (error) {
            res.status(500).json({
              msg: 'Error interno del servidor.'
            });
          }
    }
    
    return {getCouncilAttendant};
};

module.exports = AttendantController;