import { model, Schema } from "mongoose";


const AdminSchema = new Schema (
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        verificationCode: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Admin = model('admin', AdminSchema);
export default Admin;

