import { useState } from 'react'
import './App.css'
import Select from './components/Select/Select'

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
]

function App() {
  const [value, setValue] = useState(options[0])
  const [valueM, setValueM] = useState([options[0]])

  return (
    <>
      <Select
        value={value}
        options={options}
        onChange={(opt) => setValue(opt)}
      />
      <Select
        multiple
        value={valueM}
        options={options}
        onChange={(opt) => setValueM(opt)}
      />
    </>
  )
}

export default App
