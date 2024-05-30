import { Link, Outlet } from 'react-router-dom';
import "./style.css"

const Navigation = () => (
  <nav className='nav'>
    <Link to="/">Domů</Link>
    <Link to="/todo">TO DO</Link>
    <Link to="/new">Nový úkol</Link>
    <Link to="/aboutus">O nás</Link>
  </nav>
);

export const App = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
