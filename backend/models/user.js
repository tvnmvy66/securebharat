import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  sub: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },

  name: { type: String },
  givenName: { type: String },
  familyName: { type: String },
  picture: { type: String },
  role: {type: String , default: "user"},
  iss: { type: String },     // issuer
  azp: { type: String },     // authorized party
  aud: { type: String },     // audience
  jti: { type: String },     // JWT ID
  nbf: { type: Number },     // not before (timestamp)
  iat: { type: Number },     // issued at (timestamp)
  exp: { type: Number },     // expiry (timestamp)
  shippingAddress: {
    address: { type: String, maxlength: 200 },
    city: { type: String, maxlength: 100 },
    postalCode: { type: String, maxlength: 6 },
    country: { type: String, maxlength: 100 },
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
