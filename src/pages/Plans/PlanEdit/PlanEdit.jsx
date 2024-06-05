import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { getPlan, updatePlan } from '../../../library/api';
import './PlanEdit.css';
import mario from './Mario.jpg';

export const PlanEdit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
    navigate('/plans');
  };

  if (!plan) {
    return <Spinner />;
  }

  return (
    <div className="plan_edit">
      <form onSubmit={handleSubmit} className="form_plan_edit">
        <div className='edit_header'>
          <Heading as="h2" size="xl">
            Úprava plánu
          </Heading>
          <img className='mario' src={mario} alt="Super Mario" />
        </div>
        <div>
          <FormLabel>Chceš změnit název?</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <FormLabel>Nebo chceš změnit popis?</FormLabel>
          <Textarea
            rows="3"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></Textarea>
        </div>
        <Button type="submit">Upravit</Button>
      </form>
    </div>
  );
};
