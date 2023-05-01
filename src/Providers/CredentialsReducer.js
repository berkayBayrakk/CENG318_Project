
export const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userCredentials:{
                    email:action.payload.email,
                    password:action.payload.hash,
                    isLogged:true
                }
               
            };
        case 'LOGOUT':
            return {
                ...state,
                userCredentials:{
                    email:'',
                    password:'',
                    isLogged:false
                }
            };
        default: return state;
    }
}