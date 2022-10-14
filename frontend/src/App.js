//This is the main body

import { Container } from 'react-bootstrap' //installed using the console

import Header from './components/Header' //using <Header /> it will add the content from the component
import Footer from './components/Footer' //using <Footer /> it will add the content from the component

import HomeScreen from './screens/HomeScreen' //using <HomeScree /> it will add the content from the component

//it is equal to <body>
function App() {
  return (
    <div>
      <Header /> 

      <main className='py-3'>
        <Container>

            <HomeScreen />
            
        </Container> 
      </main>

      <Footer />
    </div>
  ) 
}

export default App;

