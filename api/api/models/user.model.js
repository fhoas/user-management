import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["standart", "admin"],
      default: "standart",
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }  }
);
userSchema.virtual('listings', {
  ref: 'Listing',
  localField: '_id',
  foreignField: 'user',
});
const User = mongoose.model("User", userSchema)

export default User