import baseURL from '../baseURL'


export const signIn = async(credentials) => {
    try{
        const response = await baseURL.post(`/adminAuth/signin`,credentials);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing in ${error.message}`);
    }
}

export const signOut = async()=>{
    try{
        const response = await baseURL.delete(`/adminAuth/signout`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing out: ${error.message}`);
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await baseURL.patch(`/adminAuth/forgotPassword`, email);
        return response.data;
    } catch (error) {
        console.error(`Error sending verification code: ${error.message}`);
    }
}

export const verifyCode = async (email,verificationCode) => {
    try {
        const response = await baseURL.patch(`/adminAuth/verifyCode`, { email,verificationCode });
        return response.data;
    } catch (error) {
        console.error(`Error verifying code: ${error.message}`);
    }
}

export const updatePassword = async (email,password) => {
    try {
        const response = await baseURL.patch(`/adminAuth/updatePassword`, { email,password });
        return response.data;
    } catch (error) {
        console.error(`Error updating password: ${error.message}`);
    }
}

