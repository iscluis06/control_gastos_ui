import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {CategoriaDialogo} from "./CategoriaDialogo";
import {observer} from "mobx-react";
import {PanelCategoriaViewProps} from "../Types";

export const PanelCategoriaView = observer(({store: {resultadosPanel, alternarDialogo, cargando, mostrarDialogo, guardar, actualizarResultadosPanel}}:PanelCategoriaViewProps) => {
    return (
        <>
            <TarjetaPanelView cargando={cargando} nombreTarjeta={"Categorias"} mensajeTodos={"Ver todas"} enlaceTodos={"/categorias"} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {cargando === false && resultadosPanel?.length == 0 &&
                <TarjetaPanelView.Vacia mensaje={"Sin resultados"}/>}
                {cargando === false && resultadosPanel?.length > 0 && (
                    <TarjetaPanelView.Entrada>
                        <TarjetaPanelView.Tabla nombreTarjeta={"transaccion"} columnas={['Categoria','Creo','Fecha creación']}
                                                info={resultadosPanel?.map(categoria => [categoria.categoriaNombre, categoria.categoriaUsuario, (new Date(categoria.categoriaCreado)).toLocaleDateString()])} />
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <CategoriaDialogo mostrarDialogo={mostrarDialogo}
                              alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
