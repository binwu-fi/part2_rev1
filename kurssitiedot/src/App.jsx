import Courses from './components/Course';

const Header = (props) => {
    const {courses} = props
    return (
    <div>
      { courses.map(part => {
        console.log("part sisältö", part.parts)
        const array1 = part.parts
        const initialValue = 0
        const sumWithInitial = array1.reduce(
          (accumulator, currentValue) => accumulator + currentValue.exercises,
          initialValue
        )
        console.log(sumWithInitial)
        return (
          <div key = {part.id}>
            <h2>{part.name}</h2>
            
            {part.parts.map(kurssi => {
              //console.log(kurssi)
              return (
                <div key = {kurssi.id}>
                  <p>{kurssi.name} {kurssi.exercises}</p>
                </div>
              )
            })}

            <h3>total of {sumWithInitial} exercises</h3>
          </div>
        )
      })}
    </div>
  )
}


const App = () => {
  const courses = Courses()

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header courses={courses} />
    </div>
  )
}

export default App


/*
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Java basic',
        exercises: 4,
        id: 4
      }
    ] 
  }

  const Course = () => {
    const Header = () => {
      return (
        <div>
          <h1>
            {course.name}
          </h1>
        </div>
      )
    }
    
    const Content = () => {
      const result = course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}<br></br></p>)
      const numbers = course.parts.map(part => part.exercises)
      let sum = 0; numbers.forEach(x => {sum += x})
      console.log('courses total amount', sum)
      //lukujen_summa = reduce(lambda summa, alkio: summa + alkio, lista, 0)
      let sumReduce = numbers.reduce((acc, x) => acc + x, 0)
      console.log('sum using Reduce', sumReduce)

      return (
        <div>{result}
        <b>total of {sumReduce} exercises</b>
        </div>
      )
    }
    console.log(course.name)
    return (
      <div>
        <Header />
        <Content />
      </div>
    )  
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
*/
