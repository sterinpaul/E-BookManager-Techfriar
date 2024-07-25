import { model, Schema } from "mongoose";


const AuthorSchema = new Schema (
    {
        name: {
            type: String,
            unique: true,
            required:true
        }
    }
)

const Authors = model('authors', AuthorSchema);
export default Authors;

