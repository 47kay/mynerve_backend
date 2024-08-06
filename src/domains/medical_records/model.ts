import mongoose from "mongoose";
const RecordsSchema = new mongoose.Schema({
  clinic: [
    {
      diagnosis: String,
      investigation: String,
      specimen: String,
      collectionDate: String,
      notes: String,
      resultFile: String,
    },
  ],
  drugs: [
    {
      name: String,
      genericName: String,
      dose: String,
      frequency: String,
      notes: String,
      frequencyType: String,
      duration: String,
      numberOfRfil: String,
    },
  ],
  // consultationNote: { type: String,  },
  // ICD10Code: { type: String,  },
  // labRequest: { type: String,  },
  // labResult: { type: String,  },
  // drugs: { type: String,  },
  // procedureName: { type: String,  },
  // procedureNotes: { type: String,  },
  // procedureImage: { type: String,  },
  // radiologyRequest: { type: String,  },
  // radiologyResultImage: { type: String,  },
  // radiologyNote: { type: String,  },
  // scanRequested: { type: String,  },
  // scanResult: { type: String,  },
  // scanNote: { type: String,  },
  // scanImage: { type: String,  },
  isPaid: { type: Boolean, default: false },
  folderNumber: { type: String, default: "" },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  healthcareId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HospitalFacility",
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
  },
  dateCreated: { type: Date, default: Date.now() },
});

const Records = mongoose.model("Records", RecordsSchema);
export default Records;
