export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ""; // Verifica se o dateString é nulo ou indefinido
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}