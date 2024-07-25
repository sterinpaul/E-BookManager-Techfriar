import { useEffect, useState } from "react"
import { getAllBooks } from "../api/apiConnections/bookConnections"
import { NavBarComp } from "./admin/NavBarComp"
import { Card } from "@material-tailwind/react"


const Home = ()=>{
    const [books,setBooks] = useState([])
    
    const getAllBooksFromDB = async()=>{
        const response = await getAllBooks()
        if(response?.status){
            setBooks(response.data)
        }
    }

    useEffect(()=>{
        getAllBooksFromDB()
    },[])
    
    return (
        <div>
            <NavBarComp admin={false} />
            <div className="mt-20 flex justify-center gap-4 items-center">
    
                    {books.length ? books.map((book)=>{
                        return(
                            <Card key={book._id} className="w-52 shadow-xl p-2 border hover:shadow-2xl">
                                <p className="text-center capitalize text-black">{book.name}</p>
                                <div className="overflow-hidden h-52">
                                    <img className="hover:scale-110 duration-300 w-full h-full object-cover" src={book.coverImage} alt="Cover Image" />
                                </div>
                                <div className="h-24 overflow-y-scroll border">
                                    <p className="text-sm p-1 m-1">{book.description}</p>
                                </div>
                                <p className="text-center capitalize">{book.author}</p>
                                <p className="text-center text-blue-700">{book.price}</p>
                                <p className="text-center capitalize">{book.language}</p>
                                <p className="text-center">{book.publishedYear}</p>
                            </Card>
                        )
                    }) : null}
                
            </div>
        </div>
    )
}

export default Home
