import HeroSection        from './sections/HeroSection'
import ProblemSection     from './sections/ProblemSection'
import WhatWeCheckSection from './sections/WhatWeCheckSection'
import HowItWorksSection  from './sections/HowItWorksSection'
import WhyJojoSection     from './sections/WhyJojoSection'
import LeadFormSection    from './sections/LeadFormSection'

export default function App() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WhatWeCheckSection />
      <HowItWorksSection />
      <WhyJojoSection />
      <LeadFormSection />

      <footer className="page-footer">
        © {new Date().getFullYear()} JOJO Digital · כל הזכויות שמורות
      </footer>
    </>
  )
}
