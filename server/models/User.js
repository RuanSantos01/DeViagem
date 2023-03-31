import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        // DESCREVER O USUÁRIO
    }
)

const User = mongoose.model("User", UserSchema);
export default User;