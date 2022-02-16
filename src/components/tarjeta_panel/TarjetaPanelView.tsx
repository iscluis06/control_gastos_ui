import {Button, Card, Carousel, Col, Row, Table} from "react-bootstrap";
import styles from './TarjetaPanelView.module.css';
import classNames from "classnames";
import {EntradaProps, PanelProps, TablaProps, VaciaProps} from "./Types";
import {useNavigate} from "react-router-dom";

const TarjetaPanelEntrada = (props: EntradaProps) => {
    return (
        <Card className={styles.contentCard}>
            <Card.Body>
                <Row>
                    <Col style={{marginTop: '1em', marginBottom: '3em'}}>
                        {props.children}
                    </Col>
                </Row>
            </Card.Body>
        </Card>);
};

const TarjetaPanelVacia = ({mensaje}: VaciaProps) => {
    return (
        <Card className={styles.contentCard}>
            <Card.Body>
                <Row>
                    <Col>
                        <h4>{mensaje}</h4>
                    </Col>
                </Row>
            </Card.Body>
        </Card>);
};

const TarjetaPanelTabla = ({columnas, info}: TablaProps) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    {columnas.map((columna, index) => (<th key={index}>{columna}</th>))}
                </tr>
            </thead>
            <tbody>
            {info.map((fila,index) => (<tr key={"f"+index}>
                {fila.map(columna => (<td>{columna}</td>))}
            </tr>))}
            </tbody>
        </Table>
    )
}

const TarjetaPanelView = (props: PanelProps) => {
    let navigate = useNavigate();
    const {nombreTarjeta, mensajeTodos, mensajeNuevo, mensajeNuevoAccion, esCarousel, enlaceTodos} = props;
    return (
        <Col className={styles.rowGap}>
            <Row className={styles.tituloTarjeta}>
                <Col><h2>{nombreTarjeta}</h2></Col>
                <Col className={styles.textoDerecha}><Button
                    onClick={() => {
                        mensajeNuevoAccion()
                    }} variant={"outline-primary"}>{mensajeNuevo}</Button>
                    <Button onClick={() => navigate(enlaceTodos)} variant={"link"}>{mensajeTodos}</Button></Col>
            </Row>
            <Row>
                <Col>
                    {esCarousel &&
                    <Carousel indicators={false} interval={null} controls={true}
                              nextIcon={<span className={classNames(styles.arrow, styles.right)}/>}
                              prevIcon={<span className={classNames(styles.arrow, styles.left)}/>}>
                        {props.children}
                    </Carousel>}
                    {esCarousel==false &&
                        props.children
                    }
                </Col>
            </Row>
        </Col>
    )
}

TarjetaPanelView.Entrada = TarjetaPanelEntrada;
TarjetaPanelView.Vacia = TarjetaPanelVacia;
TarjetaPanelView.Tabla = TarjetaPanelTabla;

export {TarjetaPanelView};
