import { Plan } from "../Plan";

export const PlansList = ({ plans, onDelete }) => {
  return (
    <>
      <h2>Seznam všech mých To Do listů</h2>
      {plans.map((plan) => (
        <Plan key={plan.$$id} plan={plan} onDelete={onDelete} />
      ))}
    </>
  );
};
