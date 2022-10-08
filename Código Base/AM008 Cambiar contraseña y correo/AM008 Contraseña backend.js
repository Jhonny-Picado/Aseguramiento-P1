class UserController {

    static async changePassword(req, res) {
        const { cedula, clave } = req.body;
        try {
            await db.sequelize.transaction(async t => {
                const encryptedPass = await this.encryptPassword(clave);
                await db.Usuario.update({ clave: encryptedPass },
                    { where: { cedula: cedula } });
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

    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}