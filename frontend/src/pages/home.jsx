import React from 'react'
import Herosection from '../components/Herosection'
import Craft from '../components/Craft'
import About from '../components/About'
import CodeEditor from '../components/Code.block'

const Home = () => {
  return (
    <div>
      <Herosection />
      <About />
      <Craft />
      {/* <CodeEditor/> */}
    </div>
  )
}

export default Home