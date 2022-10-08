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