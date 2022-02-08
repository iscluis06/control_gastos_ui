import {action, makeObservable, observable} from "mobx";
import {Categoria, CategoriaResponse} from "./Types";
import {LoginStore} from "../../stores/LoginStore";
import RequestLogic from "../../utils/RequestLogic";

export default class CategoriaModel{
    @observable
    listaResultados: Categoria[] = [];

    @observable
    loading: boolean = false;
    @observable
    mostrarDialogo: boolean = false;

    private store: LoginStore | undefined;

    constructor() {
        makeObservable(this);
    }

    asignarStore(store: LoginStore){
        this.store = store;
    }

    @action.bound
    alternarDialogo(){
        this.mostrarDialogo=!this.mostrarDialogo;
    }

    @action.bound
    async obtenerCategorias(limit:number = 5){
        if(this.store && this.store.token){
            this.loading = true;
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Authorization", `Token ${this.store.token}`);
            const response = await requestLogic.realizarPeticion("control_gastos/categorias/limit/5", headers, "GET");
            const responseBody = await response.json();
            this.mapResultados(responseBody);
        }
    }

    @action.bound
    mapResultados(responseBody: CategoriaResponse[]){
        this.listaResultados = responseBody.map(resultado => ({
            categoriaId: resultado.categoria_id,
            categoriaCuenta: resultado.categoria_cuenta,
            categoriaNombre: resultado.categoria_nombre,
            categoriaCreado: resultado.categoria_creado,
            categoriaModificado: resultado.categoria_modificado,
            categoriaUsuario: resultado.nombre_usuario
        }));
        this.loading = false;
    }

    @action.bound
    async guardar(categoriaNombre: string){
        if (this.store && this.store.token) {
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Token ${this.store.token}`);
            const cuerpo = {
                categoria_nombre: categoriaNombre
            };
            const response = await requestLogic.realizarPeticion("control_gastos/categorias", headers, "POST", cuerpo);
            if(response.ok){
                this.mostrarDialogo = false;
                this.obtenerCategorias();
            }
        }
    }
}
