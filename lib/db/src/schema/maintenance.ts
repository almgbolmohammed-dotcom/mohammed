import { pgTable, serial, integer, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { carsTable } from "./cars";

export const maintenanceTypeEnum = pgEnum("maintenance_type", ["emergency", "periodic"]);
export const maintenanceStatusEnum = pgEnum("maintenance_status", ["active", "completed"]);

export const maintenanceTable = pgTable("maintenance", {
  id: serial("id").primaryKey(),
  carId: integer("car_id").notNull().references(() => carsTable.id),
  type: maintenanceTypeEnum("type").notNull(),
  description: text("description").notNull(),
  startDate: timestamp("start_date").notNull().defaultNow(),
  estimatedEndDate: timestamp("estimated_end_date"),
  cost: integer("cost"),
  status: maintenanceStatusEnum("status").notNull().default("active"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMaintenanceSchema = createInsertSchema(maintenanceTable).omit({ id: true, createdAt: true });
export type InsertMaintenance = z.infer<typeof insertMaintenanceSchema>;
export type Maintenance = typeof maintenanceTable.$inferSelect;
