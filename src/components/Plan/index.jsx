import { Link } from 'react-router-dom';
import { deletePlan } from '../../library/api';

export const Plan = ({ plan, onDelete }) => {
  const handleDeleteClick = async () => {
    await deletePlan(plan.$$id);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      <div>{plan.title}</div>
      <p>{plan.description}</p>
      <div>
        <Link to={`/plan/${plan.$$id}`}>Zobrazit tento To Do list</Link>
        <Link to={`/plan/${plan.$$id}/edit`}>Upravit tento To Do list</Link>
        <button type="button" onClick={handleDeleteClick}>
          Smazat To Do List
        </button>
      </div>
    </>
  );
};
