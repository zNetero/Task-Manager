import { useSocket } from './contexts/SocketContext';
import { Board } from './components/Board';

function App() {
  const { isConnected } = useSocket();

  return (
    <div className="min-h-screen bg-gray-200 p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestor de Tarefas Colaborativo</h1>
          
          <div className="flex items-center gap-2 text-sm">
            <span>Status da conexão WebSocket:</span>
            {isConnected ? (
              <span className="text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Online
              </span>
            ) : (
              <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Offline
              </span>
            )}
          </div>
        </header>

        <Board />
      </div>
    </div>
  );
}

export default App;