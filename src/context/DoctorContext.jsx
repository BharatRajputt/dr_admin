import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext =   createContext()


const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
  
    

    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
     const [appointments,setAppointments] = useState([])
     const [dashData,setDashData] = useState()
    const[profileData,setProfileData] = useState(false)
     const getAppointments = async()=>{
        try {

            const {data} = await axios.get(backendUrl +'/api/doctor/appointments',{headers:{dToken}})


            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }
            else{
                toast.error()
            }
            
        }   catch (error) {
            console.log(error.message);
            toast.error(error.message);
            
            
          }
     }



     const completeAppointment = async(appointmentId)=>{

       try {
         const {data} = await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
         if(data.success){
            toast.success(data.message)
            getAppointments()
         }
         else{
            toast.error(data.message)
         }
       } 
       
       catch (error) {
        console.log(error.message);
            toast.error(error.message);
            
       }
     }



     const cancelAppointment = async(appointmentId)=>{

        try {
          const {data} = await axios.post(backendUrl+'/api/doctor/appointment-cancel',{appointmentId},{headers:{dToken}})
          if(data.success){
             toast.success(data.message)
             getAppointments()
          }
          else{
             toast.error(data.message)
          }
        } 
        
        catch (error) {
         console.log(error.message);
             toast.error(error.message);
             
        }
      }
     

      const getDashData = async()=>{

        try {
            
            const {data} = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
            console.log("ye bhi aagya");
            
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
                
            }
            else{
                toast.error(data.message)
            }
        } 
            catch (error) {
                console.log(error.message);
                    toast.error(error.message);
                    
        
      }
    }


    const getProfileData = async()=>{

        try {
            
            const {data} = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            }



        } catch (error) {
            console.log(error.message);
                toast.error(error.message);
                
    
  }

    }


    const value = {

        dToken,setDToken,
        backendUrl,appointments,
        setAppointments,getAppointments,
        completeAppointment,cancelAppointment,
        dashData,setDashData,getDashData,
        profileData,setProfileData,getProfileData


    }

    return(

        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}



export default  DoctorContextProvider