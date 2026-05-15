import { Routes, Route } from 'react-router';
import { EditTask } from './pages/EditTask';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/:id/edit" element={<EditTask />} />
    </Routes>
  );
}

export default App;
