import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchName, SetNewSearchName] = useState('')

  //new code
  const addPerson = (event) => {
    
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    
    /*
    function checkExist (element) {
      return element.name === personObject.name
    }*/
    //same function above to arrow function
    const checkExist = (element) => element.name === personObject.name

    //console.log('checkExist', checkExist())    

    if (persons.some(checkExist)) {
      setNewName('')
      alert(`${newName} is already added to phonebook`)
      console.log('on jo lisätty')
    } else {
      console.log('ei ole lisätty')
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    SetNewSearchName(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      filter show with: <input value={newSearchName} onChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/><br></br>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug search name: {newSearchName}</div>

      <div>
        {persons.map(person=> {
          if(person.name.toLowerCase().includes(newSearchName.toLowerCase())) {
            return (<div key = {person.name}> {person.name} {person.number}</div>)
          }
        })}
      </div>
      
    </div>
  )

}

export default App