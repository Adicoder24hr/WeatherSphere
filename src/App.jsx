import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Historical from "./pages/Historical"
import Layout from "./components/Layout"


function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout><Dashboard/></Layout>}/>
      <Route path="/historical" element={<Layout><Historical/></Layout>}/>
    </Routes>
  )
}

export default App
