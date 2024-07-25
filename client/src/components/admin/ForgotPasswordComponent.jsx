/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  DialogBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  forgotPassword,
  updatePassword,
  verifyCode,
} from "../../api/apiConnections/authConnections";
import { useState } from "react";
// import { toast } from "react-toastify";

export const ForgotPasswordComponent = ({ forgotPasswordModalHandler }) => {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [openPasswordUpdation, setOpenPasswordUpdation] = useState(false);
  const [error,setError] = useState("")
  const [code, setCode] = useState("");

  const codeVerification = async () => {
    const response = await verifyCode(forgotFormik.values.email, code);
    if (response?.status) {
        setOpenPasswordUpdation(true);
    }else{
        setError(response.message)
        setTimeout(()=>{
            setError("")
        },3000)
    }
  };

  const forgotFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      
        const response = await forgotPassword(values);
        if (response?.status) {
          setIsVerificationCodeSent((previous) => !previous);
        
      }else{
        setError(response.message)
        setTimeout(()=>{
            setError("")
        },3000)
      }
    },
  });

  const newPasswordFormik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Need one uppercase, one lowercase, one number, and one special character."
        )
        .min(6, "Must be 6 characters or more")
        .max(12, "Must be less than 13 characters")
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Password does not match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      
      // eslint-disable-next-line no-unused-vars
      const { password, rePassword } = values;
      const response = await updatePassword(
        forgotFormik.values.email,
        password
      );

      if (response?.status) {
        forgotPasswordModalHandler();
      }else{
        setError(response.message)
        setTimeout(()=>{
            setError("")
        },3000)
      }
    },
  });

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Typography variant="h4" className="mt-4 px-8 text-center">
        Forgot Password
      </Typography>
      <DialogBody>
        {openPasswordUpdation ? (
          <form onSubmit={newPasswordFormik.handleSubmit}>
            <div className="mb-4">
              <Input
                type="password"
                id="password"
                size="lg"
                label="New Password"
                {...newPasswordFormik.getFieldProps("password")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {newPasswordFormik.touched.password &&
                newPasswordFormik.errors.password
                  ? newPasswordFormik.errors.password
                  : null}
              </p>
            </div>
            <div className="mb-4">
              <Input
                type="password"
                id="rePassword"
                size="lg"
                label="Re-type Password"
                {...newPasswordFormik.getFieldProps("rePassword")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {newPasswordFormik.touched.rePassword &&
                newPasswordFormik.errors.rePassword
                  ? newPasswordFormik.errors.rePassword
                  : null}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button
                color="black"
                type="button"
                onClick={forgotPasswordModalHandler}
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
        ) : isVerificationCodeSent ? (
          <div>
            <div>
              <Input
                type="text"
                id="code"
                size="lg"
                label="Verification Code"
                defaultValue={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {error && <p>{error}</p>}

            <div className="flex gap-4 mt-8">
              <Button
                color="black"
                type="button"
                onClick={forgotPasswordModalHandler}
                className="w-28 capitalize py-2 rounded"
              >
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={codeVerification}
                className="w-28 capitalize py-2 rounded"
              >
                Verify
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={forgotFormik.handleSubmit}
            className="my-2 flex flex-col gap-4"
          >
            <div className="">
              <Input
                type="email"
                id="email"
                size="lg"
                label="E-mail"
                {...forgotFormik.getFieldProps("email")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {forgotFormik.touched.email && forgotFormik.errors.email
                  ? forgotFormik.errors.email
                  : null}
              </p>
            </div>

            {error && <p>{error}</p>}

            <div className="flex gap-4">
              <Button
                color="black"
                type="button"
                onClick={forgotPasswordModalHandler}
                className="w-28 capitalize py-2 rounded"
              >
                Cancel
              </Button>
              <Button
                color="blue"
                type="submit"
                className="w-28 capitalize py-2 rounded"
              >
                Send Code
              </Button>
            </div>
          </form>
        )}
      </DialogBody>
    </div>
  );
};
