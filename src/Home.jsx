import React from 'react'
import Hero from './hero/Hero'
import AboutSection from './components/About'
import ServicesSection from './components/Services'
import BlogSection from './components/BlogSection'
import ComplianceSection from './components/Updatesection'
import TestimonialsSection from './components/TestimonialsSection'
import ConsultationCTA from './components/ConsultationCTA'
import ExploreUs from './components/ExploreUs'
import Footer from './components/Footer'
import BottomNavbar from './components/BottomNavbar'

export default function Home() {
  return (
    <>
    <BottomNavbar/>
    <Hero/>
    <AboutSection/>
    <ServicesSection/>
    <BlogSection/>
    <ComplianceSection/>
    <TestimonialsSection/>
    <ConsultationCTA/>
    <ExploreUs/>
    <Footer/>
    </>
  )
}
