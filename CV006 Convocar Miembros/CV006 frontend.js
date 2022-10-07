export default class Convocar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      consecutivo: this.props.match.params.consecutivo,
      usuarios: [],
      convocados: new Map(),
      convocadosAnteriormente: [],
      seleccionarTodos: false,
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.button = React.createRef();
  }

  componentDidMount() {
    auth.verifyToken()
      .then(value => {
        if (value) {
          let convAntCantidad = 0;
          let usuariosCantidad = 0;
          let convAnt = [];
          let usuarios = [];
          axios.get('/usuario')
            .then(res => {
              if (res.data.success) {
                this.setState({
                  usuarios: res.data.users
                });
                usuariosCantidad = res.data.users.length;
                usuarios = res.data.users;
                let convocados = new Map();
                for (let i = 0; i < usuariosCantidad; i++) {
                  convocados.set(usuarios[i].cedula, false);
                }
                axios.get(`/convocado/por_consejo/${this.state.consecutivo}`)
                  .then(res => {
                    if (res.data.success) {
                      this.setState({
                        convocadosAnteriormente: res.data.convocados
                      });
                      convAntCantidad = res.data.convocados.length;
                      convAnt = res.data.convocados;
                      if (convAntCantidad === usuariosCantidad) {
                        this.setState({
                          seleccionarTodos: true
                        });
                      }
                      for (let i = 0; i < usuariosCantidad; i++) {
                        for (let j = 0; j < convAntCantidad; j++) {
                          if (usuarios[i].cedula === convAnt[j].cedula) {
                            convocados.set(usuarios[i].cedula, true);
                          }
                        }
                      }
                    }
                    this.setState({
                      convocados: convocados
                    });
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        } else {
          this.setState({
            redirect: true
          })
          auth.logOut();
        }
      })
      .catch((err) => console.log(err));
  }


  handleSubmit(e) {
    e.preventDefault();
    auth.verifyToken()
      .then(async value => {
        if (value) {
          try {
            const convocados = this.state.convocados;
            const convoque = [];
            for (let [key, value] of convocados.entries()) {
              if (value) {
                convoque.push(key);
              }
            }
            if (convoque.length > 0) {
              this.button.current.setAttribute('disabled', 'disabled');
              this.button.current.style.cursor = 'progress';
              const res = await axios.post('/convocado', { convocados: convoque, consecutivo: this.state.consecutivo, limite_solicitud: requestDay() });
              if (res.data.success) {
                this.button.current.removeAttribute('disabled', 'disabled');
                this.button.current.style.cursor = 'default';
                myAlert('Éxito', 'Se han convocado todos los usuarios que se escogieron.', 'success');
                this.props.history.push('/gConsejos');
              } else {
                myAlert('Oh no', 'Ha ocurrido un error en el sistema.', 'error');
              }
            } else {
              myAlert('Éxito', 'Se han convocado todos los usuarios que se escogieron.', 'success');
              this.props.history.push('/gConsejos');
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          this.setState({
            redirect: true
          })
          auth.logOut();
        }
      })
      .catch((err) => console.log(err));
  }
}