import {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import styles from './Selector.module.css'
import classNames from "classnames";

export type OpcionSelector = {
    valor: number | string,
    etiqueta: string
}

type EstadoSelector = {
    abrirListaResultados: boolean,
    resultadosConsulta: OpcionSelector[],
    elementoSeleccionado: OpcionSelector,
    valor: string
}

type PropsSelector = {
    className?: string,
    style?: CSSProperties,
    servicioConsulta: (consulta: string) => Promise<OpcionSelector[]>,
    referenciaEstado?: (valor: string, nombreEntrada:string) => void,
    id?: string
}

export interface IServicioConsulta {
    servicioConsulta: (consulta: string) => Promise<OpcionSelector[]>
}

export const Selector = ({className, style, servicioConsulta, id, referenciaEstado}: PropsSelector) => {
    const [estado, setEstado] = useState<EstadoSelector>({
        abrirListaResultados: false,
        resultadosConsulta: [],
        elementoSeleccionado: {etiqueta: '', valor: 0},
        valor: ''
    });

    useEffect(() => {
        const obtenerResultados = async() => {
            setEstado({
                ...estado,
                resultadosConsulta: await servicioConsulta(estado.valor)
            });
        };
        obtenerResultados();
    }, [estado.valor]);

    const establecerValor = (opcion: OpcionSelector) => {
        setEstado({...estado, elementoSeleccionado: opcion, valor: opcion.etiqueta, abrirListaResultados: false})
        if(referenciaEstado && id){
            const valor = typeof opcion.valor === 'number' ? opcion.valor.toString():opcion.valor;
            referenciaEstado(valor, id);
        }
    }

    const actualizarValor = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado({...estado, valor: event.target.value, elementoSeleccionado: {etiqueta: event.target.value, valor: ''}});
        if(referenciaEstado && id){
            referenciaEstado('', id);
        }
    };

    const enFocus = () => setEstado({...estado, valor: "", abrirListaResultados: true});

    const attributes = {};

    if(id) {
        // @ts-ignore
        attributes.id = id;
    }

    return (
        <div className={styles.Selector} style={style}>
            <input type="text"
                   value={estado.elementoSeleccionado.etiqueta}
                   className={classNames(['form-control', className])}
                   onChange={actualizarValor}
                   onFocus={enFocus}
                   {...attributes}
            />
            {estado.abrirListaResultados && <div className={styles.SelectorLista}>
                {estado.resultadosConsulta.map(consulta => <div onClick={() => {
                    console.log("asd");
                    establecerValor(consulta)
                }} className={styles.SelectorResultados}>
                    <span className={styles.SelectorTexto}>{consulta.etiqueta}</span>
                </div>)}
            </div>}
        </div>
    )
}
