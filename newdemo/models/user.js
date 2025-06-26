const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const dataSchemaObj = {
  username: { type: String, required: true, unique: true },
  password: { type: String },
  oauthId: { type: String }, // Unique GitHub ID for OAuth users
  oauthProvider: { type: String }, // Indicates OAuth provider, e.g., "GitHub"
  created: { type: Date },
};

const userSchema = new mongoose.Schema(dataSchemaObj);

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
