import Tokens from "../models/tokens.js";


const tokenHelpers = {
    getToken:async(userId)=>{
        return await Tokens.findOne({userId},{_id:0,userId:1})
    },
    deleteToken:async(userId)=>{
        return await Tokens.deleteOne({userId})
    },
    // Do not remove {upsert:true,new:true} from addToken query
    addToken:async(userId,token)=>{
        return await Tokens.findOneAndUpdate({userId},{$set:{token}},{upsert:true,new:true})
    }
}

export default tokenHelpers;