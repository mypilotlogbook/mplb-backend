const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema(
  {
    //flight time and location
    date: {
      type: Date,
      required: true,
    },
    aircraft: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aircraft",
      required: true,
    },
    flight_nr: {
      type: String,
    },
    departure: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airfield",
      required: true,
    },
    arrival: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airfield",
      required: true,
    },
    std: {
      type: String,
    },
    out_time: {
      type: String,
    },
    takeoff: {
      type: String,
    },
    landing: {
      type: String,
    },
    in_time: {
      type: String,
    },
    sta: {
      type: String,
    },
    total_time: {
      type: String,
    },
    air: {
      type: String,
    },

    //flight crew details
    pilotOne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
    },
    pilotTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
    },
    pilotThree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
    },
    pilotFour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
    },
    crew_list: {
      type: String,
    },
    flight_log: {
      type: String,
    },
    remarks: {
      type: String,
    },
    training: {
      type: String,
    },
    delay_code_one: {
      type: String,
    },
    delay_code_two: {
      type: String,
    },
    delay_code_three: {
      type: String,
    },
    approach: {
      type: [
        {
          id: {
            type: Number,
          },
          category: {
            type: String,
          },
          description: {
            type: String,
          },
        },
      ],
    },
    operation: {
      type: [
        {
          id: {
            type: Number,
          },
          category: {
            type: String,
          },
          description: {
            type: String,
          },
        },
      ],
    },
    sign: {
      type: String,
    },

    pic: {
      type: String,
    },
    pic_us: {
      type: String,
    },
    sic: {
      type: String,
    },
    dual: {
      type: String,
    },
    instructor: {
      type: String,
    },
    examinar: {
      type: String,
    },
    relief: {
      type: String,
      enum: ["PF", "PM"],
      required: false,
    },
    TO_day: {
      type: String,
    },
    TO_night: {
      type: String,
    },
    LDG_night: {
      type: String,
    },
    LDG_night: {
      type: String,
    },
    lifts: {
      type: String,
    },
    holding: {
      type: String,
    },
    night: {
      type: String,
    },
    ifr: {
      type: String,
    },
    act_instr: {
      type: String,
    },
    sim_instr: {
      type: String,
    },
    xc: {
      type: String,
    },
    pax: {
      type: String,
    },
    de_icing: {
      type: Boolean,
      default: false,
    },
    fuel_total: {
      type: Boolean,
      default: false,
    },
    fuel_plan: {
      type: Boolean,
      default: false,
    },
    fuel_used: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
