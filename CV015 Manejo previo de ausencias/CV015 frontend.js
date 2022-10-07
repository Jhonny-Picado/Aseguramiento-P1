export default class Convocar extends Component {

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.checked;
        if (name === 'seleccionarTodos') {
            this.setState({
                seleccionarTodos: value
            });
            let convocados = new Map();
            if (value) {
                let arrVerdaderos = Array(this.state.usuarios.length).fill(true);
                this.state.usuarios.map((e, i) => {
                    return convocados.set(e.cedula, arrVerdaderos[i]);
                });
            } else {
                let arrFalsos = Array(this.state.usuarios.length).fill(false);
                this.state.usuarios.map((e, i) => {
                    return convocados.set(e.cedula, arrFalsos[i]);
                });
            }
            this.setState({
                convocados: convocados
            });
        } else {
            let convocados = this.state.convocados;
            let values = convocados.set(name, value).values();
            this.checkSelectAll(values);
            this.setState(prevState => ({ convocados: prevState.convocados.set(name, value) }));
        }
    }


    checkSelectAll(values) {
        for (let value of values) {
            if (!value) {
                if (this.state.seleccionarTodos) {
                    this.setState({
                        seleccionarTodos: false
                    });
                }
                return;
            }
        }
        if (!this.state.seleccionarTodos) {
            this.setState({
                seleccionarTodos: true
            });
        }
        return;
    }

    //Tiene un error, pero es para no repetir código (btw esta línea de comentario no cuenta)
    handleSubmit(e) {
        const convocados = this.state.convocados;
        for (let i = 0; i < this.state.convocadosAnteriormente.length; i++) {
            if (convocados.get(this.state.convocadosAnteriormente[i].cedula)) {
                convocados.delete(this.state.convocadosAnteriormente[i].cedula);
            } else {
                await axios.delete(`/convocado/por_usuario/${this.state.consecutivo}/${this.state.convocadosAnteriormente[i].cedula}`);
            }
        }
    }
}