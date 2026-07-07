import { pgTable, serial, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { carsTable } from "./cars";

export const zoneEnum = pgEnum("zone", ["inside", "outside"]);
export const rentalStatusEnum = pgEnum("rental_status", ["active", "completed"]);

export const rentalsTable = pgTable("rentals", {
  id: serial("id").primaryKey(),
  carId: integer("car_id").notNull().references(() => carsTable.id),
  zone: zoneEnum("zone").notNull(),
  dailyRate: integer("daily_rate").notNull(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  plannedDays: integer("planned_days"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  daysCount: integer("days_count").notNull().default(0),
  totalAmount: integer("total_amount").notNull().default(0),
  status: rentalStatusEnum("status").notNull().default("active"),
  startKm: integer("start_km"),
  allowedKm: integer("allowed_km"),
  extraKmRate: integer("extra_km_rate"),
  endKm: integer("end_km"),
});

export const insertRentalSchema = createInsertSchema(rentalsTable).omit({ id: true, completedAt: true, daysCount: true, totalAmount: true, status: true, startedAt: true });
export type InsertRental = z.infer<typeof insertRentalSchema>;
export type Rental = typeof rentalsTable.$inferSelect;
