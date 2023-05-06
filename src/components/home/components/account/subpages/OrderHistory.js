import OrdersListAdapter from "./orderHistoryComponents/OrdersListAdapter";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { clearInvoiceRequest } from "../../../../../store/actions/paymentActions"
import { dateConverter, daysDifference } from "./../components/helper/Helper"
import firebase from './../../../../../config/firebaseConfig'
const OrderHistory = (props) => {
    // const ordersList = props.....
    const { companyOrdersHistory } = props;
    console.log(companyOrdersHistory);
    if (!isLoaded(companyOrdersHistory)) {
        return <div>Loading...</div>;
    }
    // const ordersList = props.....
    const ordersList = Object.values(companyOrdersHistory).map((eachOrder, index) => ({
        itemName: eachOrder.itemName,
        date: dateConverter(eachOrder.timestamp.seconds * 1000).parsedDate
    }));
    console.log(ordersList, 'orderlist');
    if (ordersList.length === 0) {
        return <>No orders available!</>
    }

    return (
        <>
            <OrdersListAdapter ordersList={ordersList} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        companyData: state.firestore.data.Company,
        themeColors: state.theme,
        userData: state.firebase.profile,
        userId: state.firebase.auth.uid,
        companyOrdersHistory: state.firestore.ordered.CompanyOrdersHistory,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        clearInvoiceRequest: () => dispatch(clearInvoiceRequest())

    }
}
const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        const { coid } = props.companyData;
        return [
            {
                collection: `ProductOrders`,
                where: [['coid', '==', `${coid}`]],
                // limit: 10,
                orderBy: ['timestamp', 'desc'],
                storeAs: "CompanyOrdersHistory",
            },
        ];
    })
);
export default enhance(OrderHistory);