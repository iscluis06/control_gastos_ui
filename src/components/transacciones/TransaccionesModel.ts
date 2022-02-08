import {action, makeObservable, observable} from "mobx";
import {LoginStore} from "../../stores/LoginStore";
import RequestLogic from "../../utils/RequestLogic";
import {Transaccion, TransaccionResponse} from "./Types";

export class TransaccionesModel{
    @observable
    mostrarDialogo: boolean = false;

    @observable
    loading: boolean = false;

    @observable
    listaResultados: Transaccion[] = [];

    private store: LoginStore | undefined;

    constructor() {
        makeObservable(this);
    }

    asignarStore(store: LoginStore){
        this.store = store;
    }

    @action.bound
    alternarDialogo(){
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    @action.bound
    async obtenerTransacciones(limit:number = 5){
        if(this.store && this.store.token){
            this.loading = true;
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Authorization", `Token ${this.store.token}`);
            const response = await requestLogic.realizarPeticion("control_gastos/transacciones/limit/5", headers, "GET");
            const responseBody = await response.json();
            this.mapResultados(responseBody);
        }
    }

    @action.bound
    mapResultados(responseBody: TransaccionResponse[]){
        this.listaResultados = responseBody.map(transaccion => ({
            transaccionId: transaccion.transaccion_id,
            transaccionSubcategoria: transaccion.nombre_subcategoria,
            transaccionCuenta: transaccion.nombre_cuenta,
            transaccionFecha: transaccion.transaccion_fecha,
            transaccionCantidad: transaccion.transaccion_cantidad,
            transaccionUsuario: transaccion.nombre_usuario
        }));
        this.loading = false;
    }

    @action.bound
    async guardar(subcategoria: number, cuenta:number, cantidad: number){
        if (this.store && this.store.token) {
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Token ${this.store.token}`);
            const cuerpo = {
                transaccion_subcategoria: subcategoria,
                transaccion_cuenta: cuenta,
                transaccion_cantidad: cantidad
            };
            const response = await requestLogic.realizarPeticion("control_gastos/transacciones", headers, "POST", cuerpo);
            if(response.ok){
                this.mostrarDialogo = false;
                this.obtenerTransacciones();
            }
        }
    }
}
