import { Schema, model } from "mongoose";
import { Event } from "../../types/Event";

const EventSchema: Schema = new Schema({
  _organizer: {type: Schema.Types.ObjectId, ref: 'Event'},
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now()},
  img: { type: Buffer, required: false },
});

model<Event>("events", EventSchema);
