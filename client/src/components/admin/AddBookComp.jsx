/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@material-tailwind/react"
import { useState } from "react";
import { addBook } from "../../api/apiConnections/adminConnections";

export const AddBookComp = ({addBookModalHandler,setBooks})=>{
    const [error,setError] = useState("")
    const [coverImage,setCoverImage] = useState("")
    

    const formik = useFormik({
        initialValues: {
          name: "",
          description: "",
          price: "",
          author: "",
          language: "",
          publishedYear: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            price: Yup.string().required("Required"),
            author: Yup.string().required("Required"),
            language: Yup.string().required("Required"),
            publishedYear: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            
            const response = await addBook(values,coverImage);
            if (response?.status) {
                setBooks(prev=>[response.data,...prev])
                addBookModalHandler();
            
          }else{
            setError(response.message)
            setTimeout(()=>{
                setError("")
            },3000)
          }
        },
      });


    return(
        <div className="flex justify-center my-4">
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                size="lg"
                label="Book Name"
                {...formik.getFieldProps("name")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.name &&
                formik.errors.name
                  ? formik.errors.name
                  : null}
              </p>
            </div>
            <div className="mb-4">
              <Input
                type="text"
                size="lg"
                label="Description"
                {...formik.getFieldProps("description")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.description &&
                formik.errors.description
                  ? formik.errors.description
                  : null}
              </p>
            </div>
            <div className="mb-4">
              <Input
                type="number"
                maxLength={7}
                size="lg"
                label="Price"
                {...formik.getFieldProps("price")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.price &&
                formik.errors.price
                  ? formik.errors.price
                  : null}
              </p>
            </div>
            <div className="mb-4">
              <Input
                type="text"
                size="lg"
                label="Author Name"
                {...formik.getFieldProps("author")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.author &&
                formik.errors.author
                  ? formik.errors.author
                  : null}
              </p>
            </div>
            <div className="mb-4">
              <Input
                type="text"
                size="lg"
                label="Language"
                {...formik.getFieldProps("language")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.language &&
                formik.errors.language
                  ? formik.errors.language
                  : null}
              </p>
            </div>
            <div className="mb-4">
              <Input
                type="text"
                size="lg"
                label="Published Year"
                {...formik.getFieldProps("publishedYear")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.publishedYear &&
                formik.errors.publishedYear
                  ? formik.errors.publishedYear
                  : null}
              </p>
            </div>

            {coverImage ? (
                <img className="mx-auto w-20 h-20 object-contain " src={URL.createObjectURL(coverImage)} />
            ) : <><div className="mb-4">
              <Input
                type="file"
                label="Cover Image"
                accept=".jpg,.jpeg,.bmp,.png"
                onChange={(e)=>setCoverImage(e.target.files[0])}
                value={coverImage}
              />
              
            </div></>
            }
            

            {error && <p>{error}</p>}

            <div className="flex gap-4 justify-center">
              <Button
                color="black"
                type="button"
                onClick={addBookModalHandler}
                className="w-28 capitalize py-2 rounded"
              >
                Cancel
              </Button>
              <Button
                color="blue"
                type="submit"
                className="w-28 capitalize py-2 rounded"
              >
                Submit
              </Button>
            </div>
          </form>
          </div>
    )
}