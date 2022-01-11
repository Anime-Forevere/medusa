import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: String,
    email: String,
    avatar: String,
    resources: {
        cpu: Number,
        ram: Number,
        disk: Number,
        slots: Number
    },
    used: {
        cpu: Number,
        ram: Number,
        disk: Number,
        slots: Number
    }
  })
  
  module.exports = mongoose?.models?.User || mongoose.model('User', UserSchema)