import Books from "../models/books.js";


const bookHelpers = {
    getAllBooks:async()=>{
        return await Books.find({},{__v:0}).sort({createdAt:-1})
    },
    addBook:async(bookData)=>{
        const newBook = new Books(bookData)
        return await newBook.save()
    },
}

export default bookHelpers;