import vine,{errors} from '@vinejs/vine';
import bookHelpers from '../helpers/bookHelpers.js';

const bookControllers = () => {
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
        getBooks
    }
}

export default bookControllers;