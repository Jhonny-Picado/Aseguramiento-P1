export default class AdministrarCorreo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correo: '',
            correos: [],
            redirect: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    deleteEmail(e, email) {
        e.preventDefault();
        auth.verifyToken()
            .then(value => {
                if (value) {

                    swal({
                        title: "Confirmación",
                        text: `Se eliminará ${email}`,
                        icon: "warning",
                        buttons: ["Cancelar", "Confirmar"],
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                axios.delete('/correo', { data: { correo: email } })
                                    .then(() => {
                                        this.getEmails();
                                    })
                                    .catch((err) => console.log(err));
                            }
                        });
                } else {
                    this.setState({
                        redirect: true
                    });
                    auth.logOut();
                }
            })
            .catch((err) => console.log(err));
    }
    handleSubmit(e) {
        e.preventDefault();
        auth.verifyToken()
            .then(value => {
                if (value) {
                    axios.post('/correo/verificar_correo', { correo: this.state.correo })
                        .then(res => {
                            if (!res.data.taken) {
                                const cedula = auth.getInfo().cedula;
                                axios.post(`/correo/${cedula}`, { correo: this.state.correo })
                                    .then(() => {
                                        this.getEmails()
                                        this.setState({
                                            correo: ''
                                        })
                                    })
                                    .catch((err) => console.log(err));
                            } else {
                                myAlert("Atención", "El correo que se digitó ya se encuentra registrado en el sistema.", "warning");

                            }
                        })
                        .catch((err) => console.log(err));
                } else {
                    this.setState({
                        redirect: true
                    });
                    auth.logOut();
                }
            })
            .catch((err) => console.log(err));
    }
}