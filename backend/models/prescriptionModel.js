import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({

    appointmentId: {
        type: String,
        required: true
    },

    doctorId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    doctorName: {
    type: String
},

doctorSpeciality: {
    type: String
},

    medicines: [
        {
            name: {
                type: String,
                required: true
            },

            dosage: {
                type: String,
                required: true
            },

            duration: {
                type: String,
                required: true
            }
        }
    ],

    notes: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const prescriptionModel =
    mongoose.models.prescription ||
    mongoose.model("prescription", prescriptionSchema)

export default prescriptionModel