import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
const expenseValidateSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(5),
  amount: z.number().int().positive(),
});
type Expense = z.infer<typeof expenseValidateSchema>;
const createExpenseValidateSchema = expenseValidateSchema.omit({ id: true });
const fakeexpenses: Expense[] = [
  { id: 1, title: "sunfeast biscuit", amount: 10 },
  { id: 2, title: "burborn biscuit", amount: 10 },
  { id: 3, title: "sunfeast marigold", amount: 20 },
];

export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeexpenses });
  })
  .post("/", zValidator("json", createExpenseValidateSchema), async (c) => {
    const expense = c.req.valid("json");
    fakeexpenses.push({ ...expense, id: fakeexpenses.length + 1 });
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeexpenses.find((item) => item.id === id);
    if (!expense) {
      c.notFound();
    }
    return c.json(expense);
  })
  .get("/totalexpenses", (c) => {
    const total = fakeexpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total: total });
  })
  .delete("/:id", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeexpenses.findIndex((expense) => expense.id === id);
    if (!index) {
      return c.notFound();
    }
    const deleteExpense = fakeexpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
