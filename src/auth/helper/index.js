import {API} from '../../backend'

//Signup function
export const signup = user =>{
    return fetch(`${API}/signup`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(
        response =>{
            return response.json()
        }
    )
    .catch(error => console.log(error))
}


//Signin function
export const signin = user =>{
    return fetch(`${API}/signin`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(
        response =>{
            return response.json()
        }
    )
    .catch(error => console.log(error))
}

//Set token in user browser
export const authenticate  = (data , next) =>{
    if (typeof window !== 'undefined') {
        localStorage.setItem("jwt" , JSON.stringify(data))
        next()
    }
}

//SignOut
//Here next is written so that we can add callback function
// after signout perform
export const signout = next =>{
    if (typeof window !== 'undefined') {
        localStorage.removeItem("jwt")
        next()
        return fetch(`${API/signout}`,{
            method : "GET"
        }).then(
            response => console.log("SignOut Success.")
            
        )
        .catch(error => console.log("Error in SignOut.")
        )
    }
}


//check user login or not
export const isAuthenticated = ()=>{
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}