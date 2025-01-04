import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
    {
      participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true,
        validate: [arrayLimit, "{PATH} must contain exactly 2 participants"],
      },
      messages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
        },
      ],
    },
    { timestamps: true }
  );
  
  function arrayLimit(val) {
    return val.length === 2;
  }
  
  const Conversation = mongoose.model("Conversation", conversationSchema);
  
  export default Conversation;
  