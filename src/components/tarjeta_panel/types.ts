export type PanelProps = {
    nombreTarjeta: string;
    mensajeTodos: string;
    mensajeTodosAccion: () => void;
    mensajeNuevo: string;
    mensajeNuevoAccion: () => void;
    children?: React.ReactNode;
    esCarousel: boolean;
}

export type EntradaProps = {
    idElemento: number,
    botonIzquierda: boolean,
    funcionIzquierda: (idElemento: number) => void,
    children: React.ReactNode
}

export type VaciaProps = {
    mensaje: string
}
