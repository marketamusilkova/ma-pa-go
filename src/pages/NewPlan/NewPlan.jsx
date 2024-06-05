import { useState } from 'react';
import { appendPlan } from '../../library/api';
import { useNavigate } from 'react-router-dom';
import { Button, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import './NewPlan.css';
import star_wars0 from './star_wars_0.jpg';
import star_wars1 from './star_wars_1.jpg';
import star_wars3 from './star_wars_3.jpg';
import star_wars2 from './star_wars_2.jpg';

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
    navigate(`/newtask`);
  };

  return (
    <div className="background_newplan">
      <div className="container_newplan">
        <div className="newplan">
          <Heading as="h2" size="xl">
            Vytvořit nový plán
          </Heading>
          <form onSubmit={handleSubmit} className="form_newplan">
            <FormLabel>Zadej název</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <FormLabel>
              Popiš a upřesni si tento plán <small>(nepovinný údaj)</small>
            </FormLabel>
            <Textarea
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button type="submit">Vytvořit</Button>
          </form>
        </div>
        <div className='img_tab'>
          <div className="newplan_img">
            <img src={star_wars0} alt="Star wars" />
            <img src={star_wars1} alt="Star wars" />
          </div>
          <div className="newplan_img">
            <img src={star_wars2} alt="Star wars" />
            <img src={star_wars3} alt="Star wars" />
          </div>
        </div>
      </div>
    </div>
  );
};
