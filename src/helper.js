export function waitt() {
  return new Promise((res) => setTimeout(res, Math.random() * 1000));
}

function generateRandomColor() {
  const existingBudgetLength = getData({ key: "budgets" })?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 58%`;
}

export function getData({ key }) {
  return JSON.parse(localStorage.getItem(key));
}

export function deleteItem(key, id) {
  if (id) {
    const budgets = getData(key);
    const filteredBudgets = budgets.filter((budget) => budget.id !== id);
    localStorage.setItem("budgets", JSON.stringify(filteredBudgets));

    const expenses = getData({ key: "expenses" });
    const filteredExpenses = expenses.filter(
      (expense) => expense.budgetId !== id
    );
    return localStorage.setItem("expenses", JSON.stringify(filteredExpenses));
  } else {
    return localStorage.removeItem(key.key);
  }
}

export function getExpensesBelongToBudget(key, budgetId) {
  const expenses = getData(key);
  const expensesBelongToBudget = expenses.filter(
    (expense) => expense.budgetId === budgetId
  );
  return expensesBelongToBudget;
}
export function deleteExpense(key, id) {
  const expenses = getData(key);

  const filteredExpenses = expenses.filter((expense) => expense.id !== id);

  return localStorage.setItem("expenses", JSON.stringify(filteredExpenses));
}

export function createUser(value) {
  return localStorage.setItem("userName", JSON.stringify(value));
}

export function createBudget({ name, amount }) {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: Number(amount),
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudget = getData({ key: "budgets" }) ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
}

export function createExpense({ name, amount, budgetId }) {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: Number(amount),
    createdAt: Date.now(),
    budgetId: budgetId,
  };

  const existingExpenses = getData({ key: "expenses" }) ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
}

export function formatCurrency(amount) {
  return amount?.toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
  });
}

export function calculateSpentByBudget(budgetId) {
  const expenses = getData({ key: "expenses" });

  const budgetSpent = expenses?.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return (acc = acc + expense.amount);
  }, 0);

  return budgetSpent;
}

export function calculateTotalSpent(expenses) {
  return expenses.reduce((acc, expense) => (acc = acc + expense.amount), 0);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function getBudget(key, budgetId) {
  const budgets = getData(key);
  return budgets.filter((budget) => budget.id === budgetId)[0];
}
