import { Router } from "express";
import { db } from "@workspace/db";
import { incomeRecordsTable, debtRecordsTable, expensesTable } from "@workspace/db/schema";
import { gte, lte, and, eq } from "drizzle-orm";

const router = Router();

function getPeriodRange(period: string, from?: string, to?: string): { from: Date; to: Date } {
  const now = new Date();
  switch (period) {
    case "today": {
      const start = new Date(now); start.setHours(0, 0, 0, 0);
      const end = new Date(now); end.setHours(23, 59, 59, 999);
      return { from: start, to: end };
    }
    case "yesterday": {
      const d = new Date(now); d.setDate(d.getDate() - 1);
      const start = new Date(d); start.setHours(0, 0, 0, 0);
      const end = new Date(d); end.setHours(23, 59, 59, 999);
      return { from: start, to: end };
    }
    case "week": {
      const start = new Date(now); start.setDate(now.getDate() - now.getDay()); start.setHours(0, 0, 0, 0);
      const end = new Date(now); end.setHours(23, 59, 59, 999);
      return { from: start, to: end };
    }
    case "month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      return { from: start, to: end };
    }
    case "year": {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      return { from: start, to: end };
    }
    case "custom": {
      return {
        from: from ? new Date(from) : new Date(now.getFullYear(), now.getMonth(), 1),
        to: to ? new Date(to) : new Date(),
      };
    }
    default: {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      return { from: start, to: end };
    }
  }
}

router.get("/accounts/summary", async (req, res) => {
  const { period = "month", from, to } = req.query as { period?: string; from?: string; to?: string };
  const range = getPeriodRange(period, from, to);

  const [incomeRows, expenseRows, settledDebtRows] = await Promise.all([
    db.select().from(incomeRecordsTable).where(
      and(gte(incomeRecordsTable.completedAt, range.from), lte(incomeRecordsTable.completedAt, range.to))
    ),
    db.select().from(expensesTable).where(
      and(gte(expensesTable.date, range.from), lte(expensesTable.date, range.to))
    ),
    db.select().from(debtRecordsTable).where(
      and(eq(debtRecordsTable.isSettled, true), gte(debtRecordsTable.createdAt, range.from), lte(debtRecordsTable.createdAt, range.to))
    ),
  ]);

  const totalIncome = incomeRows.reduce((s, r) => s + r.totalAmount, 0);
  const totalExpenses = expenseRows.reduce((s, r) => s + r.amount, 0);
  const debtCollected = settledDebtRows.reduce((s, r) => s + r.totalAmount, 0);

  res.json({
    income: totalIncome,
    expenses: totalExpenses,
    netProfit: totalIncome - totalExpenses,
    debtCollected,
    period,
    from: range.from.toISOString(),
    to: range.to.toISOString(),
  });
});

export default router;
