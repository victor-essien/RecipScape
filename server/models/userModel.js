import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is Required"]

        },
        lastName: {
            type: String,
            required: [true, "Last Name is Required"]
        },

        userName: {
            type: String,
        },

    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
      
        minlength: [5, "Password length should be greater than 5 character"],
        select: true,
        
    },
    location: {type: String},
    profileUrl: {type: String},
    profession: {type: String},
    bookmark: [{type: String}],
    followers: [{ type: Schema.Types.ObjectId, ref:"Users"}],
    following: [{ type: Schema.Types.ObjectId, ref: "Users"}]
    },
    {timestamps: true}
) 
 
// Mongoose pre-save middleware
userSchema.pre('save', async function (next) {
    if (!this.userName) { // Only set if the userName is not provided
        this.userName = this.email.slice(0, this.email.indexOf('@')); // Slice the email before the '@' symbol
    }
    next();
});

const  Users = mongoose.model("Users", userSchema)

export default Users;