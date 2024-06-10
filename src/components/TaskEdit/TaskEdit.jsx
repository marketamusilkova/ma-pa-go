import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
} from '@chakra-ui/react';
import './TaskEdit.css';
import toys_story from './Toys_story.jpg';
import { getTask, updateTask } from '../../library/api';

export const TaskEdit = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  const loadTask = async () => {
    const task = await getTask(taskId);
    setTask(task);
    setTitle(task.title);
    setDate(task.date);
  };

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateTask(taskId, { plan: task.plan, title, date });
    navigate('/plans');
  };

  if (!task) {
    return <Spinner />;
  }

  return (
    <div className="task_edit">
      <form onSubmit={handleSubmit} className="form_task_edit">
        <div className="edit_task_header">
          <Image className="mario" src={toys_story} alt="Super Mario" />
          <Heading as="h2" size="xl">
            Úprava úkolu
          </Heading>
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
        <Button bg="yellow.500" color="white" type="submit">
          Upravit
        </Button>
      </form>
    </div>
  );
};
