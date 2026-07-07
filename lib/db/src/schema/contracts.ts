import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export interface ContractTopCarEntry {
  plate: string;
  model: string;
}

export const contractsTable = pgTable("contracts", {
  id: text("id").primaryKey(),
  rentalId: integer("rental_id"),
  customerName: text("customer_name").notNull(),
  carModel: text("car_model").notNull().default(""),
  carPlate: text("car_plate").notNull().default(""),
  date: timestamp("date").notNull().defaultNow(),
  photos: jsonb("photos").$type<string[]>().notNull().default([]),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContractSchema = createInsertSchema(contractsTable).omit({ createdAt: true });
export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contractsTable.$inferSelect;
