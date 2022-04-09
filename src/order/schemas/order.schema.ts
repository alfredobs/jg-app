/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  make: String,
  vin: String,
  model: String,
  year: String,
  milesIn: String,
  milesOut: String,
  customerName: String,
  Tel: String,
  address: String,
  pickUpAt: String,
  email: String,
  problem: String,
  repairMade: String,
  createdAt: { type: Date, default: Date.now },
});
