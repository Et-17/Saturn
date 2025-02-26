const currency_formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger",
    signDisplay: "exceptZero"
});

export const format_currency = currency_formatter.format;
