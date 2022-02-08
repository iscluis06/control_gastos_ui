import {Col, Container, Row, Spinner} from "react-bootstrap";
import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import CategoriaModel from "../CategoriaModel";
import {useContext, useEffect} from "react";
import {LoginContext} from "../../../context/LoginContext";
import {CategoriaDialogo} from "./CategoriaDialogo";
import {observer} from "mobx-react";

const categoriaModel = new CategoriaModel();

export const PanelCategoriaView = observer(() => {
    const {store} = useContext(LoginContext);
    categoriaModel.asignarStore(store);

    useEffect(() => {
        categoriaModel.obtenerCategorias();
    }, []);

    const {listaResultados, alternarDialogo, loading, mostrarDialogo, guardar} = categoriaModel;

    return (
        <>
            <TarjetaPanelView nombreTarjeta={"Categorias"} mensajeTodos={"Ver todas"} mensajeTodosAccion={() => {
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
                                <Col>Categoria</Col>
                                <Col>Creo</Col>
                                <Col>Fecha creación</Col>
                            </Row>
                            {listaResultados.map(resultado => {
                                return (<Row>
                                    <Col>{resultado.categoriaNombre}</Col>
                                    <Col>{resultado.categoriaUsuario}</Col>
                                    <Col>{(new Date(resultado.categoriaCreado)).toLocaleDateString()}</Col>
                                </Row>);
                            })}
                        </Container>
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <CategoriaDialogo mostrarDialogo={mostrarDialogo}
                              alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
