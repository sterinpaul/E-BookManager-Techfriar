import adminAuthHelpers from "../helpers/adminAuthHelpers.js";
import authService from "./authService.js"

export const seedAdmin = async()=>{
    try {
        const adminExists = await adminAuthHelpers.getAdminByEmail("sterinpaul@gmail.com")
        if(adminExists){
            console.log("Admin already exists");
        }else{
            const hashedPassword = await authService.encryptPassword("Admin@123")

            const signupResponse = await adminAuthHelpers.signUpAdmin("sterinpaul@gmail.com",hashedPassword)
            if(signupResponse){
                console.log("Admin seeded");
            }
        }
    } catch (error) {
        console.error(`Error seeding admin: ${error}`);
    }
}