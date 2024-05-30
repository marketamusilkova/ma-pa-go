import { useEffect, useState } from "react";
import { appendPlans, listPlans } from "../../library/api";
import { PlansList } from "../PlansList";
import { NewPlan } from "../NewPlan";
import { Spinner } from "@chakra-ui/react";

export const ToDo = () => {
  const [plans, setPlans] = useState(null);

  const handleAppend = async (plan) => {
    await appendPlans(plan);
    fetchPlans();
  };

  const handleDelete = () => {
    fetchPlans();
  };

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      {plans ? (
        <PlansList plans={plans} onDelete={handleDelete} />
      ) : (
        <Spinner />
      )}
      <NewPlan onAppend={handleAppend} />
    </>
  );
};
