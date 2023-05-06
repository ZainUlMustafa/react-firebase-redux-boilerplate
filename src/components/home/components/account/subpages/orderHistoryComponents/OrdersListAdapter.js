import OrderDetailsCard from "./OrderDetailsCard";

const OrdersListAdapter = (props) => {
    const { ordersList } = props;
    return (
        ordersList?.map((eachOrder, i) => {
            return <OrderDetailsCard orderDetails={eachOrder} key={eachOrder.id} />
        })
    );
}

export default OrdersListAdapter;