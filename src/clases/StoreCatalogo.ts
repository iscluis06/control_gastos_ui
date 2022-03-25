import {requestLogic} from "../RequestLogic";
import {action, makeObservable, observable, computed} from "mobx";

/**
 * X -> Objeto cliente
 * Y -> Objeto servidor
 */
export default abstract class StoreCatalogo<X extends Object, Y extends Object> {
    listaResultados: X[] = [];
    cargando: boolean = false;
    urlServicio: string = '';
    relacionObjetos: object = {};
    detalle?: X;

    constructor(urlServicio: string) {
        this.urlServicio = urlServicio;
        makeObservable(this, {
            listaResultados: observable,
            cargando: observable,
            detalle: observable,
            actualizarResultados: action.bound,
            realizarPeticion: action.bound
        });
    }

    async actualizarResultados<X>() {
        this.listaResultados = await this.realizarPeticion();
    }

    async realizarPeticion<X>(): Promise<X[]> {
        this.cargando = true;
        const respuestaServidor: Y[] = await requestLogic.realizarPeticion<Y[]>(`${this.urlServicio}`, `GET`);
        return this.relacionarResultados<X>(respuestaServidor);
    }

    relacionarResultados<X>(cuerpoRespuesta: Y[]): X[] {
        if(Object.keys(this.relacionObjetos).length == 0){
            throw new Error('La propiedad relacionObjetos no esta definida');
        }
        const nombrePropiedades: string[] = Object.keys(this.relacionObjetos);
        const lista: X[] = cuerpoRespuesta.map(respuesta => {
            let objetoTemporal: X = {} as X;
            nombrePropiedades.forEach(propiedad => {
                let propiedadServidor: string = this.relacionObjetos[propiedad as keyof {}];
                objetoTemporal = {
                    ...objetoTemporal,
                    [propiedad]: respuesta[propiedadServidor as keyof Y]
                };
            });
            return objetoTemporal;
        });
        this.cargando = false;
        return lista;
    }

    abstract guardar(valores?: {}): void;
}
