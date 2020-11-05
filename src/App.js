import logo from './logo.svg';
import './App.css';
import './components/WorkItemCard';
import WorkItemCard from './components/WorkItemCard';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="App">
      <KanbanBoard />
    </div>
  );
}

export default App;
