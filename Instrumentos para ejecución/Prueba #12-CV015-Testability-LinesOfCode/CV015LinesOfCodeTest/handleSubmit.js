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