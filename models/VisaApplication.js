const mongoose = require("mongoose");

const visaApplicationSchema = new mongoose.Schema({
  userId: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
  country: {type:String},
  status: { type: String, enum:['pending','approved','rejected'],
        default:'pending'},
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VisaApplication", visaApplicationSchema);
