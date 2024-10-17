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
      required: false
    },
    pilotTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
      required: false
    },
    pilotThree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
      required: false
    },
    pilotFour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pilot",
      required: false
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
      required: false
    },
    delay_code_two: {
      type: String,
      required: false
    },
    delay_code_three: {
      type: String,
      required: false
    },
    approach: {
      // type: [
      //   {
      //     id: {
      //       type: Number,
      //     },
      //     category: {
      //       type: String,
      //     },
      //     description: {
      //       type: String,
      //     },
      //   },
      // ],
      type: String,
      required: false
    },
    operation: {
      // type: [
      //   {
      //     id: {
      //       type: Number,
      //     },
      //     category: {
      //       type: String,
      //     },
      //     description: {
      //       type: String,
      //     },
      //   },
      // ],
      type: String,
      required: false
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
    },
    task: {
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
    LDG_day: {
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
    fuel_total: {
      type: String,
    },
    fuel_plan: {
      type: String,
    },
    fuel_used: {
      type: String,
    },
    de_icing: {
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
