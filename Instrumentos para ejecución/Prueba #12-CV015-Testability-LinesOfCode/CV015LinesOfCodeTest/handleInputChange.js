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