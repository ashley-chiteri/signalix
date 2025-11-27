import { Toaster } from 'sonner';
import AppRouter from './router';
import './index.css';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <>
    <Toaster position="top-right" richColors={false} />
     <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}

export default App
