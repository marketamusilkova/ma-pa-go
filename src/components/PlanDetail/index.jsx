import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getPlan, listAllTasks, listDayTasks } from '../../library/api';
import { Spinner } from '@chakra-ui/react';

const formatTime = (time) =>
  time ? time.substring(0, 2) + ':' + time.substring(2) : '';

const Task = ({ task }) => (
  <>
    <div>{task.time && <span>{formatTime(task.time)}</span>}</div>
    <div>{task.title}</div>
  </>
);

const TaskList = ({ tasks }) => (
  <div >
    {tasks.map((task) => (
      <Task key={task.$$id} task={task} />
    ))}
  </div>
);

const AllTasks = ({ planId }) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setTasks(
      Object.groupBy(await listAllTasks(planId), (task) => task.date),
    );
  };

  if (!tasks) {
    return <Spinner />;
  }
  return Object.entries(tasks).map(([date, tasks]) => (
    <>
      <div>
        <h4>{dayjs(date).format('D. M. YYYY')}</h4>
      </div>
      <TaskList tasks={tasks} />
    </>
  ));
};

const Tasks = ({ planId, date }) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setTasks(await listDayTasks(planId, date));
  };

  if (!tasks) {
    return <Spinner />;
  }
  return <TaskList tasks={tasks} />;
};

const Tab = ({ label, name, onSelect }) => (
  <li role="presentation">
    <button
      type="button"
      role="tab"
      onClick={() => onSelect(name)}
    >
      {label}
    </button>
  </li>
);

export const PlanDetail = () => {
  const [plan, setPlan] = useState(null);
  const [tab, setTab] = useState('all');
  const { planId } = useParams();

  const fetchPlan = async () => {
    const plan = await getPlan(planId);
    setPlan(plan);
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  if (!plan) {
    return <Spinner />;
  }

  return (
    <>
      <h1>{plan.title}</h1>
      <p>{plan.description}</p>
      <h2>Úkoly</h2>
      <ul role="tablist">
        <Tab label="Všechny" name="all" currentTab={tab} onSelect={setTab} />
        <Tab label="Dnešní" name="today" currentTab={tab} onSelect={setTab} />
        <Tab
          label="Zítřejší"
          name="tomorrow"
          currentTab={tab}
          onSelect={setTab}
        />
      </ul>
        <div role="tabpanel">
          {tab === 'all' && <AllTasks planId={planId} />}
          {tab === 'today' && (
            <Tasks planId={planId} date={dayjs().format('YYYY-MM-DD')} />
          )}
          {tab === 'tomorrow' && (
            <Tasks
              planId={planId}
              date={dayjs().add(1, 'day').format('YYYY-MM-DD')}
            />
          )}
        </div>
    </>
  );
};
