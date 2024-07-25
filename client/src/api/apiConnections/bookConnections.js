import { toast } from 'react-toastify';
import baseURL from '../baseURL'


export const getAllBooks = async() => {
    try{
        const response = await baseURL.get(`/book/getBooks`);
        if (response) {
            return response.data;
        }
    }catch(error){
        console.error(`Error fetching books: ${error.message}`);
        toast.error("Error fetching books")
    }
}
