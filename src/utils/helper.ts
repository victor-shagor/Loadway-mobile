export function formatCamelCaseToTitleCase(str: string) {
  // Insert a space before all capital letters and capitalize the first letter
  const result = str.replace(/([A-Z])/g, " $1").replace(/^./, function (char) {
    return char.toUpperCase();
  });

  return result.trim();
}

export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0"); // Get day and ensure two digits
  const month = date.toLocaleString("en-US", { month: "short" }); // Get the short month name
  const year = date.getFullYear(); // Get the year

  return `${day} ${month} ${year}`;
}

export const formatNarration = (input: string): string => {
  if (!input) {
    return "";
  }
  // Split the string based on camel case pattern or uppercase letters
  const formatted = input.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Capitalize each word in the split string
  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const timestampDisplay = (timestamp: any) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }); // "JAN 20 2023"
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }); // "10:00 AM"

  return { formattedDate, formattedTime };
};

export const formatMoney = (amount: number, currency: string): string => {
  return currency + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getInitials = (name: string): string => {
  const splitName = name.split(" ");
  let initials = "";
  splitName.forEach((str) => {
    initials = initials + str.charAt(0).toUpperCase();
  });
  return initials;
};

export const isValidDateString = (dateString: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?([+-]\d{2}:\d{2}|Z)?$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export const formatDate = (date: Date) => {
  if(!isValidDateString(date as any)) return date;
  const _date = new Date(date);
  return _date.toISOString().split('T')[0];
}

export const formatString = (input: string) => {
  const words = input.toLowerCase().split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};