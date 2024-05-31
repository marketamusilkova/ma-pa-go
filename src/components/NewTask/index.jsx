import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';
import { Button, Input, Select, Spinner } from '@chakra-ui/react'
import "./style.css"

export const NewTask = () => {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const data = await listPlans();
    setPlans(data);
    setPlan(data[0].$$id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = {
      plan,
      title,
      date,
      time: time ? time.replace(':', '') : null,
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
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor="plan">To Do list</label>
          <Select
            aria-label="Výběr To Do listu"
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
          <label htmlFor="title">Název úkolu</label>
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Datum</label>
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">
            Čas <small>(nepovinný)</small>
          </label>
          <Input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
        <Button type="submit">Přidat</Button>
      </form>
    </>
  );
};
