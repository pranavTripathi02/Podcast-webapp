import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button>
        <Link to='podcasts'>Here</Link>
      </button>
    </div>
  );
}

export default Home;
