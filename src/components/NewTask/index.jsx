import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="plan">To Do list</label>
          <select
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
          </select>
        </div>
        <div>
          <label htmlFor="title">Název úkolu</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Datum</label>
          <input
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
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
        <button type="submit">Přidat</button>
      </form>
    </>
  );
};
