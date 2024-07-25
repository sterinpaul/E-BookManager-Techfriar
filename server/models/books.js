import { model, Schema } from "mongoose";


const BookSchema = new Schema (
    {
        name: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        price: {
            type: String,
            required:true
        },
        author: {
            type: String,
            required:true
        },
        language: {
            type: String,
            required:true
        },
        publishedYear: {
            type: String,
            required:true
        },
        coverImage: {
            type: String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

const Books = model('books', BookSchema);
export default Books;

