import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesStrip from './components/FeaturesStrip'
import About from './components/About'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <Hero />
      <FeaturesStrip />
      <About />
      <Menu />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  )
}
