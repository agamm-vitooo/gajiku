export const ExpenseModel = (amount, category, date, description) => ({
    amount: Number(amount),
    category: String(category).trim(),
    date: new Date(date),
    description: String(description).trim(),
});