import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// Import images
import signatureImage from './assets/signature.png'
import logoImage from './assets/logo.png'
import authorPhoto from './assets/author_photo.jpeg'
import painting1 from './assets/painting1.png'
import painting2 from './assets/painting2.png'
import painting3 from './assets/painting3.png'
import painting4 from './assets/painting4.png'
import painting5 from './assets/painting5.png'
import painting6 from './assets/painting6.png'

const paintings = [
  {
    id: 1,
    title: "Głębia Ciszy",
    image: painting1,
    description: "Ten minimalistyczny obraz w odcieniach czerni i szarości zaprasza do introspekcji. Fakturowana powierzchnia, przypominająca subtelne pęknięcia lub zarysowania, symbolizuje wewnętrzne zmagania i poszukiwanie spokoju w głębi własnego ja. Jest to wizualna medytacja nad pustką i pełnią, nad tym, co niewypowiedziane, a jednak odczuwalne.",
    dimensions: "140 x 120 x 7 cm",
    technique: "Akryl na płótnie",
    year: "2025"
  },
  {
    id: 2,
    title: "Echa Duszy",
    image: painting2,
    description: "Intensywne barwy, takie jak czerwień, żółć i błękit, wyłaniające się z ciemnego tła, tworzą portret wewnętrznego krajobrazu. Obraz ten, choć abstrakcyjny, zdaje się przedstawiać twarz lub postać, której emocje są surowe i pierwotne. To eksploracja głębokich uczuć, które kształtują naszą tożsamość, echa duszy odbijające się w kolorze i formie.",
    dimensions: "100 x 80 x 5 cm",
    technique: "Akryl na płótnie",
    year: "2024"
  },
  {
    id: 3,
    title: "Więź Niewidzialna",
    image: painting3,
    description: "Ciemna, niemal aksamitna powierzchnia obrazu jest przecięta delikatnymi, organicznymi liniami, które zdają się płynąć i łączyć. Te subtelne formy symbolizują niewidzialne więzi, które łączą nas z innymi ludźmi, naturą i wszechświatem. To przypomnienie o wzajemnych zależnościach i delikatności relacji, które, choć niewidoczne, są fundamentalne.",
    dimensions: "120 x 120 x 6 cm",
    technique: "Akryl na płótnie",
    year: "2025"
  },
  {
    id: 4,
    title: "Szept Formy",
    image: painting4,
    description: "Jasna, eteryczna kompozycja, w której delikatne fałdy i załamania tworzą iluzję ruchu i głębi. Obraz ten, utrzymany w bieli i subtelnych szarościach, jest niczym szept, który ujawnia piękno w prostocie i ulotności. To hołd dla minimalizmu, gdzie forma sama w sobie staje się nośnikiem znaczenia, zapraszając do kontemplacji nad efemerycznością istnienia.",
    dimensions: "90 x 70 x 4 cm",
    technique: "Akryl na płótnie",
    year: "2024"
  },
  {
    id: 5,
    title: "Sedno",
    image: painting5,
    description: "Białe, fakturowane tło, z którego wyłania się subtelny, centralny punkt. Ten obraz to medytacja nad esencją, rdzeniem bytu i wewnętrznym światłem. Symbolizuje odnalezienie sedna, istoty rzeczy, zapraszając do skupienia na tym, co fundamentalne i prawdziwe.",
    dimensions: "80 x 80 x 5 cm",
    technique: "Akryl na płótnie",
    year: "2025"
  },
  {
    id: 6,
    title: "Przepływ Istnienia",
    image: painting6,
    description: "Dynamiczne, organiczne kształty w odcieniach czerni, zdające się unosić i wirować na powierzchni. Obraz ten oddaje ideę ciągłego przepływu i transformacji, które są nieodłączną częścią życia. Fakturowane linie symbolizują energię, ruch i złożoność istnienia, przypominając o nieustannej zmianie i ewolucji.",
    dimensions: "110 x 130 x 6 cm",
    technique: "Akryl na płótnie",
    year: "2024"
  }
]

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to determine which section is currently in view
  const getCurrentSection = () => {
    const sections = ['home', 'prace', 'about', 'contact']
    const scrollPosition = window.scrollY + window.innerHeight / 2
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i])
      if (section && section.offsetTop <= scrollPosition) {
        return sections[i]
      }
    }
    return 'home'
  }

  // Scroll event listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const section = getCurrentSection()
      if (section !== currentSection) {
        setCurrentSection(section)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Set initial section on mount
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentSection])

  const scrollToSection = (section) => {
    setCurrentSection(section)
    setIsMenuOpen(false)
    
    const targetElement = document.getElementById(section)
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black scroll-smooth" style={{scrollSnapType: 'y mandatory'}}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
          >
            <img src={signatureImage} alt="Agnieszka Byrtus" className="h-8" />
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'prace', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 hover:text-gray-600 ${
                  currentSection === section ? 'text-black font-medium' : 'text-gray-400'
                }`}
              >
                {section === 'home' ? 'Główna' : 
                 section === 'prace' ? 'prace' :
                 section === 'about' ? 'O mnie' : 'Kontakt'}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-6 py-4 space-y-4">
                {['home', 'prace', 'about', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block text-xs uppercase tracking-wider text-gray-700 hover:text-black"
                  >
                    {section === 'home' ? 'Główna' : 
                     section === 'prace' ? 'prace' :
                     section === 'about' ? 'O mnie' : 'Kontakt'}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden snap-start">
        {/* Background element */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-gray-100/20"></div>
        
        <div className="text-center max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <img 
                src={logoImage} 
                alt="Agnieszka Byrtus" 
                className="h-32 sm:h-48 md:h-56 lg:h-70 mx-auto mb-8 sm:mb-10 md:mb-12 max-w-full object-contain" 
              />
            </div>
            <h1 className="text-5xl md:text-5xl lg:text-[8rem] font-light spacing-tight mb-8  leading-none tracking-normal">
              agnieszka 
              <br />
              byrtus
            </h1>
            <p className="text-2xl md:text-lg lg:text-2xl text-gray-600 mb-12 pt-16 font-light tracking-wide uppercase">
              ślady istnienia
            </p>
            <motion.div
              // whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => scrollToSection('prace')}
                variant="outline"
                className="animated-button border-black text-black cursor-pointer rounded-none text-xs uppercase tracking-wider px-16 py-3 relative overflow-hidden"
              >
                <span className="relative z-10">Zobacz prace</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* prace Section - Introduction */}
      <section id="prace" className="min-h-screen py-20 px-6 flex items-center relative snap-start">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/20 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-wide">
              prace
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm mb-12">
              Świat, w którym forma staje się językiem duszy. Każdy obraz to zapisana emocja, ślad ciszy, szept istnienia.
            </p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Przewiń w dół aby zobaczyć prace
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Page 1 - Paintings 1-3 */}
      <section className="min-h-screen py-20 px-6 flex items-center relative snap-start">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {paintings.slice(0, 3).map((painting, index) => (
              <motion.div
                key={painting.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedPainting(painting)}
            
                  
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                  <img 
                    src={painting.image} 
                    alt={painting.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <h3 className="text-md uppercase font-medium mt-4 mb-2 tracking-wide">{painting.title}</h3>
                <p className="text-gray-600 text-xs line-clamp-2">{painting.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              1 / 2 — Przewiń dalej
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Page 2 - Paintings 4-6 */}
      <section className="min-h-screen py-20 px-6 flex items-center relative bg-gray-50/30 snap-start">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {paintings.slice(3, 6).map((painting, index) => (
              <motion.div
                key={painting.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedPainting(painting)}
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                  <img 
                    src={painting.image} 
                    alt={painting.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <h3 className="text-md uppercase font-medium mt-4 mb-2 tracking-wide">{painting.title}</h3>
                <p className="text-gray-600 text-xs line-clamp-2">{painting.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              2 / 2 
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gray-50 min-h-screen flex items-center relative overflow-hidden snap-start">
        {/* Background element */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-gray-100/30"></div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Mobile-first layout: flex-col, then lg:grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Heading - Always first on mobile */}
            <div className="w-full lg:hidden text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-light mb-8 tracking-wide"
              >
                o mnie
              </motion.h2>
            </div>

            {/* Photo - Second on mobile, second column on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2 w-full"
              
            >
              <img 
                src={authorPhoto} 
                alt="Agnieszka Byrtus" 
                className="w-full h-auto shadow-lg max-w-md mx-auto lg:max-w-none"
                
              />
            </motion.div>

            {/* Text content - Third on mobile, first column on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 w-full"
            >
              {/* Desktop heading - hidden on mobile */}
              <h2 className="hidden lg:block text-6xl md:text-7xl font-light mb-8 tracking-wide">
                o mnie
              </h2>
              
              <div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  Płótno jest dla mnie przestrzenią ciszy, w której szukam dialogu z tym, co niewyrażalne. Moja twórczość rodzi się z potrzeby introspekcji i zatrzymania się nad fundamentalnymi pytaniami o ludzką egzystencję. 
                  Mieszkam i tworzę w Warszawie. Jestem osobą niezwykle wrażliwą i głęboko myślącą, 
                  co znajduje odzwierciedlenie w mojej sztuce.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                 Poprzez subtelną formę i monochromatyczną paletę barw opowiadam o niewidzialnych więziach, które nas łączą. Biel i czerń stają się nośnikami niedokończonych interpretacji, pozwalając, by to Twoja wrażliwość dopowiedziała resztę historii. 
                 
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Każdy obraz to zaproszenie nie tyle do oglądania, co do odczuwania. To próba dotknięcia tego, co w nas najgłębsze i najbardziej autentyczne.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 px-6 bg-gray-50 min-h-screen flex items-start md:items-center justify-center relative overflow-hidden snap-start">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-gray-100/30"></div>

        <div className="max-w-4xl mx-auto text-center w-full relative pt-8 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 tracking-wide">
              kontakt
            </h2>
            <p className="text-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto text-sm leading-relaxed">
              Jeśli któraś z moich prac poruszyła Cię – napisz do mnie. 
              <br />
              Chętnie opowiem więcej o swojej twórczości lub porozmawiam o możliwościach współpracy.
              <br />
              Sztuka żyje w relacji z odbiorcą, który nadaje moim pracom ostateczny sens.
            </p>
            <div className="space-y-4 md:space-y-6">
              <p className="text-md">
                <b>email:</b> agnieszka.byrtus@art.com
              </p>
              <p className="text-md">
                <b>lokalizacja:</b> Warszawa, Polska
              </p>
              <div className="flex justify-center space-x-8 mt-8 md:mt-12 pb-4">
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm uppercase tracking-wider">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm uppercase tracking-wider">
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Painting Modal */}
      <AnimatePresence>
        {selectedPainting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
            onClick={() => setSelectedPainting(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl font-light tracking-wide">{selectedPainting.title}</h3>
                  <button
                    onClick={() => setSelectedPainting(null)}
                    className="text-gray-500 hover:text-black"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <img 
                    src={selectedPainting.image} 
                    alt={selectedPainting.title}
                    className="w-full h-auto"
                  />
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {selectedPainting.description}
                    </p>
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs uppercase tracking-wider text-gray-500">Wymiary:</span>
                        <span className="text-sm font-medium">{selectedPainting.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs uppercase tracking-wider text-gray-500">Technika:</span>
                        <span className="text-sm font-medium">{selectedPainting.technique}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs uppercase tracking-wider text-gray-500">Rok:</span>
                        <span className="text-sm font-medium">{selectedPainting.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

