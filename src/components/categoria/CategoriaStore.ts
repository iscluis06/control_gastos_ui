import {action, makeObservable, observable} from "mobx";
import {Categoria, CategoriaGuardar, CategoriaResponse, MapeoPropiedades} from "./Types";
import {requestLogic} from "../../RequestLogic";
import StorePanel from "../../clases/StorePanel";
import Observador from "../../clases/Observador";
import {IServicioConsulta, OpcionSelector} from "../comunes/formulario/Selector";

export class CategoriaStore extends StorePanel<Categoria, CategoriaResponse> implements IServicioConsulta {
    mostrarDialogo: boolean = false;
    relacionObjetos = MapeoPropiedades;
    observador: Observador;

    constructor() {
        super("control_gastos/categorias");
        makeObservable(this, {
            mostrarDialogo: observable,
            alternarDialogo: action.bound,
            guardar: action.bound
        });
        this.servicioConsulta = this.servicioConsulta.bind(this);
        this.observador = new Observador();
    }

    alternarDialogo() {
        this.mostrarDialogo = !this.mostrarDialogo;
    }

    override async guardar({categoria_nombre}: CategoriaGuardar) {
        const cuerpo = {
            categoria_nombre: categoria_nombre
        };
        const response: CategoriaResponse = await requestLogic.realizarPeticion<CategoriaResponse>(this.urlServicio, "POST", cuerpo);
        if (response !==undefined) {
            this.mostrarDialogo = false;
            this.actualizarResultadosPanel();
            this.observador.dispararEvento("categoriasActualzadas");
        }
    }

    async servicioConsulta(consulta: string): Promise<OpcionSelector[]> {
        const respuestaServidor: CategoriaResponse[] = await requestLogic.realizarPeticion<CategoriaResponse[]>(`${this.urlServicio}?${consulta && 'categoriaNombre='+consulta}`, `GET`);
        return respuestaServidor.map(categoria => ({
            etiqueta: categoria.categoria_nombre,
            valor: categoria.categoria_id
        }));
    }
}
