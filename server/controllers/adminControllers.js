import bookHelpers from "../helpers/bookHelpers.js"
import vine,{errors} from '@vinejs/vine'


const adminControllers = () => {
    const addBook = async (req, res) => {
        
        const bookSchema = vine.object({
            name:vine.string().minLength(3).maxLength(50),
            description:vine.string().minLength(3).maxLength(250),
            price:vine.string(),
            author:vine.string().minLength(3).maxLength(50),
            language:vine.string().minLength(3).maxLength(50),
            publishedYear:vine.string().fixedLength(4)
        })
        
        try {
            const validator = vine.compile(bookSchema)
            const output = await validator.validate(req.body)
                
            output.name = output.name.toLowerCase()
            output.author = output.author.toLowerCase()
            output.language = output.language.toLowerCase()
            output.coverImage = req.file.path
            
            const saveResponse = await bookHelpers.addBook(output)

            if (saveResponse) {
                return res.status(200).json({ status: true, message: "Book saved",data: saveResponse})
            }
            return res.status(400).json({ status: false, message: "Book could not be saved" })
        } catch (error) {
            if(error instanceof errors.E_VALIDATION_ERROR){
                return res.status(500).json({status:false,message:error.messages})
            }
            return res.status(500).json({ status: false, message: "Internal error" })
        }
    }

    

    const getBooks = async(req,res)=>{
        try {
            const allOrders = await bookHelpers.getAllBooks()
            if(allOrders.length){
                return res.status(200).json({ status:true,data:allOrders })
            }
            return res.status(200).json({ status:false,message:"No books found"})
        } catch (error) {
            console.error("Error fetching books",error);
            return res.status(500).json({status:false,message:"internal error"})
        }
    }


    return {
        addBook,
        getBooks,
    }
}

export default adminControllers;