/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton
} from "@material-tailwind/react";
import { useSetRecoilState } from "recoil";
import { adminTokenAtom } from "../../recoil/adminAtoms";
import { signOut } from "../../api/apiConnections/authConnections";


export const NavBarComp = ({admin})=> {
    const [openNav, setOpenNav] = useState(false);
    const setToken = useSetRecoilState(adminTokenAtom)
    const navigate = useNavigate()
    
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    
    const userLogOut = async()=>{
        await signOut()
        setToken("")
        localStorage.removeItem("token")
        navigate('/admin')
    }


    return (
        <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-blue-gray-600 border-none">
            <div className="flex items-center justify-between text-white">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-bold text-lg"
                >
                    E-Book {admin && "Dashboard"}
                </Typography>
                <div className="flex items-center gap-4">
                    
                    {admin && <Button
                        variant="outlined"
                        size="sm"
                        color="white"
                        className="hidden lg:inline-block"
                        onClick={userLogOut}
                    >
                        <span>Sign out</span>
                    </Button>}
                    {admin && <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>}
                </div>
            </div>

            <Collapse open={openNav}>
            {admin && <Button variant="outlined" fullWidth onClick={userLogOut} size="sm" color="white">
                    <span>Sign out</span>
                </Button>}
            </Collapse>
        </Navbar>
    );
}