const initState = {


    // DASHBOARD SIDEBAR
    dashboardSidebarToggle: true,
    dashboardSidebarSize: "250px", //50


    // For testing purpose isTestApp will be true.
    // In production isTestApp will be false.
    // isTestApp: false,

    modalStyles: {
        content: {
            top: '40%',
            left: '72%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '30px'

        },
    },
    modalStylesForLink: {
        content: {
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '30px'

        },
    },
    modalStylesForVideo: {
        overlay: {
            zIndex: 1300,
        },
        content: {
            top: '25%',
            left: '10%',
            right: '50%',
            bottom: 'auto',
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
            borderRadius: '30px'

        },
    },
    modalStylesForVideoGps: {
        overlay: {
            zIndex: 1300,
        },
        content: {
            top: '25%',
            left: '62%',
            right: '10%',
            bottom: 'auto',
            // marginRight: '-50%',
            transform: 'translate(-20%, -20%)',
            borderRadius: '30px',

        },
    },

    modalWidth: '30%',
    modalWidthMedium: '60%',
    modalWidthHuge: '80%',
    modalColor: '#F8F9FF',
    modalHeight: '30%',
    modalHeightMedium: '60%',
    modalHeightHuge: '80%',

    formLabelStyle: {
        fontSize: "16px",
        fontWeight: "bold",
    },

    signUpModalTitleStyle: {
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: 'center',
        backgroundColor: 'white',
        border: '0px',
    },
    modalTitleStyle: {
        fontSize: "24px",
        fontWeight: "bold",
    },

    modalInfoTextStyle: {
        fontSize: "14px",
        textAlign: 'start',
    },

    modalImpInfoTextStyle: {
        fontSize: "14px",
        color: "#a20000"
    },
    linkTextStyle: {
        color: "#fafafa",
    },
    fixedSideBarHeading: {
        fontSize: '12px',
        color: '#51CBFF',
    },
    fixedSideBarHeading1: {
        fontSize: '12px',
        color: '#51CBFF',
        marginTop: '40px'
    },
    topNavBarImage: {
        width: "50px",
        height: "50px",
        objectFit: 'cover',
        borderRadius: '10px',
        border: '1px grey solid'
    },
    topNavBarDropdownText: {
        marginRight: '0px',
        fontWeight: 'bold'
    },
    topNavBarDropdownEmailText: {
        marginLeft: '0px',
        fontSize: '14px',
        color: 'gray'
    },
    userDropdownStyle: {
        width: '300px',
        borderRadius: '15px',
        backgroundColor: '#F8F9FF'
    },
    userDropdownDivderStyle: {
        backgroundColor: 'black',
        borderRadius: '15px',
    },
    userDropdownNavLinkStyle: {
        backgroundColor: '#F8F9FF',
        color: 'black',
        borderRadius: '15px',
    },
    projectCardStyle: {
        borderRadius: '8px',
        // boxShadow:'1px 3px 4px #2a0752',
        // height:"26rem",
        // width:'30rem'
    },
    projectCardImageStyle: {
        borderRadius: '8px',
        // width:"100px",
        height: '200px'
    }

}

const appControlReducer = (state = initState, action) => {
    // //console.log(action);

    if (action.type === 'DASHBOARD_TOGGLE') {
        //console.log(action.toggle)
        return {
            ...state,
            dashboardSidebarToggle: action.toggle,
            dashboardSidebarSize: action.toggle ? "250px" : "50px",
        }
    }
    return state;
}

export default appControlReducer;