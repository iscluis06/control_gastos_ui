import {action, makeObservable, observable} from "mobx";
import {requestLogic} from "../../RequestLogic";
import {MapeoPropiedades, Subcategoria, SubcategoriaGuardar, SubcategoriaResponse} from "./Types";
import StorePanel from "../../clases/StorePanel";

export default class SubcategoriaStore extends StorePanel<Subcategoria, SubcategoriaResponse> {
    relacionObjetos = MapeoPropiedades;
    mostrarDialogo: boolean = false;

    constructor() {
        super('control_gastos/subcategorias');
        makeObservable(this, {
            mostrarDialogo: observable,
            alternarDialogo: action.bound,
            guardar: action.bound
        });
    }

    alternarDialogo() {
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    async guardar({subcategoriaNombre, subcategoriaCategoria}: SubcategoriaGuardar) {
        const cuerpo = {
            subcategoria_nombre: subcategoriaNombre,
            subcategoria_categoria: subcategoriaCategoria
        };
        const response = await requestLogic.realizarPeticion(this.urlServicio, "POST", cuerpo);
        if (response!==undefined) {
            this.mostrarDialogo = false;
            await this.actualizarResultadosPanel();
        }
    }
}
