const date_formatter = new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric"});

export const format_date = date_formatter.format;
