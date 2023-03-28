import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        reportedBy : {
            type : String, //UserId
            required : true,
        },
        reportedUser : Number,
        reportedText : String,
        description : String,
    },
    { timestamps : true}
);

const Report = mongoose.model("Report", reportSchema);

export default Report;