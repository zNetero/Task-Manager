import { useSocket } from './contexts/SocketContext';

function App() {
  const { isConnected } = useSocket();

  return (
    <div>
      <p>Conectado: {isConnected ? 'Sim' : 'Nao'}</p>
    </div>
  );
}

export default App;