import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';
import { Button, FormLabel, Input, Select, Spinner } from '@chakra-ui/react';
import './NewTask.css';

export const NewTask = () => {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
    setPlan(data[0].$$id);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = {
      plan,
      title,
      date: date ? date : null,
    };

    await appendTask(task);
    navigate(`/plan/${plan}`);
  };

  if (!plans) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Přidej nový úkol.</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor="plan">
            Vyber k jakému plánu chceš přidat úkol:
          </FormLabel>
          <Select
            aria-label="Výběr Plánu"
            value={plan}
            onChange={(event) => setPlan(event.target.value)}
            required
          >
            {plans.map((plan) => (
              <option key={plan.$$id} value={plan.$$id}>
                {plan.title}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel htmlFor="title">Název úkolu</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <FormLabel htmlFor="date">
            Datum <small>(nepovinné)</small>
          </FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <Button type="submit">Přidat</Button>
      </form>
    </>
  );
};
