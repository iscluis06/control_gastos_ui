import {Button, Card, Carousel, Col, Row} from "react-bootstrap";
import styles from './TarjetaPanelView.module.css';
import classNames from "classnames";
import {EntradaProps, PanelProps, VaciaProps} from "./types";

const TarjetaPanelEntrada = (props: EntradaProps) => {
    const {idElemento, funcionIzquierda, botonIzquierda} = props;
    return (
        <Card className={styles.contentCard} key={idElemento}>
            <Card.Body>
                <Row>
                    <Col style={{marginTop: '1em', marginBottom: '3em'}}>
                        {props.children}
                    </Col>
                </Row>
                <Row>
                    {botonIzquierda && (
                        <Col md={10} xs={8}>
                            <Button key={`botonIzquierda${idElemento}`}
                                    variant={"primary"}
                                    onClick={(event) => funcionIzquierda(idElemento)}>Detalle</Button>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>);
};

const TarjetaPanelVacia = ({mensaje}: VaciaProps) => {
    return (
        <Card className={styles.contentCard}>
            <Card.Body>
                <Row>
                    <Col style={{marginTop: '1em', marginBottom: '3em'}}>
                        <h4>{mensaje}</h4>
                    </Col>
                </Row>
            </Card.Body>
        </Card>);
};

const TarjetaPanelView = (props: PanelProps) => {
    const {nombreTarjeta, mensajeTodos, mensajeNuevo, mensajeNuevoAccion, esCarousel} = props;
    return (
        <Col className={styles.rowGap} md={{span: 4, offset: 4}}>
            <Row className={styles.tituloTarjeta}>
                <Col xs={5} md={8}><h2>{nombreTarjeta}</h2></Col>
                <Col className={styles.textoDerecha} xs={{span: 'auto'}} md={{span: 'auto'}}><Button
                    onClick={() => {
                        mensajeNuevoAccion()
                    }} variant={"outline-primary"}>{mensajeNuevo}</Button><Button
                    variant={"link"}>{mensajeTodos}</Button></Col>
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

export {TarjetaPanelView};
