import { toast } from 'react-toastify';
import baseURL from '../baseURL'


export const getAllBooks = async() => {
    try{
        const response = await baseURL.get(`/admin/getBooks`);
        if (response) {
            return response.data;
        }
    }catch(error){
        console.error(`Error fetching books: ${error.message}`);
        toast.error("Error fetching books")
    }
}

export const addBook = async(bookData,coverImage) => {
    try{
        const form = new FormData()
        form.append("name",bookData.name)
        form.append("description",bookData.description)
        form.append("price",bookData.price)
        form.append("author",bookData.author)
        form.append("language",bookData.language)
        form.append("publishedYear",bookData.publishedYear)
        form.append("coverImage",coverImage)
        
        const response = await baseURL.post(`/admin/addBook`,form,{
            headers:{'Content-Type' : 'multipart/form-data'}
        });

        if (response) {
            return response.data;
        }
    }catch(error){
        console.error(`Error adding book: ${error.message}`);
        toast.error("Error adding book")
    }
}
