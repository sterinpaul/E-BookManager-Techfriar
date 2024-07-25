import { useEffect, useState } from "react";

import { SingleBook } from "./SingleBook";
import { getAllBooks } from "../../api/apiConnections/adminConnections";
import {NavBarComp} from "./NavBarComp";
import { Button, Dialog } from "@material-tailwind/react";
import { AddBookComp } from "../../components/admin/AddBookComp";

const Dashboard = () => {
    const [books,setBooks] = useState([])
    const [openAddBookModal,setOpenAddBookModal] = useState(false)

    const addBookModalHandler = ()=>setOpenAddBookModal(prev=>!prev)

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
      <NavBarComp admin={true} />
      <div className="mt-10 py-10">
        <div className="text-center">
          <Button onClick={addBookModalHandler} color="blue" className=" py-2 my-2">Add Book</Button>
        </div>
      <div className="p-4 m-2 overflow-x-scroll grid place-items-center">
        <table className="auto">
          <thead className="bg-gray-200">
            <tr>
              <th>Sl.No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Author</th>
              <th>Language</th>
              <th className="text-nowrap">Published Year</th>
              <th className="text-nowrap">Cover Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((single, index) => {
              return (
                <SingleBook key={single._id} book={single} number={index+1} />
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
      <Dialog open={openAddBookModal} handler={addBookModalHandler} size="sm">
        <AddBookComp addBookModalHandler={addBookModalHandler} setBooks={setBooks} />
      </Dialog>
    </div>
  );
};

export default Dashboard;
