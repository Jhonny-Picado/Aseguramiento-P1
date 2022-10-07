export default class CambioClave extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      actual: '',
      nueva: '',
      confirmacion: '',
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  
  handleSubmit(e) {
    e.preventDefault();
    auth.verifyToken()
      .then(value => {
        if (value) {
          if (this.state.nueva === this.state.confirmacion) {
            const user = {
              cedula: auth.getInfo().cedula,
              clave: this.state.actual
            }
            axios.post('/usuario/verificar_clave', user)
              .then(res => {
                if (res.data.success) {
                  axios.post('/usuario/cambiar_clave', { clave: this.state.nueva, cedula: auth.getInfo().cedula })
                    .then(res => {
                      if (res.data.success) {
                        myAlert('Éxito', 'La contraseña se ha cambiado satisfactoriamente.', 'success');
                        this.setState({
                          actual: '',
                          nueva: '',
                          confirmacion: ''
                        });
                      } else {
                        myAlert('Oh no!', 'Error interno del servidor.', 'error');
                        this.setState({
                          actual: '',
                          nueva: '',
                          confirmacion: ''
                        });
                      }
                    })
                    .catch((err) => console.log(err));
                } else {
                  myAlert('Verifique', 'La contraseña actual no coincide con nuestros registros.', 'error');
                  this.setState({
                    actual: '',
                    nueva: '',
                    confirmacion: ''
                  });
                }
              })
              .catch((err) => console.log(err));
          } else {
            myAlert('Verifique', 'La contraseña nueva y su confirmación son distintas.', 'error');
            this.setState({
              actual: '',
              nueva: '',
              confirmacion: ''
            });
          }
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
