export function getFormattedDate(date: string): string {
  const split = date.split("T");

  return split[0];
}

export function getFullDate(date: string): string {
  const dateObject = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObject.toLocaleDateString("en-US", options);
}
