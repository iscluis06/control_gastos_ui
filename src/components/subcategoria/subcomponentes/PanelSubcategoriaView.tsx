import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {observer} from "mobx-react";
import {SubcategoriaDialogo} from "./SubcategoriaDialogo";
import {PanelSubcategoriaViewProps} from "../Types";


const columnas = [
    'Subcategoría',
    'Categoria',
    'Creo',
    'Fecha creación'
];

export const PanelSubcategoriaView = observer(({store: {resultadosPanel, alternarDialogo, cargando, mostrarDialogo, guardar}, categoriaStore}: PanelSubcategoriaViewProps) => {


    return (
        <>
            <TarjetaPanelView cargando={cargando} nombreTarjeta={"Subcategoria"} mensajeTodos={"Ver todas"} enlaceTodos={"/subcategorias"} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {cargando === false && resultadosPanel?.length == 0 &&
                <TarjetaPanelView.Vacia mensaje={"Sin resultados"}/>}
                {cargando === false && resultadosPanel?.length > 0 && (
                    <TarjetaPanelView.Entrada>
                        <TarjetaPanelView.Tabla nombreTarjeta={"transaccion"} columnas={columnas}
                                                info={resultadosPanel?.map(subcategoria => [subcategoria.subcategoriaNombre, subcategoria.nombreCategoria, subcategoria.nombreUsuario, (new Date(subcategoria.subcategoriaCreado)).toLocaleDateString()])} />
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <SubcategoriaDialogo categoriaStore={categoriaStore} mostrarDialogo={mostrarDialogo}
                              alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
