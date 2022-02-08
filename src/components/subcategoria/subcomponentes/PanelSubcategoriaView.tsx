import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {LoginContext} from "../../../context/LoginContext";
import SubcategoriaModel from "../SubcategoriaModel";
import {observer} from "mobx-react";
import {SubcategoriaDialogo} from "./SubcategoriaDialogo";

const subcategoriaModel = new SubcategoriaModel();

export const PanelSubcategoriaView = observer(() => {
    const {store} = useContext(LoginContext);
    subcategoriaModel.asignarStore(store);

    useEffect(() => {
        subcategoriaModel.obtenerSubcategorias();
    }, []);

    const {listaResultados, alternarDialogo, loading, mostrarDialogo, guardar} = subcategoriaModel;

    return (
        <>
            <TarjetaPanelView nombreTarjeta={"Subcategoria"} mensajeTodos={"Ver todas"} mensajeTodosAccion={() => {
            }} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
                {loading === false && listaResultados.length == 0 &&
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
                {loading === false && listaResultados.length > 0 && (
                    <TarjetaPanelView.Entrada botonIzquierda={true} funcionIzquierda={() => {
                    }} idElemento={1}>
                        <Container>
                            <Row>
                                <Col>Subcategoría</Col>
                                <Col>Categoria</Col>
                                <Col>Creo</Col>
                                <Col>Fecha creación</Col>
                            </Row>
                            {listaResultados.map(resultado => {
                                return (<Row>
                                    <Col>{resultado.subcategoriaNombre}</Col>
                                    <Col>{resultado.nombreCategoria}</Col>
                                    <Col>{resultado.nombreUsuario}</Col>
                                    <Col>{(new Date(resultado.subcategoriaCreado)).toLocaleDateString()}</Col>
                                </Row>);
                            })}
                        </Container>
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <SubcategoriaDialogo mostrarDialogo={mostrarDialogo}
                              alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
