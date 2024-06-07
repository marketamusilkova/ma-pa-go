import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  FormLabel,
  Heading,
  Input,
  Spinner,
} from '@chakra-ui/react';
import './TaskEdit.css';
import mario from './Mario.jpg';
import { getTask, updateTask } from '../../library/api';

export const TaskEdit = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const loadPlan = async () => {
    const task = await getTask(taskId);
    setTask(task);
    console.log(task)
    setTitle(task.title);
    setDate(task.date);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateTask(taskId, { title, date });
    navigate('/plans');
  };

  if (!task) {
    return <Spinner />;
  }

  return (
    <div className="task_edit">
      <form onSubmit={handleSubmit} className="form_task_edit">
        <div className="edit_task_header">
          <Heading as="h2" size="xl">
            Úprava úkolu
          </Heading>
          <img className="mario" src={mario} alt="Super Mario" />
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
          <FormLabel>
            Nebo chceš změnit datum? <small>(nepovinné)</small>
          </FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <Button type="submit">Upravit</Button>
      </form>
    </div>
  );
};
