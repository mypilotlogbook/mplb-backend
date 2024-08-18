const mongoose = require('mongoose');

const AircraftSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Aircraft', 'Simulator', 'Drone', 'Previous Acft Time', 'Previous Sim Time'], 
    },
    image: {
        type: String,
        default: 'https://plus.unsplash.com/premium_photo-1678727128546-154b1725c336?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    company: {
        type: String,
    },
    fin: {
        type: String,
    },
    registration_no: {
        type: String,
    },
    model: {
        type: String,
    },
    variant: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    type_rating: {
        type: String,
    },
    passenger: {
        type: String,
    },
    aircraft_class: {
        type: String,
        enum: ['Microlight', 'Glider', 'Lighter-than-Air', 'Rotorcraft', 'Aeroplane'], 
    },
    sub_class: {
        type: String,
        enum: ['Land', 'Sea'], 
    },
    category: {
        type: String,
        enum: ['Single Pilot', 'Multi Pilot'], 
    },
    power: {
        type: String,
        enum: ['Unpowered', 'SE - Piston', 'SE - Turbine (props-shaft)', 'SE - Turbine (jet-fan)', 'ME - Piston', 'ME - Turbine (props-shaft)', 'ME - Turbine (jet-fan)'], 
    },
    device: {
        type: String,
        enum: ['FFS', 'FNPT-l', 'FNPT-ll', 'FNPT-lll', 'FTD-4', 'FTD-5', 'FTD-6', 'FTD-7', 'FBS', 'CBT', 'CPT', 'ADT', 'AADT', 'BADT', 'PCADT', 'FFS-A', 'FFS-B', 'FFS-C', 'FFS-D', 'FTD-1', 'FTD-2', 'FTD-3', 'IFF'], 
    },
    aerobatic: {
        type: Boolean,
        default: false
    },
    complex: {
        type: Boolean,
        default: false
    },
    tm_glider: {
        type: Boolean,
        default: false
    },
    tailwheel: {
        type: Boolean,
        default: false
    },
    high_performance: {
        type: Boolean,
        default: false
    },
    efis: {
        type: Boolean,
        default: false
    },
    more_than_weight: {
        type: Boolean,
        default: false
    },
    cross_country: {
        type: Boolean,
        default: false
    },
    relief_pilot: {
        type: Boolean,
        default: false
    },
    ifr: {
        type: Boolean,
        default: false
    },
    actual_instrument: {
        type: Boolean,
        default: false
    },
    sim_instrument: {
        type: Boolean,
        default: false
    },
    default_operation: {
        type: String,
        enum: ['ACRO', 'AEMS', 'AMBU', 'AT', 'ATFM', 'ATFMX', 'ATPL', 'BFR', 'CAR406', 'CAR604', 'CAR701', 'CAR702', 'CAR703', 'CAR704', 'CAR705', 'CARGO', 'CBT', 'CDR', 'CDR-FM', 'CHECK', 'CHECK/MY', 'CPL', 'CROP', 'DH', 'DROP', 'ETOPS', 'FAR107', 'FAR117', 'FAR121', 'FAR129', 'FAR133', 'FAR135', 'FAR141', 'FAR380', 'FAR61', 'FAR63', 'FAR91', 'FERRY', 'FORM', 'HEMS', 'HESLO', 'HOIST', 'IFF', 'INSP', 'LOQE', 'LOSA', 'LOW', 'LVP', 'MAINT', 'MCC', 'MEDEVAC', 'MIL', 'MOUNT', 'NAVY', 'NVIS', 'OBS', 'OFFSH', 'P2X', 'PHOTO', 'POLAR', 'POLAV', 'PPL', 'PRIV', 'READ', 'RHS', 'SAFETY', 'SAR', 'SFO', 'SNY', 'SOLO', 'SPIC', 'TOW', 'TRNG', 'WINCH', 'ZERO-G'], 
    },
    default_launch: {
        type: String,
        enum: ['Aerotow', 'Bungee', 'Car Tow', 'Self Launch', 'Winch',], 
    },
    auto_load_hours: {
        type: String,
        enum: ['PIC', 'Co-Pilot', 'Dual', 'Instructor', 'PICus', 'Examiner', 'PICus when PF'], 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Aircraft', AircraftSchema);