import Herosection from '../components/Herosection'
import Craft from '../components/Craft'
import About from '../components/About'
import Services from '../components/Services'
import ContactUs from '../components/Contact.us'

const Home = () => {
  return (
    <div>
      <Herosection />
      <About />
      <Craft />
      <Services />
      <ContactUs />
    </div>
  )
}

export default Home