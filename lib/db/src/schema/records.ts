import { pgTable, serial, integer, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { carsTable } from "./cars";
import { rentalsTable } from "./rentals";

export const recordZoneEnum = pgEnum("record_zone", ["inside", "outside"]);

export const incomeRecordsTable = pgTable("income_records", {
  id: serial("id").primaryKey(),
  rentalId: integer("rental_id").notNull().references(() => rentalsTable.id),
  carPlate: text("car_plate").notNull(),
  carModel: text("car_model").notNull(),
  customerName: text("customer_name"),
  zone: recordZoneEnum("zone").notNull(),
  daysCount: integer("days_count").notNull(),
  dailyRate: integer("daily_rate").notNull(),
  totalAmount: integer("total_amount").notNull(),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const debtRecordsTable = pgTable("debt_records", {
  id: serial("id").primaryKey(),
  rentalId: integer("rental_id").notNull().references(() => rentalsTable.id),
  carPlate: text("car_plate").notNull(),
  carModel: text("car_model").notNull(),
  customerName: text("customer_name"),
  zone: recordZoneEnum("zone").notNull(),
  daysCount: integer("days_count").notNull(),
  dailyRate: integer("daily_rate").notNull(),
  totalAmount: integer("total_amount").notNull(),
  isSettled: boolean("is_settled").notNull().default(false),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type IncomeRecord = typeof incomeRecordsTable.$inferSelect;
export type DebtRecord = typeof debtRecordsTable.$inferSelect;
