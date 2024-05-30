import { Header } from '../../components/Header';
import './style.css';
import dayjs from 'dayjs';

export const HomePage = () => {
  const dnes = dayjs();
  const stedryDen = dayjs('2024-12-24');
  const zbyva = stedryDen.diff(dnes, 'day');

  return (
    <>
      <Header />
      <div>Toto je HomePage.</div>
      <div>Do Vánoc zbývá ještě {zbyva} dní!</div>
    </>
  );
};
