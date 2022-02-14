export const convertirAValorMonetario = (numero: number): string => {
    return `${Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(numero)} MXN`
};
