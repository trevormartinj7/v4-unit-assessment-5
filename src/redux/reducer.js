import { Switch } from "react-router"

const initialState = {
    username: null,
    profilePicture: null
}

const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";

export function updateUser(user){
    return{
        type: UPDATE_USER,
        payload: user
    }
}

export function logout(){
    return{
        type: LOGOUT,
        payload: null
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGOUT:
            return{...state, username: action.payload, profilePicture: action.payload}
        case UPDATE_USER:
            return{...state, username: action.payload.username, profilePicture: action.payload.profile_pic}
        default:
            return{...state};
    }


}