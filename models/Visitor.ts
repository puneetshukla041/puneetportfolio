import mongoose, { Schema, model, models } from 'mongoose';

const VisitorSchema = new Schema({
  name: { type: String, default: 'portfolio_counter' },
  count: { type: Number, default: 0 },
  recentVisits: [
    {
      city: String,
      country: String,
      // ADD THESE TWO LINES:
      device: { type: String, default: 'Unknown' },  // e.g., Windows, iPhone
      browser: { type: String, default: 'Unknown' }, // e.g., Chrome, Safari
      date: { type: Date, default: Date.now }
    }
  ]
});

const Visitor = models.Visitor || model('Visitor', VisitorSchema);

export default Visitor;