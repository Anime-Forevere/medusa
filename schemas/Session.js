import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
        unique: true,
    },
    id: Number,
    created: Number
  })
  
  module.exports = mongoose.models.User || mongoose.model('User', UserSchema)