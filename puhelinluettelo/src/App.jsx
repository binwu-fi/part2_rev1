import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  console.log("newSearchName: ", props.newSearchName);
  return (
    <div>
      filter shown with:{" "}
      <input
        value={props.newSearchName}
        onChange={props.handleSearchNameChange}
      />
    </div>
  );
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

const Persons = ({ persons, removePersonContactInfo}) => {
  const personElements = persons.map((element) => {
    return (
      <Person
      key={element.id}
      person={element}
      removePersonContactInfo={removePersonContactInfo}
      />
    )
  })
  return <div>{personElements}</div>
}

const Person = ({ person, removePersonContactInfo }) => {
  return (
    <div>
      {`${person.name} ${person.number} `} 
      <button
        name={person.name}
        id={person.id}
        onClick={removePersonContactInfo}
      >
        delete
      </button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchName, setNewSearchName] = useState('')

  //for 2.16
  const [notificationMessage, setNotificationMessage] = useState(null)
  
  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    
    return (
      <div className={message.type === "error" ? "error" : "notification"}>
        {message.text}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const checkExist = (element) => element.name === personObject.name
    
    const existMessage = `${newName} is already added to phonebook, replace the old number with a new one?`
    const existPerson = persons.find((element) => element.name === newName)

    if (persons.some(checkExist)) {
      if (window.confirm(existMessage) === true) {
        personService
          .update(existPerson.id, personObject)
          .then((returnedPerson) => {
            //below code for 2.16
            setNotificationMessage({
              text: `${returnedPerson.name} information is updated !`,
              type: "notification",
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);

            setPersons(
              persons.map((unit) =>
                unit.id !== existPerson.id ? unit : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setNotificationMessage({
          text: `${returnedPerson.name} information added !`,
          type: "notification",
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  }

  const removePersonContactInfo = (event) => {
    console.log("do something: ", Number(event.target.id));
    const id = Number(event.target.id);
    const name = event.target.name;
    const removeWarningMessage = `Delete ${name}?`;
    
    if (window.confirm(removeWarningMessage) === true) {
      personService
        .removeId(id)
        .then(() => {
          //unit.id change to Number(unit.id)
          setPersons(persons.filter((unit) => Number(unit.id) !== id));
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
    setNewSearchName(event.target.value)
  }


  const personsToShow =
    newSearchName.length === 0
      ? persons
      : persons.filter((person) => person.name.search(newSearchName) >= 0)
    

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
      {notificationMessage !== null ? (
        <Notification message={notificationMessage} />
      ) : null}
      <Filter 
        newSearchName={newSearchName} 
        handleSearchNameChange={handleSearchNameChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
        
      />
      <h2>Numbers</h2>
      <div>debug search name: {newSearchName}</div>
      
      <Persons 
        persons={personsToShow} 
        removePersonContactInfo={(element) => removePersonContactInfo(element)}
        
      />

    </div>
  )}

export default App