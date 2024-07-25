import adminAuthHelpers from '../helpers/adminAuthHelpers.js';
import authService from '../utils/authService.js';
import configKeys from '../config/configKeys.js';
import tokenHelpers from '../helpers/tokenHelpers.js';
import nodemailer from 'nodemailer'
import ShortUniqueId from 'short-unique-id';

        
const authAdminControllers = () => {

    const signIn = async (req, res) => {
        const { email, password } = req.body
        const lowerCaseEmail = email.toLowerCase()

        const adminExists = await adminAuthHelpers.getAdminByEmail(lowerCaseEmail)
        if (!adminExists) {
            return res.status(400).json({ status: false, message: "Unauthorized access" })
        }

        const checkPassword = await authService.comparePassword(password, adminExists.password)
        if (!checkPassword) {
            return res.status(400).json({ status: false, message: "Password is wrong" })
        }

        const payload = {
            id: adminExists._id
        }

        const accessToken = authService.generateToken(payload, configKeys.JWT_ACCESS_SECRET_KEY)
        const refreshToken = authService.generateToken(payload, configKeys.JWT_REFRESH_SECRET_KEY)

        try {
            if (refreshToken) {
                const refreshTokenToDb = await tokenHelpers.addToken(adminExists._id, refreshToken)
                
                if (refreshTokenToDb) {
                    return res.status(200).json({ status: true, message: "Signin success",token: accessToken })
                }else{
                    return res.status(400).json({status: false, message:"Error creating session"})
                }
            }
        } catch (error) {
            return res.status(500).json({status:false, message:"Error creating session"})
        }
    }
    const forgotPassword = async (req, res) => {
        const { email } = req.body
        const lowerCaseEmail = email.toLowerCase()
        
        try {
            const adminExists = await adminAuthHelpers.getAdminByEmail(lowerCaseEmail)
            if (!adminExists) {
                return res.status(400).json({ status: false, message: "Email does not exists" })
            }
            const { randomUUID } = new ShortUniqueId({ length: 6 });
            const verificationCode = randomUUID()

            const addCodeToAdmin = await adminAuthHelpers.addVerificationCode(lowerCaseEmail,verificationCode)

            if(addCodeToAdmin.modifiedCount){
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: configKeys.NODE_MAILER_EMAIL,
                        pass: configKeys.NODE_MAILER_PASSWORD
                    },
                });
    
                
                async function main() {
                    const info = await transporter.sendMail({
                        from: ' Techfriar <sterinalternate@gmail.com>',
                        to: lowerCaseEmail,
                        subject: `Techfriar Verification code`,
                        text: "Please verify your email with following code",
                        html: `<b>${verificationCode}</b>`
                    });
    
                    console.log("Message sent: %s", info.messageId);
                }
                main().catch(console.error);
                res.status(200).json({ status: true })
            }

        } catch (error) {
            return res.status(500).json({status:false, message:"Error sending verification code"})
        }
    }

    const verifyCode = async(req,res)=>{
        try {
            const {email,verificationCode} = req.body
            const lowerCaseEmail = email.toLowerCase()
            const codeResponse = await adminAuthHelpers.verifyCode(lowerCaseEmail,verificationCode)
            if(!codeResponse){
                return res.status(400).json({status:false, message:"Wrong code"})
            }else{
                await adminAuthHelpers.removeCode(lowerCaseEmail)
            }
            return res.status(200).json({status:true, message:"Enter new password"})
        } catch (error) {
            return res.status(500).json({status:false, message:"Internal server error"})
        }
    }

    const updatePassword = async(req,res)=>{
        try {
            const {email,password} = req.body
            const lowerCaseEmail = email.toLowerCase()
            const hashedPassword = await authService.encryptPassword(password)
            const updateResponse = await adminAuthHelpers.updateAdminPassword(lowerCaseEmail,hashedPassword)
            if(updateResponse.modifiedCount){
                return res.status(200).json({status:true, message:"Password updated. Please Login"})
            }
            return res.status(400).json({status:false, message:"Error updating password"})
        } catch (error) {
            return res.status(500).json({status:false, message:"Internal server error"})
        }
    }


    const signOut = async (req, res) => {
        const { id } = req.payload
        const deleteToken = await tokenHelpers.deleteToken(id)
        if (deleteToken) {
            return res.status(200).json({ status: true, message: "Signout Successful" })
        }
    }


    return {
        signIn,
        forgotPassword,
        verifyCode,
        updatePassword,
        signOut
    }
}

export default authAdminControllers;