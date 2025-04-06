import { useState, useEffect } from 'react'
import personService from './services/persons'


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

const Persons = ({persons, newSearchName, removePerson}) => {
  return (
    <div>
        {persons.map(person=> {
          if(person.name.toLowerCase().includes(newSearchName.toLowerCase())) {
            return (
              <div key = {person.id}>
                {person.name} {person.number}
                <button name={person.name} id={person.id} onClick={removePerson}>
                  delete
              </button>
            </div>
            )
          }
          return null
        })}
      </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchName, SetNewSearchName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const checkExist = (element) => element.name === personObject.name

    if (persons.some(checkExist)) {
      setNewName('')
      alert(`${newName} is already added to phonebook`)
      console.log('on jo lisätty')
    } else {
      console.log('uusi nimi lisätty')
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        
    }
  }

  //2.14
  const removePersonContactInfo = (event) => {
    const id = Number(event.target.id);
    const name = event.target.name;
    const removeWarningMessage = `Delete ${name}?`;
    
    if (window.confirm(removeWarningMessage) === true) {
      personService
        .removeId(id)
        .then(()=> {
          console.log('Before delete:', persons)
          console.log('Deleting id:', id)
          
          setPersons(persons.filter((person) => person.id !==id))
          console.log('After delete:', persons)

        })
        /*.catch((error) => {
          alert(`The person '${name}' was already deleted from server`)
          setPersons(persons.filter((person) => person.id !== id))
        })*/
      
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

  

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    console.log('effect loppu')
  }, [])
  //console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearchName={newSearchName} handleSearchNameChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>debug search name: {newSearchName}</div>
      
      <Persons persons={persons} newSearchName={newSearchName} removePerson={removePersonContactInfo}/>

    </div>
  )
//<Persons persons={persons} newSearchName={newSearchName} removePerson={removePersonContactInfo}/>
}

export default App