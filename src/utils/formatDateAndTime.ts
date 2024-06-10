export function formatDateTime(dateTimeString: string | null | undefined): string {
    if (!dateTimeString) return ""; // Verifica se o dateTimeString é nulo ou indefinido
    const [date] = dateTimeString.split('T'); // Separa a data da hora
    const [year, month, day] = date.split('-'); // Separa o ano, mês e dia
    return `${day}/${month}/${year}`; // Retorna a data formatada
}