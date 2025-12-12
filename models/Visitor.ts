import mongoose, { Schema, model, models } from 'mongoose';

const VisitorSchema = new Schema({
  name: { type: String, default: 'portfolio_counter' },
  count: { type: Number, default: 0 },
  // New field to store location history
  recentVisits: [
    {
      city: String,
      country: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

const Visitor = models.Visitor || model('Visitor', VisitorSchema);

export default Visitor;