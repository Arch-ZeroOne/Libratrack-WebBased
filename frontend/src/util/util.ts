export function getFormattedDate(date: string): string {
  const split = date.split("T");

  return split[0];
}
