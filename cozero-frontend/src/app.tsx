import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../configs/theme'
import Layout from '../layouts/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '.'
import ProjectsList from "../components/projects/ProjectsList"
import LoginPage from './login'
import CreateProjectPage from './projects/create'
import { ProjectViewPage } from './projects/view'
import { Auth, AuthContext, AuthContextType } from '../context/auth'
import { useState } from 'react'
import ProjectsRecycleBin from '../components/projects/ProjectsRecycleBin';
function App() {
  const [context, setContext] = useState<Auth>()

  const contextValue: AuthContextType = {
    context,
    setContext
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsList />} />
              <Route path="/recycle-bin" element={<ProjectsRecycleBin />} />
              <Route path='/sign-up' element={<LoginPage isSignUp={true} />} />
              <Route path='/sign-in' element={<LoginPage isSignUp={false} />} />
              <Route path='/projects/create' element={<CreateProjectPage />} />
              <Route path='/projects/:id' element={<ProjectViewPage />} />
              <Route path='/projects/:id/edit' element={<CreateProjectPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </AuthContext.Provider>
  )
}

export default App
