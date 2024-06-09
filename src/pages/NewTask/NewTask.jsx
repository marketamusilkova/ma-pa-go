import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendTask, listPlans } from '../../library/api';
import {
  Button,
  FormLabel,
  Heading,
  Img,
  Input,
  Select,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import './NewTask.css';
import harry_potter from './Harry_Potter.jpg';

export const NewTask = () => {
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px or larger is considered a large screen
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      {isLargeScreen ? (
        <Stack direction="row" >
          <Stack minW="55%" align='center' justify="center">
            <Heading>Přidej nový úkol</Heading>
            <form className="form_newtask" onSubmit={handleSubmit}>
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
              <FormLabel>Název úkolu</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <FormLabel>
                Datum <small>(nepovinné)</small>
              </FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
              <Button type="submit">Přidat</Button>
            </form>
          </Stack>
          <Img
            maxW='40%'
            className="img_newtask"
            src={harry_potter}
            alt="Harry Potter"
          />
        </Stack>
      ) : (
        <Stack>
          <Stack>
            <Heading>Přidej nový úkol</Heading>
            <form className="form_newtask" onSubmit={handleSubmit}>
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
              <FormLabel>Název úkolu</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <FormLabel>
                Datum <small>(nepovinné)</small>
              </FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
              <Button type="submit">Přidat</Button>
            </form>
          </Stack>
          <Img
            maxW={'50%'}
            className="img_newtask"
            src={harry_potter}
            alt="Harry Potter"
          />
        </Stack>
      )}
    </div>
  );
};
