import React from 'react'
import Hero from './hero/Hero'
import AboutSection from './components/About'
import ServicesSection from './components/Services'
import BlogSection from './components/BlogSection'

import TestimonialsSection from './components/TestimonialsSection'
import ConsultationCTA from './components/ConsultationCTA'
import ExploreUs from './components/ExploreUs'
import Footer from './components/Footer'
import BottomNavbar from './components/BottomNavbar'
import ComplianceCenter from './components/Updatesection'

export default function Home() {
  return (
    <>

      <Hero />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <ComplianceCenter/>
      <TestimonialsSection />
      <ConsultationCTA />
      <ExploreUs />
      <Footer />
      <BottomNavbar />
    </>
  )
}
