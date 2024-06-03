import { useState } from 'react';
import { appendPlan } from '../../library/api';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text, Textarea } from '@chakra-ui/react';

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
    <form onSubmit={handleSubmit}>
      <h3>Zde si můžeš vytvořit zbrusu nový To Do list.</h3>

      <Text mb="8px">Zadej název:</Text>
      <Input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <Text mb="8px">Popiš a upřesni si tento Plán: <small>(nepovinný údaj)</small></Text>
      <Textarea
        rows="3"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button type="submit">Vytvořit</Button>
    </form>
  );
};
