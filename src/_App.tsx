import './styles/main.scss'
import { Button } from './components/Button'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_KEY) 
  }, [])
  
  return (
    <Button>
      count is
    </Button>
  )
}

export default App
