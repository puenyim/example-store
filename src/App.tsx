import AppProviders from './app/providers/AppProviders';
import AppRouter from './app/router/AppRouter';
import Navbar from './app/layout/Navbar';
import ErrorBoundary from './core/components/Error';
import './App.css';

function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <Navbar />
        <main className="app-main">
          {/* Per-route boundary: errors in one route don't crash the whole app */}
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </main>
      </ErrorBoundary>
    </AppProviders>
  );
}

export default App;
