import {action, makeObservable, observable} from "mobx";
import {Categoria, CategoriaGuardar, CategoriaResponse} from "./Types";
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
        const response: CategoriaResponse[] = await requestLogic.realizarPeticion<CategoriaResponse[]>(`control_gastos/categorias/limit/${limit}`, "GET");
        this.mapResultados(response);
    }

    @action.bound
    mapResultados(responseBody: CategoriaResponse[]) {
        this.listaResultados = responseBody?.map(resultado => ({
            categoriaId: resultado.categoria_id,
            categoriaNombre: resultado.categoria_nombre,
            categoriaCreado: resultado.categoria_creado,
            categoriaModificado: resultado.categoria_modificado,
            categoriaUsuario: resultado.nombre_usuario
        }));
        this.loading = false;
    }

    @action.bound
    async guardar({categoria_nombre}: CategoriaGuardar) {
        const cuerpo = {
            categoria_nombre: categoria_nombre
        };
        const response: CategoriaResponse = await requestLogic.realizarPeticion<CategoriaResponse>("control_gastos/categorias", "POST", cuerpo);
        if (response !==undefined) {
            this.mostrarDialogo = false;
            this.obtenerCategorias();
        }
    }
}
