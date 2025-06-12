const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId:{
        type: String,
        required : true,
        unique : true
    }
    ,
    employeeName:{
        type: String,
        required : true,
    },

    designation:{
        type:String,
        required: true,
        
    },

    joiningDate:{
        type:String,
        required:true,
    },

    dateOfBirth:{
        type:String,
        required:true,
    },
    salary:{
        type:number,
        required:true
    },
    activeEmployee:{
        type:Boolean,
        required:true
    },
    phoneNumber:{
        type:number,
        required:true
    },

    address:{
        tyepe:String,
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }

}) 

const Employee = mongoose.model("Employee",employeeSchema);
module.export = Employee;