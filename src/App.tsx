import AppProviders from './app/providers/AppProviders';
import AppRouter from './app/router/AppRouter';
import Navbar from './app/layout/Navbar';
import './App.css';

function App() {
  return (
    <AppProviders>
      <Navbar />
      <main className="app-main">
        <AppRouter />
      </main>
    </AppProviders>
  );
}

export default App;
