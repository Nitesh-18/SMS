import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white transition-colors">
      <Navbar />
      <main className="p-4">
        <Home />
      </main>
    </div>
  )

}

export default App
