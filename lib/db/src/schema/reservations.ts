import { pgTable, serial, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { carsTable } from "./cars";

export const reservationStatusEnum = pgEnum("reservation_status", ["pending", "confirmed", "cancelled", "completed"]);

export const reservationsTable = pgTable("reservations", {
  id: serial("id").primaryKey(),
  carId: integer("car_id").notNull().references(() => carsTable.id),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  zone: text("zone").notNull().default("inside"),
  dailyRate: integer("daily_rate").notNull(),
  notes: text("notes"),
  status: reservationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReservationSchema = createInsertSchema(reservationsTable).omit({ id: true, createdAt: true });
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservationsTable.$inferSelect;
