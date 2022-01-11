import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
        unique: true,
    },
    id: Number,
    created: Number
  })
  
  module.exports = mongoose?.models?.Session || mongoose.model('Session', SessionSchema)