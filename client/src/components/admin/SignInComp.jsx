import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import {
  CardHeader,
  CardBody,
  Input,
  Button,
  Card,
  Typography,
  Dialog,
} from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import { adminTokenAtom } from "../../recoil/adminAtoms";
import { signIn } from "../../api/apiConnections/authConnections";
import { useState } from "react";
import { ForgotPasswordComponent } from "./ForgotPasswordComponent";


export const SignInComp = () => {
  const setToken = useSetRecoilState(adminTokenAtom)
  const [openForgotPasswordModal,setOpenForgotPasswordModal] = useState(false)
  const [error,setError] = useState("")
  const navigate = useNavigate();

  const forgotPasswordModalHandler = ()=>setOpenForgotPasswordModal(previous=>!previous)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Need one uppercase, one lowercase, one number, and one special character."
        )
        .min(6, "Must be 6 characters or more")
        .max(12, "Must be less than 13 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await signIn(values);
      if (response?.status) {
        setToken(response.token);
        localStorage.setItem("token", response.token);
        navigate("/admin");
      } else {
        setError(response.message)
        setTimeout(()=>{
            setError("")
        },3000)
      }
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-96 shadow-2xl">
        <form onSubmit={formik.handleSubmit}>
        <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 h-28 flex justify-center items-center text-center px-2"
      >
        <Typography variant="h3" color="white" className="font-kaushan">
          Sign-In
        </Typography>

      </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <div className="mb-4">
              <Input
                type="email"
                id="email"
                size="lg"
                label="E-mail"
                {...formik.getFieldProps("email")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </p>
            </div>
            <Input
              type="password"
              label="Password"
              size="lg"
              id="password"
              {...formik.getFieldProps("password")}
            />
            <p className="h-4 ml-2 text-sm text-red-800">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </p>

            {error && <p>{error}</p>}

            <p onClick={forgotPasswordModalHandler} className="mt-4 text-center cursor-pointer hover:text-blue-600">Forgot Password</p>
            <Button type="submit" className="mt-2" color="blue" variant="gradient" fullWidth>
              Submit
            </Button>
          </CardBody>
        </form>
      </Card>
      <Dialog 
        dismiss={{ escapeKey: false, outsidePress: false }}
        open={openForgotPasswordModal}
        handler={forgotPasswordModalHandler}
        size="xs"
        className="outline-none"
      >
        <ForgotPasswordComponent forgotPasswordModalHandler={forgotPasswordModalHandler}/>
      </Dialog>
    </div>
  );
};
