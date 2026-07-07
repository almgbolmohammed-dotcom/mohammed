import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export interface ReportCarStat {
  plate: string;
  model: string;
  income: number;
  rentals: number;
}

export const monthlyReportsTable = pgTable("monthly_reports", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
  totalIncome: integer("total_income").notNull().default(0),
  totalExpenses: integer("total_expenses").notNull().default(0),
  netProfit: integer("net_profit").notNull().default(0),
  totalRentals: integer("total_rentals").notNull().default(0),
  completedRentals: integer("completed_rentals").notNull().default(0),
  totalDebt: integer("total_debt").notNull().default(0),
  topCars: jsonb("top_cars").$type<ReportCarStat[]>().notNull().default([]),
  contractsCount: integer("contracts_count").notNull().default(0),
});

export const insertMonthlyReportSchema = createInsertSchema(monthlyReportsTable);
export type InsertMonthlyReport = z.infer<typeof insertMonthlyReportSchema>;
export type MonthlyReport = typeof monthlyReportsTable.$inferSelect;
