import { useState } from 'react';
import { appendPlan } from '../../library/api';
import { useNavigate } from 'react-router-dom';
import { Button, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import './NewPlan.css';
import beatles from './Beatles_StarWars.jpg';

export const NewPlan = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log('funguju');
    event.preventDefault();
    const plan = {
      title,
      description: description ? description : null,
    };

    console.log(plan);
    await appendPlan(plan);
    navigate(`/plans`);
  };

  return (
    <div className='newplan'>
      <div className="heading_newplan">
        <Heading as="h2" size="xl">
          Vytvořit nový plán
        </Heading>
        <img className="beatles" src={beatles} alt="Star wars as The Beatles" />
      </div>
        <form onSubmit={handleSubmit} className='form_newplan'>
          <FormLabel>Zadej název:</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <FormLabel>
            Popiš a upřesni si tento plán: <small>(nepovinný údaj)</small>
          </FormLabel>
          <Textarea
            rows="3"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button type="submit">Vytvořit</Button>
        </form>
    </div>
  );
};
