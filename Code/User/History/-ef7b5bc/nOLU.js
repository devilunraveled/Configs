import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        reportedBy : Number, //UserId
        reportedUser : Number,
        reportedText : String,
        description : String,
    },
    { timestamps : true}
)

const Report = mongoose.model("Report", reportSchema);

export default Report;