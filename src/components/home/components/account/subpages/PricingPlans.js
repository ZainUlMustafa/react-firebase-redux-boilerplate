import PlansListAdapter from "./pricingPlansComponents/PlansListAdapter";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
/*
const plansList = [
    {
        id: '1',
        name: 'product 1'
    },
    {
        id: '12',
        name: 'product 2'
    },
    {
        id: 'l3',
        name: 'product 3'
    },
    {
        id: '3k43',
        name: 'product 4'
    },
    {
        id: '3y3',
        name: 'product 5'
    },
]
*/

const PricingPlans = (props) => {
    const { charges,store } = props;
console.log(charges, 'charges');

if (!isLoaded(store)) {
    return <div>Loading...</div>;
}

const plansList = Object.values(store).map((eachProduct, index) => ({
    productName: eachProduct.itemName,
    productDescription: eachProduct.itemDescription
}));

if (plansList.length === 0) {
    return <>No orders available!</>
}
    return (
        <><PlansListAdapter PlansList={plansList} /></>
    );
}

const mapStateToProps = (state) => {
    return {

        userData: state.firebase.profile,
        store: state.firestore.data.Store,
        companyData: state.firestore.data.Company,
        charges: state.firestore.data.Charges
    }
}
const enhance = compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {

        return [
            {
                collection: "Store",
                storeAs: "Store",
            },
        ];
    })
);
export default enhance(PricingPlans);