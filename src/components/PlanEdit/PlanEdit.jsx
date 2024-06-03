import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlan, updatePlan } from "../../library/api";
import { Spinner } from "@chakra-ui/react";

export const PlanEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState(null);
  const { planId } = useParams();
  const navigate = useNavigate();

  const loadPlan = async () => {
    const plan = await getPlan(planId);
    setPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updatePlan(planId, { title, description });
    navigate("/");
  };

  if (!plan) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit} >
      <h3>Úprava plánu</h3>
      <div>
        <label htmlFor="title">
          Chceš změnit název?
        </label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">
          Nebo chceš změnit popis?
        </label>
        <textarea
          rows="3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <button type="submit">
        Upravit
      </button>
    </form>
  );
};
