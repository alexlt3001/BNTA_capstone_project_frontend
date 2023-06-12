import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInModal from './LogInModal';

const LogInForm = () => {
  const navigate = useNavigate();

  const [listOfUsers, setListOfUsers] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [player, setPlayer] = useState([]);
  

  const handleJoin = () => {
    setShowLoginModal(true);
  };

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    const newPlayer = { username, password };
    setListOfUsers([...listOfUsers, newPlayer]);
    setShowLoginModal(false);
    setIsUserRegistered(true);
    await postPlayer(newPlayer); 
  };

  const handlePlay = () => {
    if (!isUserRegistered) {
      alert('User not created, please create a user first to play');
    } else {
      navigate('/play');
    }
  };

  const postPlayer = async (newPlayer) => {
    const response = await fetch('http://localhost:8080/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer),
    });
    const savedPlayer = await response.json();
    setPlayer([...player, savedPlayer]);
  };

  return (
    <>
      <div className='title-screen'>
        <h1>Higher or Lower: Pokémon edition</h1>
      </div>
      <button onClick={handleJoin}>Join</button>
      <button onClick={handlePlay}>Play</button>
      {/* <button>Login</button> not doing anything at the moment */}
      <button>LeaderBoard</button>

      {showLoginModal && <LogInModal handleLogin={handleLogin} />}

      {isUserRegistered && <p>User created, you can now play</p>}
    </>
  );
};

export default LogInForm;