export function formatDateTime(dateTimeString: string): string {
    const [date] = dateTimeString.split('T'); // Separa a data da hora
    const [year, month, day] = date.split('-'); // Separa o ano, mês e dia
    return `${day}/${month}/${year}`; // Retorna a data formatada
}