/* eslint-disable react/prop-types */

export const SingleBook = ({book,number})=>{
    return(
        <tr>
            <td className="border border-gray-400 text-center capitalize">{number}</td>
            <td className="border border-gray-400 text-center capitalize">{book.name}</td>
            <td className="border border-gray-400 text-center">{book.description}</td>
            <td className="border border-gray-400 text-center capitalize">{book.price}</td>
            <td className="border border-gray-400 text-center capitalize">{book.author}</td>
            <td className="border border-gray-400 text-center capitalize">{book.language}</td>
            <td className="border border-gray-400 text-center capitalize">{book.publishedYear}</td>
            <td className="border border-gray-400 text-center"><img className="object-cover w-full h-full" src={book.coverImage} alt="Book Cover" /></td>
            <td className="p-2 border border-gray-400 text-center"><p className='bg-gray-400 hover:bg-gray-500 cursor-pointer px-5 py-1 rounded-sm w-fit text-white'>Edit</p></td>
        </tr>
    )
}