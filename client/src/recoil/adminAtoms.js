import { atom } from "recoil";

const getToken = ()=>{
    const token = localStorage.getItem('token')
    if(token) return token
    else
    return ""
}

export const adminTokenAtom = atom({
    key:"adminTokenAtom",
    default:getToken()
})

