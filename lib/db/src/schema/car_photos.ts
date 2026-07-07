import { pgTable, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { carsTable } from "./cars";

export const carPhotosTable = pgTable("car_photos", {
  id: serial("id").primaryKey(),
  carId: integer("car_id").notNull().unique().references(() => carsTable.id, { onDelete: "cascade" }),
  photos: jsonb("photos").$type<string[]>().notNull().default([]),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type CarPhotos = typeof carPhotosTable.$inferSelect;
