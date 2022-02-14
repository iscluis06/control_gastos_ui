import {TarjetaPanelView} from "../../tarjeta_panel/TarjetaPanelView";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {useEffect} from "react";
import SubcategoriaStore from "../SubcategoriaStore";
import {observer} from "mobx-react";
import {SubcategoriaDialogo} from "./SubcategoriaDialogo";

const subcategoriaModel = new SubcategoriaStore();

const columnas = [
    'Subcategoría',
    'Categoria',
    'Creo',
    'Fecha creación'
];

export const PanelSubcategoriaView = observer(() => {
    useEffect(() => {
        subcategoriaModel.obtenerSubcategorias();
    }, []);

    const {listaResultados, alternarDialogo, loading, mostrarDialogo, guardar} = subcategoriaModel;

    return (
        <>
            <TarjetaPanelView nombreTarjeta={"Subcategoria"} mensajeTodos={"Ver todas"} mensajeTodosAccion={() => {
            }} mensajeNuevo={"Nueva"} mensajeNuevoAccion={alternarDialogo} esCarousel={false}>
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
                        <TarjetaPanelView.Tabla nombreTarjeta={"transaccion"} columnas={columnas}
                                                info={listaResultados?.map(subcategoria => [subcategoria.subcategoriaNombre, subcategoria.nombreCategoria, subcategoria.nombreUsuario, (new Date(subcategoria.subcategoriaCreado)).toLocaleDateString()])} />
                    </TarjetaPanelView.Entrada>)}
            </TarjetaPanelView>
            <SubcategoriaDialogo mostrarDialogo={mostrarDialogo}
                              alternarDialogo={alternarDialogo} guardar={guardar}/>
        </>)
});
