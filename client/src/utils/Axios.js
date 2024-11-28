import axios from "axios";
import { Back_End_Base_Url } from "../common/SummaryApi";


const Axios = axios.create({
    baseURL: Back_End_Base_Url,
    withCredentials:true,

})

export default Axios;