import {Col, Container, Row, Spinner} from "react-bootstrap";
import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import CategoriaStore from "../CategoriaStore";
import { useEffect} from "react";
import {CategoriaDialogo} from "./CategoriaDialogo";
import {observer} from "mobx-react";

const categoriaModel = new CategoriaStore();

export const PanelCategoriaView = observer(() => {

    useEffect(() => {
        categoriaModel.obtenerCategorias();
    }, []);

    const {listaResultados, alternarDialogo, loading, mostrarDialogo, guardar} = categoriaModel;

    return (
        <>
            <TarjetaPanelView nombreTarjeta={"Categorias"} mensajeTodos={"Ver todas"} enlaceTodos={"/categorias"} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {loading === false && listaResultados?.length == 0 &&
                <TarjetaPanelView.Vacia mensaje={"Sin resultados"}/>}
                {loading &&
                <Container>
                    <Row>
                        <Col>
                            <Spinner style={{display: "block", marginRight: "auto", marginLeft: "auto"}}
                                     animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>}
                {loading === false && listaResultados?.length > 0 && (
                    <TarjetaPanelView.Entrada>
                        <TarjetaPanelView.Tabla nombreTarjeta={"transaccion"} columnas={['Categoria','Creo','Fecha creación']}
                                                info={listaResultados?.map(categoria => [categoria.categoriaNombre, categoria.categoriaUsuario, (new Date(categoria.categoriaCreado)).toLocaleDateString()])} />
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <CategoriaDialogo mostrarDialogo={mostrarDialogo}
                              alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
