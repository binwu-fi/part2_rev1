import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  //new code
  const addPerson = (event) => {
    
    event.preventDefault()
    const personObject = {
      name: newName,
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
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (<div key = {person.name}> {person.name}</div>)
      })}
      
      <div>debug: {newName}</div>
    </div>
  )

}

export default App