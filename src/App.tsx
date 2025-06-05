import Header from "./layout/header.tsx"
import Body from "./layout/body.tsx"
import Footer from "./layout/footer.tsx"

import './App.css'

function App() {

  return (
    <>
      <div className='Container'>
        <Header />
        <Body />
        <Footer />

      </div>
    </>
  )
}

export default App