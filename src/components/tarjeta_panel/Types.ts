export type PanelProps = {
    nombreTarjeta: string;
    mensajeTodos: string;
    enlaceTodos: string;
    mensajeNuevo: string;
    mensajeNuevoAccion: () => void;
    children?: React.ReactNode;
    esCarousel: boolean;
    cargando: boolean;
}

export type EntradaProps = {
    children?: React.ReactNode
}

export type VaciaProps = {
    mensaje: string
}

export type TablaProps = {
    columnas: string[],
    info: (string|JSX.Element)[][],
    nombreTarjeta: string
}
