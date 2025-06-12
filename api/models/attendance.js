const mongoose = require("mongoose");

const attendaceSchema = mongoonse.Schema({
    employeeId:{
        type:String,
        required:true
    },
    employeeName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:Strinng,
        required:true

    }

})

const Attendace = mongoose.model("Attendance", attendaceSchema);
module.export = Attendace