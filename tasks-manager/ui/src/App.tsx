import { Routes, Route } from 'react-router';
import { EditTask } from './pages/EditTask';
import { Home } from './pages/Home';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id/edit" element={<EditTask />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
