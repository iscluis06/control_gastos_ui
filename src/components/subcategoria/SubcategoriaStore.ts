import {action, makeObservable, observable} from "mobx";
import RequestLogic, {requestLogic} from "../../RequestLogic";
import {Subcategoria, SubcategoriaGuardar, SubcategoriaResponse} from "./Types";

export default class SubcategoriaStore {
    @observable
    listaResultados: Subcategoria[] = [];

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
    async obtenerSubcategorias(limit: number = 5) {
        this.loading = true;
        const response: SubcategoriaResponse[] = await requestLogic.realizarPeticion<SubcategoriaResponse[]>(`control_gastos/subcategorias/limit/${limit}`, "GET");
        this.mapResultados(response);
    }

    @action.bound
    mapResultados(responseBody: SubcategoriaResponse[]) {
        this.listaResultados = responseBody?.map(resultado => ({
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
    async guardar({subcategoriaNombre, subcategoriaCategoria}: SubcategoriaGuardar) {
        const cuerpo = {
            subcategoria_nombre: subcategoriaNombre,
            subcategoria_categoria: subcategoriaCategoria
        };
        const response = await requestLogic.realizarPeticion("control_gastos/subcategorias", "POST", cuerpo);
        if (response!==undefined) {
            this.mostrarDialogo = false;
            this.obtenerSubcategorias();
        }
    }

}
