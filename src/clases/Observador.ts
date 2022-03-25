
export interface IObservadorAccion {
    accionEvento: (nombreEvento: string) => void;
}

export default class Observador {
    listaObservdores: IObservadorAccion[];

    constructor() {
        this.listaObservdores = [];
    }

    registrarObservador(observador: IObservadorAccion){
        this.listaObservdores.push(observador);
    }

    dispararEvento(evento: string){
        this.listaObservdores.forEach(observador => observador.accionEvento(evento));
    }

    removerObservadoor(observador: IObservadorAccion){
        const indiceObservadoor = this.listaObservdores.indexOf(observador);
        let arregloAux = this.listaObservdores.slice(0, indiceObservadoor);
        arregloAux.concat(this.listaObservdores.slice(indiceObservadoor, this.listaObservdores.length - 1));
        this.listaObservdores = arregloAux;
    }
}
