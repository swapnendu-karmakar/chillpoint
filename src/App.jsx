import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesStrip from './components/FeaturesStrip'
import About from './components/About'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''))
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 70 // Offset for sticky navbar
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 500) // Wait for layout settling on mobile
    }
  }, [])

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
