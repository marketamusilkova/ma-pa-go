import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';
import {
  Button,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
} from '@chakra-ui/react';
import './NewTask.css';
import harry_potter from './Harry_Potter.jpg';

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
    <div className="container_newtask">
      <img className="img_newtask" src={harry_potter} alt="Harry Potter" />
      <div className='newtask'>
        <Heading>Přidej nový úkol</Heading>
        <form className='form_newtask' onSubmit={handleSubmit}>
          <div>
            <FormLabel>Vyber k jakému plánu chceš přidat úkol</FormLabel>
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
            <FormLabel>Název úkolu</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div>
            <FormLabel>
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
      </div>
    </div>
  );
};
