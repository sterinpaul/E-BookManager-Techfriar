import { model, Schema } from "mongoose";


const LanguageSchema = new Schema (
    {
        name: {
            type: String,
            unique: true,
            required:true
        }
    }
)

const Languages = model('languages', LanguageSchema);
export default Languages;
