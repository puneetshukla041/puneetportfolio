// models/Visitor.ts
import mongoose, { Schema, model, models } from 'mongoose';

const VisitorSchema = new Schema({
  name: { type: String, default: 'portfolio_counter' }, // Static ID
  count: { type: Number, default: 0 },
});

// Prevent model overwrite in development
const Visitor = models.Visitor || model('Visitor', VisitorSchema);

export default Visitor;