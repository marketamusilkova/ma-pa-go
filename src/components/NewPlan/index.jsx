import { useState } from 'react';

export const NewPlan = ({ onAppend }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onAppend) {
      onAppend({ title, description });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Zde si můžeš vytvořit zbrusu nový To Do list.</h3>
      <label htmlFor="title">Zadej název:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <label htmlFor="description">Popiš a upřesni si tento To Do list:</label>
      <textarea
        rows="3"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <button type="submit">Vytvořit</button>
    </form>
  );
};
