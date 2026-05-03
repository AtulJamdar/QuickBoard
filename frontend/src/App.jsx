import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateClass from './pages/CreateClass'
import ClassRoom from './pages/ClassRoom';


function App() {

  return (
    <>
      <Router>
        <Routes>
            {/* URL: "/" -> Shows Teacher Page */}
            <Route path='/' element={<CreateClass/>}/>

            {/* URL: "/class/xyz" -> Shows Student Page */}
            {/* ":classCode" is a variable the Classroom page will use */}
            <Route path='/class/:classCode' element={<ClassRoom/>}/>
        </Routes>
      </Router>
       
    </>
  )
}

export default App
