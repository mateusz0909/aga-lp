import { useState, useEffect } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, Phone, MapPin, ChevronDown } from 'lucide-react'
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
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedPainting, setSelectedPainting] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [showCountdown, setShowCountdown] = useState(false)

  // Birthday date: 24.09.2025 6AM CET
  let birthdayDate = new Date('2025-09-24T06:00:00+02:00') 
  // birthdayDate = new Date('2025-09-17T22:29:00+01:00') // 23:44 CET

  // Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const difference = birthdayDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeRemaining({ days, hours, minutes, seconds })
        setShowCountdown(true)
      } else {
        setShowCountdown(false)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const sectionNames = ['home', 'about', 'prace-header', 'prace-gallery1', 'prace-gallery2', 'contact']
  
  // Create menu items for navigation (combining prace sections into one menu item)
  const menuItems = [
    { name: 'home', label: 'Główna', sectionIndex: 0 },
    { name: 'about', label: 'O mnie', sectionIndex: 1 },
    { name: 'prace', label: 'prace', sectionIndex: 2 }, // Navigate to first prace section
    { name: 'contact', label: 'Kontakt', sectionIndex: 5 }
  ]

  const navigateToSection = (sectionIndex) => {
    if (window.fullpage_api) {
      window.fullpage_api.moveTo(sectionIndex + 1)
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="App">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigateToSection(0)}
          >
            <img src={signatureImage} alt="Agnieszka Byrtus" className="h-8" />
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateToSection(item.sectionIndex)}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 hover:text-gray-600 cursor-pointer ${
                  (item.name === 'prace' && (currentSection >= 2 && currentSection <= 4)) ||
                  (item.name !== 'prace' && currentSection === item.sectionIndex) 
                    ? 'text-black font-medium' : 'text-gray-400'
                }`}
              >
                {item.label}
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
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigateToSection(item.sectionIndex)}
                    className="block text-xs uppercase tracking-wider text-gray-700 hover:text-black cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ReactFullpage Implementation */}
      <ReactFullpage
        licenseKey={'gplv3-license'}
        scrollingSpeed={1000}
        navigation={false}
        scrollBar={false}
        scrollOverflow={true}
        touchSensitivity={15}
        normalScrollElementTouchThreshold={5}
        keyboardScrolling={true}
        animateAnchor={false}
        recordHistory={false}
        // touchWrapper={true}
        bigSectionsDestination={'top'}
        responsiveWidth={0}
        responsiveHeight={0}
        onLeave={(origin, destination) => {
          setCurrentSection(destination.index)
        }}
        render={({ state, fullpageApi }) => {
          // Store fullpageApi globally for navigation
          if (fullpageApi) {
            window.fullpage_api = fullpageApi
          }
          
          return (
            <ReactFullpage.Wrapper>
              {/* Hero Section */}
              <div className="section">
                <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
                      <p className="text-2xl md:text-lg lg:text-2xl text-gray-600 mb-12 pt-8 font-light tracking-wide uppercase">
                        ślady istnienia
                      </p>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          onClick={() => navigateToSection(2)}
                          variant="outline"
                          className="animated-button border-black text-black cursor-pointer rounded-none text-xs uppercase tracking-wider px-16 py-3 relative overflow-hidden"
                        >
                          <span className="relative z-10">Zobacz prace</span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="section">
                <div className="py-32 px-6 bg-gray-50 min-h-screen flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-gray-100/30"></div>
                  
                  <div className="max-w-6xl mx-auto w-full relative z-10">
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

                      {/* Photo */}
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

                      {/* Text content */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 w-full"
                      >
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
                            W moich pracach często przewija się temat przemijania, pamięci i śladów, które pozostawiamy po sobie. 
                            Każdy obraz to dla mnie próba uchwycenia ulotnej chwili, zapisania emocji w formie, która przetrwa dłużej niż słowa.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            Inspirację czerpię z codzienności, z obserwacji ludzi i ich reakcji na świat. Interesuje mnie to, co kryje się pod powierzchnią – 
                            niewidoczne napięcia, ukryte emocje, cichy dramat egzystencji.
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prace Header Section */}
              <div className="section">
                <div className="py-32 px-6 bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/50"></div>
                  
                  <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-wide">
                        prace
                      </h2>
                      <p className="text-gray-600 max-w-3xl mx-auto text-sm mb-16">
                        Świat, w którym forma staje się językiem duszy. Każdy obraz to zapisana emocja, ślad ciszy, szept istnienia.
                      </p>
                      
                      {/* Scroll Down Indicator */}
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => navigateToSection(3)} // Navigate to first gallery
                      >
                        <span className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                          Przewijaj w dół
                        </span>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* First Gallery Section */}
              <div className="section">
                <div className="py-32 px-6 bg-gray-50 min-h-screen flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-gray-100/30"></div>
                  
                  <div className="max-w-7xl mx-auto w-full relative z-10">
                    {/* Portfolio Grid - First 3 paintings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                      {paintings.slice(0, 3).map((painting, index) => (
                        <motion.div
                          key={painting.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  </div>
                </div>
              </div>

              {/* Second Gallery Section */}
              <div className="section">
                <div className="py-32 px-6 bg-white min-h-screen flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/50"></div>
                  
                  <div className="max-w-7xl mx-auto w-full relative z-10">
                    {/* Portfolio Grid - Last 3 paintings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                      {paintings.slice(3, 6).map((painting, index) => (
                        <motion.div
                          key={painting.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="section">
                <div className="py-16 md:py-24 lg:py-32 px-6 bg-gray-50 min-h-screen flex items-start md:items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-gray-100/30"></div>

                  <div className="max-w-4xl mx-auto w-full relative z-10 pt-16 md:pt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-12 md:mb-16 tracking-wide">
                        kontakt
                      </h2>
<p className="text-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto text-sm leading-relaxed">
              Jeśli któraś z moich prac poruszyła Cię – napisz do mnie. 
              <br />
              Chętnie opowiem więcej o swojej twórczości lub porozmawiam o możliwościach współpracy.
              <br />
              Sztuka żyje w relacji z odbiorcą, który nadaje moim pracom ostateczny sens.
            </p>
                      <div className="space-y-2 md:text-center mb-8 md:mb-12">
                        
                        <div className="flex items-center justify-center gap-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700 text-sm">agnieszka@byrtus.pl</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-3">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700 text-sm">+48 123 456 789</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700 text-sm">Warszawa, Polska</span>
                        </div>
                      </div>
                      
                      
                    </motion.div>
                  </div>
                </div>
              </div>
            </ReactFullpage.Wrapper>
          )
        }}
      />

      {/* Painting Modal */}
      <AnimatePresence>
        {selectedPainting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPainting(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPainting(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img 
                    src={selectedPainting.image} 
                    alt={selectedPainting.title}
                    className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
                  />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-light mb-4 uppercase tracking-wide">
                    {selectedPainting.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedPainting.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p><span className="font-medium">Wymiary:</span> {selectedPainting.dimensions}</p>
                    <p><span className="font-medium">Technika:</span> {selectedPainting.technique}</p>
                    <p><span className="font-medium">Rok:</span> {selectedPainting.year}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birthday Countdown Overlay */}
      <AnimatePresence>
        {showCountdown && timeRemaining && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/99 flex items-center justify-center z-[100] backdrop-blur-sm"
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-12"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide">
                  Prezent czeka...
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-2">
                  Ten wyjątkowy dar będzie można rozpakować już niebawem.
                </p>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  Świat kolorów i emocji śpi w ciszy, czekając na swój moment ujawnienia.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12 mb-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="text-center">
                    <motion.div
                      key={timeRemaining.days}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-2"
                    >
                      {timeRemaining.days}
                    </motion.div>
                    <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                      dni
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      key={timeRemaining.hours}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-2"
                    >
                      {timeRemaining.hours}
                    </motion.div>
                    <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                      godzin
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      key={timeRemaining.minutes}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-2"
                    >
                      {timeRemaining.minutes}
                    </motion.div>
                    <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                      minut
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      key={timeRemaining.seconds}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-2"
                    >
                      {timeRemaining.seconds}
                    </motion.div>
                    <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                      sekund
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-center"
              >
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider mb-4">
                  Premiera 24 września 2025, 6:00 CET
                </p>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App