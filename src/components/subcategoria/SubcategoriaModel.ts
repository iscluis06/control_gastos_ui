import {action, makeObservable, observable} from "mobx";
import {LoginStore} from "../../stores/LoginStore";
import RequestLogic from "../../utils/RequestLogic";
import {Subcategoria, SubcategoriaResponse} from "./Types";

export default class SubcategoriaModel{
    @observable
    listaResultados: Subcategoria[] = [];

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
    async obtenerSubcategorias(limit:number = 5){
        if(this.store && this.store.token){
            this.loading = true;
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Authorization", `Token ${this.store.token}`);
            const response = await requestLogic.realizarPeticion("control_gastos/subcategorias/limit/5", headers, "GET");
            const responseBody = await response.json();
            this.mapResultados(responseBody);
        }
    }

    @action.bound
    mapResultados(responseBody: SubcategoriaResponse[]){
        this.listaResultados = responseBody.map(resultado => ({
            subcategoriaId: resultado.subcategoria_id,
            subcategoriaCategoria: resultado.subcategoria_categoria,
            subcategoriaModificado: resultado.subcategoria_modificado,
            subcategoriaCreado: resultado.subcategoria_creado,
            subcategoriaNombre: resultado.subcategoria_nombre,
            nombreCategoria: resultado.nombre_categoria,
            nombreUsuario: resultado.nombre_usuario
        }));
        this.loading = false;
    }

    @action.bound
    async guardar(subcategoriaNombre: string, subcategoriaCategoria:number){
        if (this.store && this.store.token) {
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Token ${this.store.token}`);
            const cuerpo = {
                subcategoria_nombre: subcategoriaNombre,
                subcategoria_categoria: subcategoriaCategoria
            };
            const response = await requestLogic.realizarPeticion("control_gastos/subcategorias", headers, "POST", cuerpo);
            if(response.ok){
                this.mostrarDialogo = false;
                this.obtenerSubcategorias();
            }
        }
    }

}
