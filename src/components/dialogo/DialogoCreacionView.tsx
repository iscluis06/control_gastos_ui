import {Button, Col, Container, Form, FormControl, FormSelect, Row, ToggleButton} from "react-bootstrap";
import {DialogoCreacionViewProps, TiposComponente} from "./Types";
import React, {useState} from "react";
import {observer} from "mobx-react";
import {DialogoView} from "./DialogoView";
import styles from "./Dialogo.module.css";

export const DialogoCreacionView = observer(<T, >({
                                                      funcionGuardar,
                                                      ocultar,
                                                      mostrar,
                                                      componentes,
                                                      titulo
                                                  }: DialogoCreacionViewProps<T>) => {
    const stateProps = {} as any;

    componentes.map(componente => {
        stateProps[componente.nombreEntrada] = componente.valorInicial;
    });

    const [formulario, setFormulario] = useState(stateProps);

    const obtenerEntrada = (etiqueta: string, tipoEntrada: TiposComponente, nombreEntrada: string, options?: HTMLOptionElement[]) => {
        switch (tipoEntrada) {
            case 'select':
                return (<FormSelect id={nombreEntrada} value={formulario[nombreEntrada]} onChange={event => {
                    const {value} = event.target;
                    setFormulario((prevState: any) => ({
                        ...prevState,
                        [nombreEntrada]: Number(value)
                    }));
                }}>
                    {options}
                </FormSelect>);
                break;
            case 'text':
                return (<FormControl id={nombreEntrada} value={formulario[nombreEntrada]} onChange={event => {
                    const {value} = event.target;
                    setFormulario((prevState: any) => ({
                        ...prevState,
                        [nombreEntrada]: value
                    }));
                }}/>);
                break;
            case 'checkbox':
                return (<ToggleButton type={"checkbox"} variant="outline-primary" id={nombreEntrada} value={1}
                                      checked={formulario[nombreEntrada]} onChange={event => {
                    const {checked} = event.target;
                    setFormulario((prevState: any) => ({
                        ...prevState,
                        [nombreEntrada]: checked
                    }));
                }}>{etiqueta}</ToggleButton>);
                break;
            case 'number':
                return (
                    <FormControl type="number" id={nombreEntrada} value={formulario[nombreEntrada]} onChange={event => {
                        const {value} = event.target;
                        setFormulario((prevState: any) => ({
                            ...prevState,
                            [nombreEntrada]: value
                        }))
                    }}/>);
                break;
            default:
                return (<></>);
                break;

        }
    }

    return (
        <DialogoView titulo={titulo} mostrar={mostrar} ocultar={ocultar}>
            <Container>
                <Form onSubmit={event => {
                    funcionGuardar(formulario as T);
                    setFormulario(stateProps);
                    event.preventDefault();
                }}>
                    {componentes.map(componente => {
                        return (<Row className={styles.espacioFilas}>
                            <Col>
                                <Form.Label htmlFor={componente.nombreEntrada}>{componente.etiqueta}</Form.Label>
                            </Col>
                            <Col>
                                {obtenerEntrada(componente.etiqueta, componente.tipoEntrada, componente.nombreEntrada, componente.options)}
                            </Col>
                        </Row>);
                    })}
                    <Row>
                        <Col md={"auto"}>
                            <Button type={"submit"}>Guardar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </DialogoView>);
});
