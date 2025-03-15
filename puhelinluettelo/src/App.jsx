import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter show with: <input value={props.newSearchName} onChange={props.handleSearchNameChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/><br></br>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <div>
        {props.persons.map(person=> {
          if(person.name.toLowerCase().includes(props.newSearchName.toLowerCase())) {
            return (<div key = {person.name}> {person.name} {person.number}</div>)
          }
        })}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchName, SetNewSearchName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
      console.log('promise fullfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
      <Filter newSearchName={newSearchName} handleSearchNameChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>debug search name: {newSearchName}</div>
      <Persons persons={persons} newSearchName={newSearchName}/>
    </div>
  )

}

export default App