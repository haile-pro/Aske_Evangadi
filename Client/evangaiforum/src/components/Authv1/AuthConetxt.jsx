import { createContext,useEffect,useReducer } from "react";
import {useNavigate} from 'react-router-dom'
import cookie from "js-cookie"
import { axiosInstance,endPoint } from "../../endPoint/api";
import { toast } from "react-toastify";


const initialState={
    isAuthenticated:false,
    user:null,
    isLoding:true,
}
const reducer=(state,action)=>{
   switch(action.type){
       case "SET_USER":
           return{
               ...state,
               isAuthenticated:true,
               user:action.payload,
               isLoding:false,
           
       };
       case "LOGOUT":
        return{
            ...state,
            isAuthenticated:false,
            user:null,
            isLoding:false,
        }
        default:
            return state;
   } 
}
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const navigate=useNavigate();
    const [state,dispatch]=useReducer(reducer,initialState)
    useEffect(()=>{
        const checkAuthentication=async()=>{
            const token=cookie.get("accessToken")
            if(token){
                
                try {
                   const respons =await axiosInstance.get(endPoint.ME,{
                    headers:{
                        authorization:`Bearer ${token}`
                 }})
                 console.log(respons.data)

                 if(respons.status===200){
                    dispatch({
                        type:"SET_USER",
                        payload:respons.data?.user,
                    });
                }
                   
                } catch (error) {
                   console.log("Authentication error",error); 
                   dispatch({
                       type:"LOGOUT",

                   })
                   navigate("/");
                }
            }else{
                dispatch({
                    type:"LOGOUT",
                })
                navigate("/")
            }
            
        
};
checkAuthentication();
    },[navigate])

   const logout=()=>{
       cookie.remove("accessToken")
       dispatch({
           type:"LOGOUT"
       })
       navigate("/")
   } 

const login=async(email,password)=>{
    try {
        const response=await axiosInstance.post(endPoint.LOGIN,{
            email,
            password,
        })
        if(response.status===200){
            const {accessToken,user}=response.data;

            cookie.set("accessToken",accessToken);
            dispatch({type:"SET_USER",payload:user});
            toast.success('🦄 Logged in Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              navigate("/home")  
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        
    }
}

const signup=async(firstName,lastName,email,password)=>{
    try {
       const response=await axiosInstance.post(endPoint.SIGNUP,{
           firstName,
           lastName,
           email,
           password,
       }) 
       if(response.status===201){
           const {accessToken,user}=response.data;
           toast.success('🦄 Signed up Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            cookie.set("accessToken",accessToken);
            dispatch({type:"SET_USER",payload:user});

            navigate("/home")  
       }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        
    }


}

return(
    <AuthContext.Provider value={{state,logout,login,signup}}>{children}</AuthContext.Provider> 
)



}
