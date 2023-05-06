import PlanDetailsCard from "./PlanDetailsCard"
const PlansListAdapter = (props) => {
    const { PlansList } = props;
    return (
        PlansList?.map((eachPlan, i) => {
            return <PlanDetailsCard PlanDetails={eachPlan} key={eachPlan.id} />
        })
    );
}

export default PlansListAdapter;