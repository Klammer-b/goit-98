import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    userId: { type: Schema.ObjectId, required: true, unique: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('sessions', sessionSchema);
