import axios from 'axios';


//the function takes a token as a parameter
const setAuthToken=token=>{
    if(token){
        axios.defaults.headers.common['x-auth-token']=token
    }
    else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken