import {action, makeObservable, observable} from "mobx";
import {Categoria, CategoriaResponse} from "./Types";
import RequestLogic, {requestLogic} from "../../RequestLogic";

export default class CategoriaStore {
    @observable
    listaResultados: Categoria[] = [];

    @observable
    loading: boolean = false;
    @observable
    mostrarDialogo: boolean = false;


    constructor() {
        makeObservable(this);
    }

    @action.bound
    alternarDialogo() {
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    @action.bound
    async obtenerCategorias(limit: number = 5) {
        this.loading = true;
        const response: CategoriaResponse[] = await requestLogic.realizarPeticion<CategoriaResponse[]>("control_gastos/categorias/limit/5", "GET");
        this.mapResultados(response);
    }

    @action.bound
    mapResultados(responseBody: CategoriaResponse[]) {
        this.listaResultados = responseBody?.map(resultado => ({
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
    async guardar(categoriaNombre: string) {
        const cuerpo = {
            categoria_nombre: categoriaNombre
        };
        const response: CategoriaResponse = await requestLogic.realizarPeticion<CategoriaResponse>("control_gastos/categorias", "POST", cuerpo);
        if (response !==undefined) {
            this.mostrarDialogo = false;
            this.obtenerCategorias();
        }
    }
}
