import { pgTable, serial, text, integer, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const zonesTable = pgTable("zones", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  highlights: text("highlights").array().notNull().default([]),
});

export const vehiclesTable = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  capacity: integer("capacity").notNull(),
  description: text("description").notNull(),
  amenities: text("amenities").array().notNull().default([]),
  imageUrl: text("image_url").notNull(),
  priceModifier: numeric("price_modifier", { precision: 5, scale: 2 }).notNull().default("1.00"),
});

export const pricingTable = pgTable("pricing", {
  id: serial("id").primaryKey(),
  originZoneId: integer("origin_zone_id").notNull().references(() => zonesTable.id),
  destinationZoneId: integer("destination_zone_id").notNull().references(() => zonesTable.id),
  vehicleId: integer("vehicle_id").notNull().references(() => vehiclesTable.id),
  priceUsd: numeric("price_usd", { precision: 10, scale: 2 }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
});

export const reservationsTable = pgTable("reservations", {
  id: serial("id").primaryKey(),
  confirmationCode: text("confirmation_code").notNull().unique(),
  passengerName: text("passenger_name").notNull(),
  passengerEmail: text("passenger_email").notNull(),
  passengerPhone: text("passenger_phone").notNull(),
  originZoneId: integer("origin_zone_id").notNull().references(() => zonesTable.id),
  destinationZoneId: integer("destination_zone_id").notNull().references(() => zonesTable.id),
  vehicleId: integer("vehicle_id").notNull().references(() => vehiclesTable.id),
  pickupAddress: text("pickup_address").notNull(),
  dropoffAddress: text("dropoff_address").notNull(),
  pickupDatetime: text("pickup_datetime").notNull(),
  passengerCount: integer("passenger_count").notNull(),
  flightNumber: text("flight_number"),
  specialRequests: text("special_requests"),
  totalPriceUsd: numeric("total_price_usd", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertZoneSchema = createInsertSchema(zonesTable).omit({ id: true });
export const insertVehicleSchema = createInsertSchema(vehiclesTable).omit({ id: true });
export const insertPricingSchema = createInsertSchema(pricingTable).omit({ id: true });
export const insertReservationSchema = createInsertSchema(reservationsTable).omit({ id: true, confirmationCode: true, totalPriceUsd: true, status: true, createdAt: true });

export type Zone = typeof zonesTable.$inferSelect;
export type Vehicle = typeof vehiclesTable.$inferSelect;
export type Pricing = typeof pricingTable.$inferSelect;
export type Reservation = typeof reservationsTable.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
