
export const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userCredentials:{
                    email:action.payload.email,
                    password:action.payload.hash,
                    id:action.payload.id,
                    isLogged:true
                }
               
            };
        case 'LOGOUT':
            return {
                ...state,
                userCredentials:{
                    email:'',
                    password:'',
                    id:'',
                    isLogged:false
                }
            };
        default: return state;
    }
}