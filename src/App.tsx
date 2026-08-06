import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X, Puzzle, Coffee, HeartHandshake, ArrowRight, Instagram, Facebook, Mail, MapPin, Phone, Quote, ChevronLeft, ChevronRight, Moon, Sun, Calculator, Check, Sparkles, HelpCircle, Gift, BookOpen, Clock } from 'lucide-react';

// Brand colors and layout alignment constants
const testimonials = [
  {
    id: 1,
    text: "Jedina igraonica iz koje ne izađem s glavoboljom. Estetika je predivna, teta Tea je divna, a moj sin je napokon fokusiran na igru bez agresivnih ekrana.",
    author: "Maja T.",
    role: "Mama 4-godišnjaka"
  },
  {
    id: 2,
    text: "Prava je rijetkost naći mjesto gdje se dijete zbilja razvija dok se igra. Drvene igračke, senzorni elementi i mirna atmosfera su pun pogodak.",
    author: "Ivan M.",
    role: "Tata 3-godišnjakinje"
  },
  {
    id: 3,
    text: "Proslava rođendana je bila apsolutno savršena. Bez stresa za nas roditelje, bez kaosa, samo čista radost i predivni, pomno birani detalji.",
    author: "Jelena K.",
    role: "Mama 5-godišnjaka"
  }
];

const faqs = [
  {
    question: "Što točno znači 'guilt-free' igraonica?",
    answer: "To znači da dok se vaše dijete igra u sigurnom, poticajnom okruženju pod nadzorom stručnih edukatora, vi možete raditi, čitati ili popiti kavu u našoj odvojenoj lounge zoni bez osjećaja grižnje savjesti. Dijete se razvija kroz stručno vođenu igru, a vi dobivate zasluženi mir."
  },
  {
    question: "Je li prostor prikladan za djecu svih uzrasta?",
    answer: "Naš prostor je primarno dizajniran i opremljen za djecu od 1 do 7 godina. Sve igračke i oprema su pažljivo odabrani u suradnji s dječjim terapeutima, s posebnim naglaskom na drvene i senzorne elemente."
  },
  {
    question: "Moram li unaprijed rezervirati dolazak za slobodnu igru?",
    answer: "Zbog ograničenog kapaciteta i želje da osiguramo mirnu atmosferu bez prenatrpanosti i buke, preporučujemo kratku najavu putem aplikacije ili telefona, iako su spontani dolasci uvijek dobrodošli ako imamo slobodnih mjesta."
  },
  {
    question: "Kako integrirate Montessori pedagogiju?",
    answer: "Montessori pristup integriramo kroz slobodan pristup igračkama koje su raspoređene na dječjoj visini, poticanje samostalnosti u odlučivanju o tijeku igre, te kroz materijale koji imaju 'kontrolu pogreške' – dijete samo uočava i ispravlja nesavršenosti bez stalnog uplitanja odraslih."
  },
  {
    question: "Je li vaš prostor siguran za bebe koje tek uče puzati i hodati (za proslavu 1. rođendana)?",
    answer: "Apsolutno! Proslave 1. i 2. rođendana su naša posebna specijalnost u Puli. Naša Soft Play zona obložena je mekanim strunjačama i nema oštrih rubova. Budući da je cijeli prostor zatvoren isključivo za vašu proslavu, nema straha da će veća djeca slučajno srušiti ili prestrašiti vaše najmlađe slavljenike i njihove goste."
  },
  {
    question: "Mogu li kao roditelj ponijeti laptop i raditi dok se dijete igra?",
    answer: "Naravno! EduPlay je zamišljen kao oaza za cijelu obitelj. Naš udobni roditeljski lounge nudi brzi Wi-Fi, utičnice i vrhunsku premium kavu. Možete u potpunom miru odraditi sastanak, odgovoriti na mailove ili jednostavno predahnuti, dok kroz otvoreni prostor cijelo vrijeme imate dijete na oku."
  },
  {
    question: "Puštate li djeci crtiće, videoigre i glasnu glazbu tijekom rođendana?",
    answer: "Ne, EduPlay je ponosna \"zona bez ekrana\". Vjerujemo u pametnu, senzornu igru koja razvija dječji mozak. Umjesto gledanja u ekran, naši edukatori vode djecu kroz maštovitu igru uloga (Mini Play City), motoričke poligone i kreativne radionice, uz tihu, umirujuću pozadinsku glazbu."
  },
  {
    question: "Moje dijete uvijek plače i ima \"tantrume\" kada treba ići kući s rođendana. Kako to rješavate?",
    answer: "Znamo taj osjećaj! Klasične igraonice često prestimuliraju djecu (tzv. \"dopaminski dump\"). Zato naš rođendan završava u posebnom Snoezelen senzornom šatoru. Tamo se djeca prije polaska kući opuštaju uz prigušena svjetla i umirujuće elemente, što osigurava miran povratak kući, bez suza i stresa."
  },
  {
    question: "Trebamo li mi donositi dekoracije, balone i tematske ukrase za stol?",
    answer: "Nema potrebe za dodatnim stresom, mi smo tu da vas rasteretimo! Naš prostor sam po sebi odiše predivnim, smirujućim nordijskim dizajnom (boje drveta i pastelnih tonova). U našim premium paketima uključena je predivna postava stola koja se savršeno uklapa u našu estetiku, a na vama je samo da ponesete dobro raspoloženje."
  },
  {
    question: "Kako funkcionira hrana i tko donosi tortu?",
    answer: "U sklopu naših paketa osiguravamo grickalice, prirodne sokove i vodu za male goste. Tortu donosite vi (kako biste imali slobodu odabira omiljene slastičarnice i točnog okusa). Za roditelje gostiju koji ostaju s vama, naš kafić je otvoren te poslužujemo vrhunsku kavu i napitke."
  },
  {
    question: "Koja su pravila ponašanja i higijene pri ulasku u EduPlay?",
    answer: "Čistoća nam je apsolutni prioritet, posebno zbog beba i puzalica. Pravilo za sve (i djecu i odrasle!) je da u prostor za igru i lounge ulaze isključivo u čistim čarapicama ili kućnim papučama."
  },
  {
    question: "Moraju li roditelji gostiju ostati s djecom tijekom rođendana?",
    answer: "To ovisi o dobi djece. Za jaslički uzrast (1 do 3 godine) preporučujemo da roditelji ostanu prisutni kako bi se djeca osjećala sigurno. Za stariju djecu roditelji ih mogu ostaviti pod nadzorom naših stručnih edukatora. U oba slučaja, svi roditelji koji žele ostati više su nego dobrodošli uživati u našem loungeu!"
  },
  {
    question: "Koliko unaprijed moramo rezervirati termin za rođendan?",
    answer: "Budući da su EduPlay rođendani 100% zatvorenog i privatnog tipa, naš kapacitet termina mjesečno je strogo ograničen. Kako biste osigurali željeni datum i vrijeme (posebno za vikende), preporučujemo da nas kontaktirate barem 4 do 6 tjedana unaprijed."
  },
  {
    question: "Mogu li starija djeca (npr. 6-7 godina) također slaviti rođendan kod vas? Nude li se posebne teme?",
    answer: "Da! Iako smo najpoznatiji kao najsigurnija oaza za mlađu djecu, naši tematski paketi sjajno su prilagođeni i za predškolce. Za stariju djecu naši animatori organiziraju vođene tematske avanture poput \"Malih istraživača\" ili \"Šumskog kampa\" s kreativnim edukativnim radionicama."
  }
];

const developmentalToys = [
  {
    id: 'puzzles',
    name: 'PLAY CITY',
    color: 'bg-edu-terracotta/10 text-edu-terracotta border-edu-terracotta/20',
    milestones: 'Fina motorika, rješavanje prostornih problema, koordinacija oko-ruka.',
    desc: 'kućice izrađene od kvalitetnog drva te obojane pomno odabranim bojama na bazi vode posložene u mali grad gdje djeca mogu biti ono što požele. Kroz simboličku igru i igru uloga djeca se zbližavaju, surađuju te stječu nove vještine.'
  },
  {
    id: 'sensory',
    name: 'SENZORNI STOLOVI',
    color: 'bg-edu-blue/15 text-edu-blue border-edu-blue/25',
    milestones: 'Fina motorika, istraživanje, razvoj svih senzornih osjetila.',
    desc: 'Senzorni stolovi sa različitim prirodnim bazama te različitim teksturama koje se mijenjaju na dnevnoj bazi. Potičemo djecu da istražuju, dodiruju i igraju se, a ne brinemo oko nereda koji se pritom stvara.'
  },
  {
    id: 'blocks',
    name: 'BOOK CORNER',
    color: 'bg-edu-sage/15 text-edu-sage border-edu-sage/25',
    milestones: 'Razvoj govora, jezika, razumijevanja, rano čitanje.',
    desc: 'Naš čitalački kutak gdje roditelji i djeca mogu pronaći slikovnice poredane po dobi. Na gornjim policama roditelji mogu pronaći stručnu literaturu o različitim odgojnim principima, razvoju govora, slušanja, motorike i ostalo.'
  },
  {
    id: 'tactile',
    name: 'UMIRUJUĆI ŠATOR',
    color: 'bg-edu-lavender/15 text-edu-lavender border-edu-lavender/25',
    milestones: 'Umirivanje živčanog sustava, regulacija emocija, opuštanje.',
    desc: 'Zatamnjeni šator sa projektorom zvjezdanog neba, glazbom i optičkim nitima. Sjednite sa djetetom, odmorite na mekanim jastucima, umirite se te napustite igraonicu malo mirniji nego što ste došli.'
  }
];

// Reusable custom visual Brand Logo component
function BrandLogo({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="flex items-center select-none group cursor-pointer">
      <img src="/Eduplaylogo1.png" alt="Eduplay" className={`h-12 w-auto object-contain ${isDarkMode ? 'brightness-0 invert' : ''}`} />
    </div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeToyTab, setActiveToyTab] = useState('puzzles');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const philosophyScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const scrollPhilosophy = (direction: 'left' | 'right') => {
    if (philosophyScrollRef.current) {
      const { clientWidth } = philosophyScrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      philosophyScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesScrollRef.current) {
      const { clientWidth } = servicesScrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      servicesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Pricing calculator state
  const [calcService, setCalcService] = useState<'rođendani' | 'slobodna_igra' | 'radionice'>('rođendani');
  const [birthdayChildren, setBirthdayChildren] = useState<number>(5);
  const [playHours, setPlayHours] = useState<number>(2);
  const [playChildren, setPlayChildren] = useState<number>(1);
  const [addonFacepaint, setAddonFacepaint] = useState(false);
  const [addonCatering, setAddonCatering] = useState(false);
  const [addonGift, setAddonGift] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculate pricing nicely
  const calculateTotal = () => {
    if (calcService === 'rođendani') {
      let base = 140;
      if (birthdayChildren <= 5) base = 140;
      else if (birthdayChildren <= 10) base = 170;
      else if (birthdayChildren <= 15) base = 200;
      else if (birthdayChildren <= 20) base = 230;
      else if (birthdayChildren <= 25) base = 260;
      else base = 260 + (birthdayChildren - 25) * 10;
      
      if (addonFacepaint) base += 30;
      if (addonCatering) base += 50;
      if (addonGift) base += 25;
      return base;
    } else if (calcService === 'slobodna_igra') {
      if (playChildren === 1) {
        if (playHours === 1) return 8;
        if (playHours === 2) return 15;
        if (playHours === 3) return 20;
      } else if (playChildren === 2) {
        if (playHours === 1) return 13;
        if (playHours === 2) return 25;
        if (playHours === 3) return 35;
      }
      return 8;
    } else {
      // average workshop pass/session
      return 60;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-edu-gold selection:text-edu-cream transition-colors duration-300">
      
      {/* Sticky Header with Brand Logo and theme toggler */}
      <header className="sticky top-0 z-50 bg-nordic-bg/90 backdrop-blur-md border-b border-nordic-border transition-colors duration-300">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-nordic-accent origin-left z-50"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Branded interactive Logo */}
            <Link to="/" className="flex items-center">
              <BrandLogo isDarkMode={isDarkMode} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-center">
              <a href="#toy-guide" className="text-sm font-medium text-nordic-text hover:text-edu-gold transition-colors">Razvojne Igračke</a>
              <a href="#services" className="text-sm font-medium text-nordic-text hover:text-edu-gold transition-colors">Usluge</a>
              <a href="#about" className="text-sm font-medium text-nordic-text hover:text-edu-gold transition-colors">O nama</a>
              <a href="#contact" className="text-sm font-medium text-nordic-text hover:text-edu-gold transition-colors">Kontakt</a>
              <a href="/kucni-red.html" className="text-sm font-medium text-nordic-text hover:text-edu-gold transition-colors">Kućni red</a>
              <a href="/cesta-pitanja.html" className="text-sm font-medium text-nordic-text hover:text-edu-gold transition-colors">Česta pitanja</a>
            </nav>

            {/* Control actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-nordic-heading hover:text-edu-gold transition-colors p-2.5 rounded-full bg-nordic-card border border-nordic-border shadow-sm hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                title={isDarkMode ? "Light Mode" : "Soft Dark Mode"}
              >
                {isDarkMode ? <Sun size={18} className="text-orange-300" /> : <Moon size={18} className="text-edu-charcoal" />}
              </button>
              <a 
                href="/rodjendani.html"
                className="bg-edu-gold hover:bg-edu-gold/90 text-edu-cream px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer hover:-translate-y-0.5"
              >
                Tematski Rođendani
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-nordic-heading p-2 rounded-full hover:bg-nordic-border/30 cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} className="text-orange-300" /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-nordic-heading p-2 focus:outline-none cursor-pointer"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-nordic-bg border-b border-nordic-border absolute w-full overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                <a href="#toy-guide" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-nordic-text hover:bg-nordic-border">Igračke</a>
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-nordic-text hover:bg-nordic-border">Usluge</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-nordic-text hover:bg-nordic-border">O nama</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-nordic-text hover:bg-nordic-border">Kontakt</a>
                <a href="/kucni-red.html" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-nordic-text hover:bg-nordic-border">Kućni red</a>
                <a href="/cesta-pitanja.html" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-nordic-text hover:bg-nordic-border">Česta pitanja</a>
                <a 
                  href="/rodjendani.html"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 block w-full bg-edu-gold text-edu-cream px-5 py-3 rounded-full text-base font-medium text-center cursor-pointer"
                >
                  Tematski Rođendani
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">

        {/* HERO SLIDER SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-transparent to-nordic-card/30 min-h-[600px] flex items-center pt-12 pb-20 md:pt-24 md:pb-32">
          
          <div className="absolute inset-0 z-0 pointer-events-none">
            <AnimatePresence mode="wait">
              {currentHeroSlide === 0 ? (
                <motion.div
                  key="slide0-bg"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-edu-terracotta/5"
                />
              ) : (
                <motion.div
                  key="slide1-bg"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-transparent"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <AnimatePresence mode="wait">
              {currentHeroSlide === 0 ? (
                <motion.div 
                  key="slide0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Pitch Slide 0 - Rođendani */}
                  <div className="lg:col-span-6 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-edu-terracotta/10 border border-edu-terracotta/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-edu-terracotta mb-6">
                      <Sparkles size={14} className="animate-pulse" />
                      <span>NOVO • EDUPLAY ROĐENDANI</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-nordic-heading leading-none mb-6">
                      EduPlay <br className="hidden sm:block" />
                      <span className="font-light italic text-edu-terracotta">Rođendani</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-nordic-text font-light leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                      Proslava stvorena za dječju maštu. Odmor stvoren za vas. Rezervirajte 100% privatan prostor za slavlja!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start flex-wrap gap-4 h-auto">
                      <a 
                        href="/rodjendani.html" 
                        className="bg-white border-2 border-edu-terracotta hover:bg-edu-terracotta/10 text-edu-terracotta font-semibold px-8 py-4 rounded-full text-base transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer text-center"
                      >
                        Saznaj Više
                      </a>
                      <button 
                        onClick={() => {
                          if ((window as any).Calendly) {
                            (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/filip-merkat' });
                          }
                        }}
                        className="bg-edu-terracotta hover:bg-edu-terracotta/90 text-white font-semibold px-8 py-4 rounded-full text-base transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-center border-2 border-edu-terracotta"
                      >
                        Provjeri dostupnost
                      </button>
                    </div>
                  </div>
                  {/* Image Slide 0 */}
                  <div className="lg:col-span-6 relative mt-10 lg:mt-0">
                    <div className="relative w-full max-w-md mx-auto aspect-square">
                      <div className="absolute top-10 left-10 w-72 h-72 bg-edu-terracotta/20 rounded-full filter blur-3xl animate-pulse"></div>
                      <div className="absolute bottom-10 right-10 w-64 h-64 bg-edu-gold/25 rounded-full filter blur-3xl"></div>
                      <div className="absolute inset-0 z-10 overflow-hidden border-4 border-nordic-card shadow-2xl rounded-tl-[10rem] rounded-br-[10rem] rounded-tr-[4rem] rounded-bl-[4rem]">
                        <img 
                          src="/SOFTPLAY1.jpeg" 
                          alt="EduPlay rođendani" 
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute -top-6 -left-6 z-20 bg-edu-cream text-edu-charcoal border border-nordic-border px-5 py-4 rounded-3xl shadow-xl flex items-center space-x-2 max-w-[180px] hover:rotate-3 transition-transform cursor-pointer">
                        <Gift size={24} className="text-edu-terracotta shrink-0" />
                        <span className="text-xs font-bold leading-tight">100% Privatno slavlje</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="slide1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Pitch Slide 1 - Zaokružen razvoj */}
                  <div className="lg:col-span-6 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-edu-sage/10 dark:bg-edu-sage/5 border border-edu-sage/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-edu-sage mb-6">
                      <Sparkles size={14} className="animate-pulse" />
                      <span>PREMIUM DJEČJI CENTAR • PULA</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-nordic-heading leading-none mb-6">
                      Zaokružen razvoj <br className="hidden sm:block" />
                      <span className="font-light italic text-edu-gold">kroz slobodnu igru.</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-nordic-text font-light leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                      Prva istinska oaza zabave i učenja u Puli. Posebno osmišljen prostor koji omogućava razvoj kroz simboličku, konstruktivnu, senzornu i kreativnu igru.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start flex-wrap gap-4 h-auto">
                      <a 
                        href="#services" 
                        className="bg-edu-sage hover:bg-edu-sage/90 text-edu-charcoal font-semibold px-8 py-4 rounded-full text-base transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-center"
                      >
                        Istraži Usluge
                      </a>
                      <button 
                        onClick={() => {
                          if ((window as any).Calendly) {
                            (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/filip-merkat' });
                          }
                        }}
                        className="bg-edu-gold hover:bg-edu-gold/90 text-white font-semibold px-8 py-4 rounded-full text-base transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-center"
                      >
                        Rezerviraj Rođendan
                      </button>
                    </div>
                  </div>
                  {/* Image Slide 1 */}
                  <div className="lg:col-span-6 relative mt-10 lg:mt-0">
                    <div className="relative w-full max-w-md mx-auto aspect-square">
                      <div className="absolute top-10 left-10 w-72 h-72 bg-edu-blue/20 rounded-full filter blur-3xl animate-pulse"></div>
                      <div className="absolute bottom-10 right-10 w-64 h-64 bg-edu-lilac/25 rounded-full filter blur-3xl"></div>
                      <div className="absolute inset-0 z-10 overflow-hidden border-4 border-nordic-card shadow-2xl rounded-tl-[10rem] rounded-br-[10rem] rounded-tr-[4rem] rounded-bl-[4rem]">
                        <img 
                          src="/EDUBABY.jpg" 
                          alt="Drvene dječje kućice za igru" 
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute -top-6 -left-6 z-20 bg-edu-cream text-edu-charcoal border border-nordic-border px-5 py-4 rounded-3xl shadow-xl flex items-center space-x-2 max-w-[180px] hover:rotate-3 transition-transform cursor-pointer">
                        <Puzzle size={24} className="text-edu-terracotta shrink-0" />
                        <span className="text-xs font-bold leading-tight">Znanje + Zabava = EduPlay</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              <button 
                onClick={() => setCurrentHeroSlide(0)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentHeroSlide === 0 ? 'bg-edu-terracotta scale-125 w-6' : 'bg-nordic-border hover:bg-nordic-border/80'}`}
                aria-label="Rođendani"
              ></button>
              <button 
                onClick={() => setCurrentHeroSlide(1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentHeroSlide === 1 ? 'bg-edu-gold scale-125 w-6' : 'bg-nordic-border hover:bg-nordic-border/80'}`}
                aria-label="Razvoj kroz igru"
              ></button>
            </div>
          </div>
        </section>

        {/* TEXTUAL BANNER SECTION */}
        <section className="pt-20 pb-32 sm:pb-36 bg-nordic-bg relative overflow-hidden flex justify-center text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-edu-sage leading-snug relative inline-block">
              Jedinstveno i nezaboravno putovanje<br className="hidden md:block"/> za Vaše dijete i cijelu obitelj.
              <svg 
                className="absolute -bottom-20 sm:-bottom-24 md:-bottom-28 left-4 sm:left-8 md:left-24 text-edu-lilac w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 block opacity-90" 
                viewBox="0 0 60 80" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main rough stroke */}
                <path d="M45 5 C 10 20, 15 50, 25 75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M10 60 C 18 70, 25 75, 25 75 C 34 65, 45 53, 47 50" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                
                {/* Secondary offset stroke for pastel/crayon drawn effect */}
                <path d="M45 5 C 10 20, 15 50, 25 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" className="opacity-50" transform="translate(-1.5, 1.5)" />
                <path d="M10 60 C 18 70, 25 75, 25 75 C 34 65, 45 53, 47 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="opacity-50" transform="translate(-1.5, 1.5)" />
              </svg>
            </h2>
          </div>
        </section>


        {/* INTERACTIVE SECTION: DEVELOPMENT TOYS AND MILESTONES (Zabavno, edukativno, vizualni identitet) */}
        <section id="toy-guide" className="py-24 bg-edu-sage relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5">
                <span className="text-edu-cream font-bold text-sm uppercase tracking-widest block mb-3">Vodič za senzorni razvoj</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-nordic-heading mb-6">
                  Razvojni potencijal igračaka
                </h2>
                <p className="text-nordic-text font-light leading-relaxed mb-8">
                  Nijedan predmet u EduPlayu nije odabran slučajno. Kliknite na neku od naših temeljnih razvojnih igračaka i saznajte koje milestone korake vaše dijete postiže dok se njome igra.
                </p>

                {/* Vertical Tabs */}
                <div className="space-y-3">
                  {developmentalToys.map((toy) => (
                    <button
                      key={toy.id}
                      onClick={() => setActiveToyTab(toy.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeToyTab === toy.id 
                          ? 'bg-nordic-card border-edu-gold shadow-md translate-x-1' 
                          : 'border-nordic-border hover:border-nordic-text/30 bg-nordic-card/40'
                      }`}
                    >
                      <span className="font-semibold text-nordic-heading">{toy.name}</span>
                      <ArrowRight size={16} className={`transition-transform duration-300 ${activeToyTab === toy.id ? 'translate-x-1 text-edu-gold' : 'text-nordic-text/40'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Display Panel */}
              <div className="lg:col-span-7 bg-nordic-card p-8 md:p-12 rounded-[3.5rem] border border-nordic-border shadow-xl min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="w-3.5 h-3.5 rounded-full bg-edu-gold animate-ping"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-edu-charcoal/70">AKTIVNI EDUKATIVNI MATERIJAL</span>
                  </div>

                  {developmentalToys.map((toy) => {
                    if (toy.id !== activeToyTab) return null;
                    return (
                      <motion.div
                        key={toy.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-3xl font-extrabold text-nordic-heading">{toy.name}</h3>
                        <p className="text-nordic-text leading-relaxed font-light">{toy.desc}</p>
                        
                        <div className="p-5 rounded-2xl border bg-nordic-bg space-y-2">
                          <span className="text-xs font-extrabold uppercase tracking-wide text-edu-charcoal block">Mjerljivi razvojni koraci (Milestone):</span>
                          <p className="text-sm font-medium text-nordic-heading leading-relaxed">{toy.milestones}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-nordic-border flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-nordic-text/80 gap-4">
                  <span className="flex items-center"><Check size={14} className="text-edu-sage mr-1.5" /> 100% Neotrovni prirodni premazi</span>
                  <span className="flex items-center"><Check size={14} className="text-edu-sage mr-1.5" /> Usklađeno s Montessori standardom</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES OVERVIEW (Sveobuhvatni Cjenik i Redizajn) */}
        <section id="services" className="py-24 bg-nordic-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-edu-terracotta font-bold text-sm uppercase tracking-widest block mb-3">Naše Usluge</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-nordic-heading">
                Odgoj, proslave i radionice
              </h2>
              <p className="mt-4 text-lg text-nordic-text font-light">
                Nudimo tri prilagođena programa za poticanje djetetovih snaga i opuštanje roditeljskog dana.
              </p>
            </div>

            <div className="relative">
              <div 
                ref={servicesScrollRef}
                className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {/* Service 1: Tematski Rođendani */}
                <div className="bg-edu-terracotta text-edu-cream w-full min-w-full md:w-auto md:min-w-0 snap-center shrink-0 p-8 rounded-[2.5rem] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 border border-transparent">
                  <div>
                    <div className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-edu-cream text-xs font-extrabold uppercase mb-6">
                      Mali istraživači
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Tematski Rođendani</h3>
                    <p className="text-edu-cream/80 text-sm font-light leading-relaxed mb-6">
                      Estetski predivne i mirne proslave prilagođene interesima vašeg slavljenika.
                    </p>
                    <ul className="space-y-3 mb-8 text-sm text-edu-cream/90 font-light">
                      <li className="flex items-start"><Check size={14} className="text-edu-cream mr-2 shrink-0 mt-1" /> <span>torta, zdrave grickalice i svježe voće te napitci</span></li>
                      <li className="flex items-start"><Check size={14} className="text-edu-cream mr-2 shrink-0 mt-1" /> <span>trajanje 2.5 sata</span></li>
                      <li className="flex items-start"><Check size={14} className="text-edu-cream mr-2 shrink-0 mt-1" /> <span>dodatne opcije i teme po dogovoru</span></li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-white/20 mt-4">
                    <div className="text-2xs uppercase tracking-wide text-edu-cream/80 mb-1">Početna cijena</div>
                    <div className="text-2xl font-black mb-6">€140 / 5 djece</div>
                    <a href="#calculator" className="block text-center bg-white text-edu-terracotta hover:bg-edu-cream font-bold py-3.5 px-6 rounded-full text-sm transition-all shadow-md mb-3">
                      Izračunaj / Rezerviraj
                    </a>
                    <a href="/rodjendani.html" className="block text-center border-2 border-white text-white hover:bg-white hover:text-edu-terracotta font-bold py-3.5 px-6 rounded-full text-sm transition-all shadow-md">
                      Saznaj više
                    </a>
                  </div>
                </div>

                {/* Service 2: Slobodna igra */}
                <div className="bg-edu-blue text-edu-cream w-full min-w-full md:w-auto md:min-w-0 snap-center shrink-0 p-8 border border-transparent rounded-[2.5rem] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative">
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-edu-blue px-3.5 py-1 rounded-full text-2xs font-bold uppercase tracking-widest shadow-md">
                    Najpopularnije
                  </div>
                  <div>
                    <div className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-edu-cream text-xs font-extrabold uppercase mb-6">
                      Prvi dolazak probno
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Slobodna igra</h3>
                    <p className="text-edu-cream/80 text-sm font-light leading-relaxed mb-6">
                      Slobodnua igra u specijaliziranim zonama
                    </p>
                    <ul className="space-y-3 mb-8 text-sm text-edu-cream/90 font-light">
                      <li className="flex items-center"><Check size={14} className="text-edu-cream mr-2 shrink-0" /> Mini play city za role-play</li>
                      <li className="flex items-center"><Check size={14} className="text-edu-cream mr-2 shrink-0" /> Umirujući šator za smirenje</li>
                      <li className="flex items-start"><Check size={14} className="text-edu-cream mr-2 shrink-0 mt-1" /> <span>kutak kreativne igre uključuje glazbeni dio i umjetnički dio</span></li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-white/20 mt-4">
                    <div className="text-2xs uppercase tracking-wide text-edu-cream/80 mb-1">Satnica s popustima</div>
                    <div className="text-2xl font-black mb-6">već od €8 / h</div>
                    <a href="#calculator" className="block text-center bg-white text-edu-blue font-bold py-3.5 px-6 rounded-full text-sm transition-all hover:bg-edu-cream shadow-md">
                      Isprobaj odmah
                    </a>
                  </div>
                </div>

                {/* Service 3: Edukativne radionice */}
                <div className="bg-edu-sage text-edu-charcoal dark:text-edu-charcoal w-full min-w-full md:w-auto md:min-w-0 snap-center shrink-0 p-8 rounded-[2.5rem] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 border border-transparent">
                  <div>
                    <div className="inline-block px-3.5 py-1.5 rounded-full bg-edu-charcoal/10 text-edu-charcoal text-xs font-extrabold uppercase mb-6">
                      Mali genijalci
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Edukativne radionice</h3>
                    <p className="text-edu-charcoal/80 text-sm font-light leading-relaxed mb-6">
                      Kreću od jeseni. Stručno osoblje (edukacijski rehabilitator, radni terapeut, fonetičar rehabilitator, socijalni pedagog).
                    </p>
                    <ul className="space-y-3 mb-8 text-sm text-edu-charcoal/90 font-light">
                      <li className="flex items-center"><Check size={14} className="text-edu-charcoal mr-2 shrink-0" /> termin jednom tjedno</li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-edu-charcoal/20 mt-4">
                    <div className="text-2xs uppercase tracking-wide text-edu-charcoal/70 mb-1">Mjesečna cijena</div>
                    <div className="text-2xl font-black mb-6">€60</div>
                    <button className="block w-full text-center bg-edu-charcoal hover:bg-edu-charcoal/90 text-edu-cream font-bold py-3.5 px-6 rounded-full text-sm transition-all shadow-md cursor-not-allowed opacity-80">
                      Najava i više info kasnije
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Arrows */}
              <div className="flex justify-center items-center space-x-4 mt-8 md:hidden">
                <button 
                  onClick={() => scrollServices('left')}
                  className="w-12 h-12 rounded-full border border-nordic-border flex items-center justify-center text-nordic-text hover:bg-nordic-border hover:text-nordic-heading transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scrollServices('right')}
                  className="w-12 h-12 rounded-full border border-nordic-border flex items-center justify-center text-nordic-text hover:bg-nordic-border hover:text-nordic-heading transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATION PLAYGROUND (Izuzetno povećava angažman) */}
        <section id="calculator" className="py-24 bg-nordic-bg relative overflow-hidden text-left border-y border-nordic-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-nordic-card p-8 md:p-12 rounded-[3.5rem] border border-nordic-border shadow-xl relative z-10">
              
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Inputs */}
                <div className="flex-grow space-y-6">
                  <div>
                    <span className="text-edu-gold font-bold text-xs uppercase tracking-widest block mb-2">Interaktivni Cjenik</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-nordic-heading">Izračunajte cijenu usluge</h3>
                    <p className="text-sm text-nordic-text font-light mt-1">
                      Odaberite program i prilagodite mogućnosti kako biste dobili brzu procjenu troška bez skrivenih naknada.
                    </p>
                  </div>

                  {/* Program Switcher */}
                  <div className="grid grid-cols-3 gap-2 bg-nordic-bg p-1.5 rounded-2xl border border-nordic-border">
                    <button
                      onClick={() => { setCalcService('rođendani'); }}
                      className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${calcService === 'rođendani' ? 'bg-edu-gold text-edu-cream shadow-sm' : 'text-nordic-text hover:text-nordic-heading'}`}
                    >
                      Rođendani
                    </button>
                    <button
                      onClick={() => { setCalcService('slobodna_igra'); }}
                      className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${calcService === 'slobodna_igra' ? 'bg-edu-gold text-edu-cream shadow-sm' : 'text-nordic-text hover:text-nordic-heading'}`}
                    >
                      Slobodna igra
                    </button>
                    <button
                      onClick={() => { setCalcService('radionice'); }}
                      className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${calcService === 'radionice' ? 'bg-edu-gold text-edu-cream shadow-sm' : 'text-nordic-text hover:text-nordic-heading'}`}
                    >
                      Radionice
                    </button>
                  </div>

                  {/* Calculations Details per service type */}
                  {calcService === 'rođendani' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-nordic-heading mb-2" htmlFor="birthdayChildrenSelector">
                          Broj djece:
                        </label>
                        <select
                          id="birthdayChildrenSelector"
                          value={birthdayChildren}
                          onChange={(e) => setBirthdayChildren(parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-nordic-border bg-nordic-bg text-sm text-nordic-text focus:outline-none focus:ring-1 focus:ring-edu-gold"
                        >
                          <option value={5}>Do 5 djece (€140)</option>
                          <option value={10}>Do 10 djece (€170)</option>
                          <option value={15}>Do 15 djece (€200)</option>
                          <option value={20}>Do 20 djece (€230)</option>
                          <option value={25}>Do 25 djece (€260)</option>
                          <option value={26}>26 djece (€270)</option>
                          <option value={27}>27 djece (€280)</option>
                          <option value={28}>28 djece (€290)</option>
                          <option value={29}>29 djece (€300)</option>
                          <option value={30}>30 djece (€310)</option>
                        </select>
                        <p className="text-3xs text-nordic-text mt-2 font-light">Dodatno dijete iznad 25 djece naplaćuje se 10 eur.</p>
                      </div>

                      {/* Add-ons checkbox */}
                      <div className="space-y-3">
                        <span className="block text-xs font-bold uppercase tracking-wide text-nordic-heading">Slavljenički Dodaci (opcionalno):</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="flex items-center space-x-3 p-3 bg-nordic-bg/30 rounded-xl border border-nordic-border/70 cursor-pointer hover:border-edu-gold/50 transition-colors">
                            <input type="checkbox" checked={addonFacepaint} onChange={() => setAddonFacepaint(!addonFacepaint)} className="accent-edu-gold w-4 h-4 rounded" />
                            <div className="text-xs">
                              <span className="block font-semibold text-nordic-heading">Oslikavanje lica / Facepainting</span>
                              <span className="text-nordic-text font-light text-2xs">+ €30 fiksno</span>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 p-3 bg-nordic-bg/30 rounded-xl border border-nordic-border/70 cursor-pointer hover:border-edu-gold/50 transition-colors">
                            <input type="checkbox" checked={addonCatering} onChange={() => setAddonCatering(!addonCatering)} className="accent-edu-gold w-4 h-4 rounded" />
                            <div className="text-xs">
                              <span className="block font-semibold text-nordic-heading">Premium catering roditelji</span>
                              <span className="text-nordic-text font-light text-2xs">+ €50 fiksno</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {calcService === 'slobodna_igra' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-nordic-heading mb-2">
                          Broj sati igre: <span className="text-edu-gold text-sm font-black">{playHours}h</span>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="3"
                          value={playHours}
                          onChange={(e) => setPlayHours(parseInt(e.target.value))}
                          className="w-full accent-edu-gold cursor-pointer bg-nordic-border rounded-lg h-2"
                        />
                        <div className="flex justify-between text-3xs text-nordic-text mt-1 font-semibold">
                          <span>1 sat</span>
                          <span>2 sata</span>
                          <span>3 sata</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide text-nordic-heading mb-1.5" htmlFor="childrenSelector">
                          Broj djece:
                        </label>
                        <select
                          id="childrenSelector"
                          value={playChildren}
                          onChange={(e) => setPlayChildren(parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-nordic-border bg-nordic-bg text-sm text-nordic-text focus:outline-none focus:ring-1 focus:ring-edu-gold"
                        >
                          <option value="1">1 dijete</option>
                          <option value="2">2 djece (braća/sestre)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {calcService === 'radionice' && (
                    <div className="space-y-4 bg-nordic-bg/40 p-4 rounded-2xl border border-nordic-border/80 text-xs">
                      <div className="flex items-start space-x-2">
                        <PaperIcon className="text-edu-sage w-5 h-5 shrink-0" />
                        <div>
                          <p className="font-bold text-nordic-heading">Kreću od jeseni</p>
                          <p className="text-nordic-text font-light mt-1 text-sm">
                            Stručno osoblje (edukacijski rehabilitator, radni terapeut, fonetičar rehabilitator, socijalni pedagog) - mjesečna cijena 60 eura za termin jednom tjedno. Najava i više info kasnije.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Pricing result block */}
                <div className="w-full lg:w-80 bg-nordic-bg/80 dark:bg-nordic-bg/20 p-8 rounded-3xl border border-nordic-border flex flex-col justify-between text-center">
                  <div>
                    <span className="text-2xs font-extrabold uppercase tracking-widest text-nordic-text block mb-1">Ukupna procjena troška</span>
                    <div className="py-8">
                      <span className="text-5xl font-black text-nordic-heading tracking-tight">€{calculateTotal()}</span>
                      <span className="text-xs text-nordic-text block mt-2 font-medium">PDV uključen u cijenu</span>
                    </div>

                    <div className="border-t border-nordic-border/60 pt-4 space-y-2 text-left text-2xs text-nordic-text font-light">
                      <div className="flex items-center"><Check size={12} className="text-edu-sage mr-2 shrink-0" /> Garancija ugodne temperature</div>
                      <div className="flex items-center"><Check size={12} className="text-edu-sage mr-2 shrink-0" /> Bez prenatrpanosti i vikanja</div>
                      <div className="flex items-center"><Check size={12} className="text-edu-sage mr-2 shrink-0" /> Zdrava kava / čaj za pratnju</div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setIsModalOpen(true); }}
                    className="mt-8 w-full bg-edu-gold text-edu-cream font-bold py-3.5 rounded-2xl flex items-center justify-center space-x-2 hover:bg-edu-gold/90 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Zatraži slobodan termin</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ABOUT TEASER - TETA TEA & STORYTELLING */}
        <section id="about" className="py-24 bg-nordic-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left visuals */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2.5rem] bg-white overflow-hidden border border-nordic-border shadow-2xl relative flex items-center justify-center p-8">
                  <img 
                    src="/Eduplaylogo2.png" 
                    alt="Eduplay Pula" 
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pb-10 text-edu-cream">
                    <p className="text-xs uppercase tracking-widest text-edu-gold font-bold mb-2">Eduplay Pula</p>
                    <h4 className="text-lg font-bold leading-tight">OVDJE MOŽE BITI NEŠTO O TEBI / TEAMU / KONCEPTU NASTANKA</h4>
                  </div>
                </div>
                {/* Visual badge */}
                <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-32 h-32 bg-nordic-bg rounded-full flex items-center justify-center p-4 shadow-xl border border-nordic-border hidden md:flex rotate-6">
                  <p className="text-center text-xs font-bold text-edu-gold leading-tight">Grožnjanska 17<br/>Pula</p>
                </div>
              </div>
              
              {/* Right content */}
              <div className="text-left space-y-6">
                <span className="text-edu-gold font-bold text-sm uppercase tracking-widest block">O nama</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-nordic-heading leading-tight">
                  Kako je od ideje nastao mir za cijelu obitelj.
                </h2>
                
                <div className="space-y-6 text-base text-nordic-text font-light leading-relaxed">
                  <p>
                    Mjesto gdje nastaje <strong>jedinstveno i nezaboravno putovanje</strong> za Vaše dijete i cijelu obitelj, stvoreno sa srcem u centru Pule.
                  </p>
                  <p>
                    Ideja vodilja našeg koncepta leži u spajanju znanja, tolerancije nesavršenosti i slobode kretanja pod praćenjem stručnih očiju. Ponosimo se <strong>učenjem kroz igru</strong> gdje su znanje i mašta savršeno spojeni u jedno.
                  </p>
                  <p>
                    Tu smo za Vas bez obzira tražite li sigurnu <strong>slobodnu igru</strong>, nezaboravne <strong>tematske rođendane</strong> lišene prekomjerne stimulacije, ili pak stručno vođene <strong>edukativne radionice</strong> uz potpunu mirnoću za roditelje.
                  </p>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-transparent border-2 border-edu-gold text-nordic-heading hover:bg-edu-gold hover:text-edu-cream px-8 py-3.5 rounded-full font-bold transition-all cursor-pointer"
                  >
                    Saznajte više
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* SECTION: BRAND MANIFESTO & PHILOSOPHY (Vrhunska estetika i objašnjenje) */}
        <section id="philosophy" className="py-24 bg-white dark:bg-nordic-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-edu-gold font-bold text-sm uppercase tracking-widest block mb-3">Naša Filozofija</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-nordic-heading">
                Učenje i Razvoj Kroz Igru
              </h2>
            </div>

          <div className="relative">
            <div 
              ref={philosophyScrollRef}
              className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* Concept 1: Puzzle & Montessori */}
              <div className="bg-edu-blue text-edu-cream w-full min-w-full md:w-auto md:min-w-0 snap-center shrink-0 p-8 rounded-[2.5rem] border border-transparent hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-edu-cream flex items-center justify-center mb-8">
                    <Puzzle size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Znanje i igra spojeni</h3>
                  <p className="text-edu-cream/80 text-sm font-light leading-relaxed">
                    Puzzle kao simbol igračke povezuje spoznajni razvoj i čistu radost. Djeca istražuju bez nametnutih pravila i bez digitalnih ekrana.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20 mt-8 text-xs font-semibold uppercase tracking-wider text-edu-cream/90">
                  Montessori načela
                </div>
              </div>

              {/* Concept 2: Safe Parent Coffee Lounge */}
              <div className="bg-edu-sage text-edu-charcoal dark:text-edu-charcoal w-full min-w-full md:w-auto md:min-w-0 snap-center shrink-0 p-8 rounded-[2.5rem] border border-transparent hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-edu-charcoal/10 text-edu-charcoal flex items-center justify-center mb-8">
                    <Coffee size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Potpuna mirnoća za roditelje</h3>
                  <p className="text-edu-charcoal/80 text-sm font-light leading-relaxed">
                    Dok se mi brinemo o vašim mališanima, opustite se u našem prostoru ili na terasi. Radite, čitajte ili jednostavno uživajte u toplom napitku. Ako želite, možete se i pridružiti igri sa svojim djetetom. 
                  </p>
                </div>
                <div className="pt-6 border-t border-edu-charcoal/20 mt-8 text-xs font-bold uppercase tracking-wider text-edu-charcoal/90">
                  Utočište bez grižnje savjesti
                </div>
              </div>

              {/* Concept 3: Sensory integration */}
              <div className="bg-edu-terracotta text-edu-cream w-full min-w-full md:w-auto md:min-w-0 snap-center shrink-0 p-8 rounded-[2.5rem] border border-transparent hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-edu-cream flex items-center justify-center mb-8">
                    <HeartHandshake size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Podrška dječjem integritetu</h3>
                  <p className="text-edu-cream/80 text-sm font-light leading-relaxed">
                    Njegujemo i cijenimo nesavršenosti i slobodu dječje riječi i pokreta. Naš rad počiva na načelima individualizacije te na nadogradnji već
usvojenih vještina kroz igru koja privlači dijete.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20 mt-8 text-xs font-semibold uppercase tracking-wider text-edu-cream/90">
                  Stručni odgajatelji Pula
                </div>
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex justify-center items-center space-x-4 mt-8 md:hidden">
              <button 
                onClick={() => scrollPhilosophy('left')}
                className="w-12 h-12 rounded-full border border-nordic-border flex items-center justify-center text-nordic-text hover:bg-nordic-border hover:text-nordic-heading transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollPhilosophy('right')}
                className="w-12 h-12 rounded-full border border-nordic-border flex items-center justify-center text-nordic-text hover:bg-nordic-border hover:text-nordic-heading transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          </div>
        </section>

        {/* TESTIMONIAL CAROUSEL (Showcasing Parent Trust) */}
        <section className="py-24 bg-nordic-bg relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-edu-blue font-bold text-sm uppercase tracking-widest block mb-3">Zajednica roditelja</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-nordic-heading">Što kažu naša mama i tata</h2>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((t) => (
                    <div key={t.id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-nordic-card rounded-[3.5rem] p-8 md:p-16 text-center shadow-md border border-nordic-border flex flex-col items-center">
                        <Quote size={40} className="text-edu-gold mb-8 stroke-1 opacity-60" />
                        <p className="text-lg md:text-2xl text-nordic-heading font-light leading-relaxed mb-8 italic">
                          "{t.text}"
                        </p>
                        <div>
                          <p className="font-extrabold text-nordic-heading text-lg">{t.author}</p>
                          <p className="text-xs text-nordic-text/80 mt-1 uppercase tracking-wider font-semibold">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-center items-center mt-12 gap-6">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="p-3.5 rounded-full text-nordic-text hover:bg-nordic-bg hover:text-nordic-heading transition-colors shadow-sm bg-nordic-card border border-nordic-border cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Show ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeTestimonial === idx ? 'bg-edu-gold w-8' : 'bg-nordic-border dark:bg-zinc-700 w-2 hover:bg-edu-gold/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="p-3.5 rounded-full text-nordic-text hover:bg-nordic-bg hover:text-nordic-heading transition-colors shadow-sm bg-nordic-card border border-nordic-border cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner prije FAQ */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="bg-blue-50/50 rounded-3xl p-8 md:p-16 text-center border border-blue-100/50">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Imate pitanja prije dolaska?
            </h2>
            <p className="text-slate-600 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
              Znamo da organizacija dječjeg rođendana ili prvi posjet novoj igraonici može izazvati puno pitanja. Zato smo pripremili detaljne odgovore na sve što vas zanima.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="/cesta-pitanja.html" 
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
              >
                Pročitajte Česta Pitanja
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-medium py-3 px-8 rounded-full transition-colors"
              >
                Pošaljite nam upit
              </a>
            </div>
          </div>
        </section>

        {/* FAQ - INTERACTIVE ACCORDION (Rješava ključne roditeljske dvojbe) */}
        <section className="py-24 bg-nordic-card border-t border-nordic-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-edu-gold font-bold text-sm uppercase tracking-widest block mb-3">Najčešća pitanja</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-nordic-heading">Česta zabrinutost roditelja</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  style={{ contentVisibility: 'auto' }}
                  className="bg-nordic-bg/40 rounded-3xl border border-nordic-border overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center text-nordic-heading font-bold font-sans text-base md:text-lg focus:outline-none cursor-pointer hover:bg-nordic-bg/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 ml-4 w-8 h-8 rounded-full border border-nordic-border bg-nordic-card flex items-center justify-center text-nordic-text">
                      {faqOpenIndex === idx ? <X size={16} /> : <HelpCircle size={16} />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {faqOpenIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="px-6 pb-6 text-nordic-text text-sm md:text-base font-light leading-relaxed border-t border-nordic-border/50 pt-4 bg-nordic-bg/25">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CURATED ARTICLES - BLOG */}
        <section id="blog" className="py-24 bg-nordic-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div className="max-w-2xl text-left">
                <span className="text-edu-sage font-bold text-sm uppercase tracking-widest block mb-2">Montessori savjeti</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-nordic-heading">Svijet djetetova razvoja</h2>
                <p className="text-base text-nordic-text font-light mt-2">Stručni članci, savjeti o odgoju i novosti iz našeg pulskog centra.</p>
              </div>
              <div className="mt-6 md:mt-0">
                <a href="#" className="inline-flex items-center text-nordic-heading font-bold hover:text-edu-gold transition-colors group">
                  Svi članci <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Post 1 */}
              <Link to="/blog/senzorna-igra" className="block h-full">
                <article className="bg-nordic-card rounded-3xl overflow-hidden border border-nordic-border hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer group">
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80" 
                    alt="Wooden educational sensory toys" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-edu-cream dark:bg-zinc-800 text-edu-terracotta border border-edu-terracotta/20 px-3 py-1 rounded-full text-xs font-semibold">
                    Edukacija
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <span className="text-xs text-nordic-text/50 mb-3 border-b border-nordic-border pb-3 block">12. Svibnja 2026.</span>
                  <h3 className="text-xl font-bold text-nordic-heading mb-3 line-clamp-2 hover:text-edu-gold transition-colors">Važnost senzorne igre u ranom razvoju</h3>
                  <p className="text-nordic-text mb-6 flex-grow leading-relaxed font-light text-sm">
                    Otkrijte kako jednostavni dodiri različitih tekstura, šum drveta i miris pčelinjeg voska aktiviraju neuronske putanje vašeg mališana.
                  </p>
                  <span className="inline-flex items-center text-edu-gold group-hover:text-edu-gold/80 font-bold text-sm mt-auto">
                    Pročitaj više <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
              </Link>

              {/* Post 2 */}
              <Link to="/blog/znakovi-prekomjerne-stimulacije" className="block h-full">
                <article className="bg-nordic-card rounded-3xl overflow-hidden border border-nordic-border hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer group">
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80" 
                    alt="Simple wooden and paper children items" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-edu-cream dark:bg-zinc-800 text-edu-sage border border-edu-sage/20 px-3 py-1 rounded-full text-xs font-semibold">
                    Roditeljstvo
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <span className="text-xs text-nordic-text/50 mb-3 border-b border-nordic-border pb-3 block">05. Svibnja 2026.</span>
                  <h3 className="text-xl font-bold text-nordic-heading mb-3 line-clamp-2 hover:text-edu-gold transition-colors">Znakovi prekomjerne stimulacije</h3>
                  <p className="text-nordic-text mb-6 flex-grow leading-relaxed font-light text-sm">
                    Bučna plastika i agresivne melodije često preopterećuju djetetov živčani sustav. Prepoznajte suptilne znakove nervoze u ranoj fazi.
                  </p>
                  <span className="inline-flex items-center text-edu-gold group-hover:text-edu-gold/80 font-bold text-sm mt-auto">
                    Pročitaj više <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
              </Link>

              {/* Post 3 */}
              <Link to="/blog/montessori-kod-kuce" className="block h-full">
                <article className="bg-nordic-card rounded-3xl overflow-hidden border border-nordic-border hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer group">
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&q=80" 
                    alt="Kid playing with sensory objects" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-nordic-bg text-edu-gold border border-edu-gold/20 px-3 py-1 rounded-full text-xs font-semibold">
                    Igračka
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <span className="text-xs text-nordic-text/50 mb-3 border-b border-nordic-border pb-3 block">28. Travnja 2026.</span>
                  <h3 className="text-xl font-bold text-nordic-heading mb-3 line-clamp-2 hover:text-edu-gold transition-colors">Montessori kod kuće za roditelje</h3>
                  <p className="text-nordic-text mb-6 flex-grow leading-relaxed font-light text-sm">
                    Ne trebate skupe igračke. Donosimo vam 5 jednostavnih vježbi presipavanja i sortiranja koristeći samo plodove iz vaše kuhinje i prirode.
                  </p>
                  <span className="inline-flex items-center text-edu-gold group-hover:text-edu-gold/80 font-bold text-sm mt-auto">
                    Pročitaj više <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER - REDESIGNED USING SECURE BRAND COLORS and guideline notes */}
      <footer id="contact" className="bg-edu-charcoal pt-20 pb-10 text-edu-cream border-t border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Branded footer column */}
            <div>
              <div className="mb-6">
                {/* Secondary logo logic (Edu+house in white as instructed on page 1 PDF) */}
                <BrandLogo isDarkMode={true} />
              </div>
              <p className="text-edu-cream/75 font-light text-sm leading-relaxed mb-6">
                Vaš mir, njihov razvoj. Prva premium, guilt-free dječja igraonica u Puli bez ekrana.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-edu-gold/20 flex items-center justify-center text-edu-cream hover:text-edu-cream transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-edu-gold/20 flex items-center justify-center text-edu-cream hover:text-edu-cream transition-colors">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-edu-cream font-bold text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Radno vrijeme</h4>
              <ul className="space-y-3 text-edu-cream/75 text-sm font-light">
                <li className="flex justify-between"><span>Ponedjeljak - Petak</span> <span className="font-semibold text-edu-gold">14:00 - 20:00</span></li>
                <li className="flex justify-between"><span>Subota - Nedjelja</span> <span className="font-semibold text-edu-gold">10:00 - 20:00</span></li>
                <li className="pt-2 text-3xs text-edu-cream/50 italic leading-snug">
                  *Dolaske je preporučljivo najaviti u aplikaciji radi zadržavanja ugodne atmosfere.
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-edu-cream font-bold text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Kontakt & Adresa</h4>
              <ul className="space-y-4 text-edu-cream/75 text-sm font-light">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 text-edu-gold shrink-0 mt-0.5" />
                  <span>Grožnjanska ul. 17,<br />52100 Pula, Hrvatska</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 text-edu-gold shrink-0" />
                  <a href="tel:+385958457648" className="hover:text-edu-cream transition-colors">095 845 7648</a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 text-edu-gold shrink-0" />
                  <a href="mailto:info@eduplay-pula.hr" className="hover:text-edu-cream transition-colors">info@eduplay-pula.hr</a>
                </li>
              </ul>
            </div>

            {/* Web Development note */}
            <div>
              <h4 className="text-edu-cream font-bold text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Izrada web stranice</h4>
              <p className="text-edu-cream/75 font-light text-sm leading-relaxed mb-4">
                Redizajn vizualnog identiteta i izrada weba:
              </p>
              <a 
                href="https://merkat.media"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white/5 border border-white/10 hover:border-edu-gold px-4 py-2 rounded-xl text-xs text-edu-gold transition-all font-bold tracking-wide"
              >
                MERKAT MEDIA
              </a>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-edu-cream/40 text-xs font-light gap-4">
            <p>&copy; {new Date().getFullYear()} EduPlay Pula. Sva prava pridržana.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-edu-cream transition-colors">Opći uvjeti</a>
              <a href="/kucni-red.html" className="hover:text-edu-cream transition-colors">Kućni red</a>
              <a href="/cesta-pitanja.html" className="hover:text-edu-cream transition-colors">Česta pitanja</a>
              <a href="#" className="hover:text-edu-cream transition-colors">Politika privatnosti</a>
              <a href="#" className="hover:text-edu-cream transition-colors font-semibold text-edu-gold">HR-HR</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOOKING RESERVATION MODAL (Visoko modularna forma s date-pickerom) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop click to close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-nordic-card relative z-10 w-full max-w-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] text-left border border-nordic-border"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-nordic-text hover:text-nordic-heading transition-colors p-2 rounded-full hover:bg-nordic-bg/50 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-edu-gold">BRZA DNEVNA REZERVACIJA</span>
                <h3 className="text-2xl md:text-3xl font-bold text-nordic-heading mt-1">Zakoračite u EduPlay</h3>
                <p className="text-sm text-nordic-text font-light mt-1">Pošaljite neobvezujući upit, a teta Tea će vas kontaktirati radi potvrde termina unutar 2 sata.</p>
              </div>

              <form 
                className="space-y-5" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  alert('Upit uspješno poslan! Teta Tea će Vam se javiti povratno u najkraćem roku na Vašu e-mail adresu.'); 
                  setIsModalOpen(false); 
                }}
              >
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nordic-heading mb-1.5" htmlFor="bookName">
                    Ime i prezime roditelja:
                  </label>
                  <input 
                    type="text" 
                    id="bookName" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-nordic-border bg-nordic-bg focus:outline-none focus:ring-1 focus:ring-edu-gold focus:border-edu-gold text-sm text-nordic-text font-light placeholder:text-nordic-text/40 transition-all" 
                    placeholder="npr. Maja Horvat" 
                  />
                </div>

                {/* Email + Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-nordic-heading mb-1.5" htmlFor="bookEmail">
                      E-mail adresa:
                    </label>
                    <input 
                      type="email" 
                      id="bookEmail" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-nordic-border bg-nordic-bg focus:outline-none focus:ring-1 focus:ring-edu-gold focus:border-edu-gold text-sm text-nordic-text font-light transition-all" 
                      placeholder="adresa@mail.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-nordic-heading mb-1.5" htmlFor="bookPhone">
                      Broj mobitela:
                    </label>
                    <input 
                      type="tel" 
                      id="bookPhone" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-nordic-border bg-nordic-bg focus:outline-none focus:ring-1 focus:ring-edu-gold focus:border-edu-gold text-sm text-nordic-text font-light transition-all" 
                      placeholder="095 845 7648" 
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nordic-heading mb-1.5" htmlFor="bookService">
                    Željeni EduPlay program:
                  </label>
                  <select 
                    id="bookService" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-nordic-border bg-nordic-bg text-sm text-nordic-text focus:outline-none focus:ring-1 focus:ring-edu-gold"
                  >
                    <option value="slobodna_igra">Slobodna razvojna igra u Grožnjanskoj (popust na više sati)</option>
                    <option value="rodjendan">Tematska Montessori Proslava Rođendana</option>
                    <option value="radionica">Edukativna senzorna radionica s Teta Teom</option>
                  </select>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-nordic-heading mb-1.5" htmlFor="bookDate">
                      Željeni datum dolaska:
                    </label>
                    <input 
                      type="date" 
                      id="bookDate" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-nordic-border bg-nordic-bg text-sm text-nordic-text focus:outline-none focus:ring-1 focus:ring-edu-gold focus:border-edu-gold font-light transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-nordic-heading mb-1.5" htmlFor="bookAge">
                      Dob djeteta:
                    </label>
                    <select 
                      id="bookAge" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-nordic-border bg-nordic-bg text-sm text-nordic-text focus:outline-none focus:ring-1 focus:ring-edu-gold"
                    >
                      <option value="bebe">Manje od 18 mjeseci</option>
                      <option value="1_3">1 - 3 godine</option>
                      <option value="3_5">3 - 5 godina</option>
                      <option value="5_plus">5+ godina</option>
                    </select>
                  </div>
                </div>

                {/* Compliance & Submit */}
                <span className="block text-3xs text-nordic-text/70 leading-relaxed font-light mt-2">
                  *Podnošenjem upita slažete se s pohranom osobnih podataka u svrhu rezervacije dječjeg posjeta u igralište. Vaše podatke čuvamo sukladno GDPR smjernicama EduPlay Pula.
                </span>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-edu-charcoal dark:bg-edu-cream text-edu-cream dark:text-edu-charcoal font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-xl hover:opacity-90 active:scale-[0.98] cursor-pointer text-center text-sm"
                  >
                    Uputi rezervacijski zahtjev
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline custom decorative SVG Icons to prevent code bloating or remote image loading issues
function PaperIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
