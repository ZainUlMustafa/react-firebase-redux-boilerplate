const initState = {
    // isSignedIn - used in App.js, Landing.js, Navbar.js - state.firebase.auth.isEmpty (t => nl, f => l)
    isSignedIn: !true, // use only for testing and adjust on above files
    isLoginModalOpen: false,
    showLoader: false,
    /// README: AUTH ERROR
    error: null,

    /// README: MESSAGES
    message: null,

    /// README: USER MODEL
    userModel: {
        firstName: "",
        lastName: "",
        email: "",
    },

    /// README: UPDATE PROFILE MODAL
    isUserUpdating: false,
    isPictureAdded: false,
    isUserUpdated: false,
    hasShop: false,

    isUpdating: false
}

const authReducer = (state = initState, action) => {
    if (action.type === 'INIT_USER_ACTION') {
        //console.log(action)
        return {
            ...state,
            showLoader: true,
            error: null,
            message: null,
        }
    }
    else if (action.type === 'CLEAR_ERROR_MSG') {
        return {
            ...state,
            error: null,
            message: null
        }
    }
    else if (action.type === 'SIGN_IN') {
        //console.log(action)
        return {
            ...state,
            showLoader: false,
            isLoginModalOpen: true,
            isSignedIn: true,
            error: null,
            message: null,
        }
    }
    else if (action.type === 'SIGN_IN_ERROR') {
        //console.log(action)
        return {
            ...state,
            showLoader: false,
            isLoginModalOpen: false,
            isSignedIn: false,
            error: action.error,
            message: null,
        }
    }
    else if (action.type === 'SIGN_OUT') {
        //console.log(action)
        return {
            ...state,
            isLoginModalOpen: false,
            isSignedIn: false,
            message: null,
        }
    }

    else if (action.type === 'UPDATE_DETAILS') {
        //console.log(action)
        return {
            ...state,
            isUpdating: true
        }
    }

    else if (action.type === 'UPDATED_DETAILS') {
        //console.log(action)
        return {
            ...state,
            isUpdating: false
        }
    }

    else if (action.type === 'SIGN_UP') {
        //console.log(action)
        return {
            ...state,
            showLoader: false,
            isSignedIn: true,
            error: null,
            message: null,
        }
    }
    else if (action.type === 'SIGN_UP_ERROR') {
        //console.log(action)
        return {
            ...state,
            isSignedIn: false,
            error: action.error,
            message: null,
        }
    }
    else if (action.type === 'VERIFY') {
        //console.log(action)
        return {
            ...state,
            error: null,
            message: null,
        }
    }
    else if (action.type === 'PASSWORD_RESET') {
        //console.log(action)
        return {
            ...state,
            message: action.message,
            showLoader: false
        }
    }
    else if (action.type === 'INIT_FORGOT_PASSWORD_ACTION') {
        return {
            ...state,
            showLoader: true,
            error: null,
            message: null,
        }
    }
    else if (action.type === 'PASSWORD_FORGOT_EXCEPTION') {
        return {
            ...state,
            showLoader: false,
            error: action.message
        }
    }

    /// README: PROFILE UPDATING
    else if (action.type === "OPEN_USER_UPDATE_MODAL") {
        return {
            ...state,
            isUserUpdating: false,
            isPictureAdded: false,
            isUserUpdated: false,
        }
    }
    else if (action.type === "UPDATE_USER") {
        return {
            ...state,
            isUserUpdating: true,
        }
    }
    else if (action.type === "USER_DP_UPDATED") {
        return {
            ...state,
            isPictureAdded: true,
        }
    }
    else if (action.type === "USER_UPDATED") {
        return {
            ...state,
            isUserUpdating: false,
            isPictureAdded: false,
            isUserUpdated: true,
        }
    }
    return state;
}

export default authReducer;