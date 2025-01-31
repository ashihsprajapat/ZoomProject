import mongoose,{model,Schema} from "mongoose";

const meetingSchema=new Schema({
    user_id:{
        type:String,

    },
    meetingCode:{
        type:"Stirng",
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true,
    }
})

const Meeting=model("Meeting",meetingSchema);

export {Meeting};