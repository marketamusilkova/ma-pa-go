import { useState } from 'react';
import { appendPlan } from '../../library/api';
import { useNavigate } from 'react-router-dom';
import { Button, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import './NewPlan.css';
import harry from "./Harry.jpg"

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
    <>
      <Heading as="h2" size="xl" className='heading_newplan'>
        Zde si můžeš vytvořit zbrusu nový plán.
      </Heading>
      <div className="newPlan">
        <img className='harry' src={harry} alt="Harry and Hedwig" />
        <form className="form_newplan" onSubmit={handleSubmit}>
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
    </>
  );
};
