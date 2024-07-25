import Admin from "../models/admin.js";
import Token from "../models/tokens.js";


const adminAuthHelpers = {
    signUpAdmin:async(email,password)=>{
        const newAdmin = new Admin({
            email,
            password
        })
        return await newAdmin.save()
    },
    getAdminByEmail:async(email)=>{
        return await Admin.findOne({email},{__v:0,name:0})
    },
    addVerificationCode:async(email,verificationCode)=>{
        return await Admin.updateOne({email},{$set:{verificationCode}})
    },
    verifyCode:async(email,verificationCode)=>{
        return await Admin.findOne({email,verificationCode},{_id:1})
    },
    removeCode:async(email)=>{
        return await Admin.updateOne({email},{$unset:{verificationCode:""}})
    },
    updateAdminPassword:async(email,password)=>{
        return await Admin.updateOne({email},{$set:{password}})
    },
    // Do not remove {upsert:true,new:true} from addToken query
    addToken:async(userId,token)=>{
        return await Token.findOneAndUpdate({userId},{$set:{token}},{upsert:true,new:true})
    }
}

export default adminAuthHelpers;