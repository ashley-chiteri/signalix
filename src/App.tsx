import { Toaster } from 'sonner';
import AppRouter from './router';
import './index.css'

function App() {

  return (
    <>
    <Toaster position="top-right" richColors={false} />
      <AppRouter />
    </>
  )
}

export default App
