import {useState} from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {

const [loading , setLoading] = useState(false);
const {authUser, setAuthUser} = useAuthContext();
const signup = async ({ fullname, username, password, confirmPassword, gender}) =>  {
    const fieldChecker = checker({ fullname, username, password, confirmPassword, gender});
    
    if(!fieldChecker) {return}
    setLoading(true);
    try{
    const res = await fetch("/api/auth/signup" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullname, username, password, confirmPassword, gender
        }),
        

    });
    const data = await res.json();
    if(data.error){
        throw new Error(data.error)
    }
    localStorage.setItem("chat-user", JSON.stringify(data));
    setAuthUser(data);
    toast("signed up");

} 
     catch(error){toast.error(error.message);}
     finally{setLoading(false);}
}

    return {loading, signup};
}

export default useSignup;

function checker({ fullname, username, password, confirmPassword, gender}) {
    

    if(!fullname || !username || !password || !confirmPassword ||!gender) {
        toast.error("fill in all the fields");
        return false;
    }
    if(password !== confirmPassword) {
        toast.error("password and confirmpassword do not match");
        return false;
    }
    return true;
}