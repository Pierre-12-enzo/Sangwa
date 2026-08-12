// frontend/src/i18n/dict.js
// Translation table. Keys are dot-paths; missing keys fall back to English.
// Keep this flat-ish so it's easy to scan and update.

export const LOCALES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'rw', label: 'RW', full: 'Kinyarwanda' },
  { code: 'fr', label: 'FR', full: 'Français' },
];

const en = {

  // Navbar
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.team': 'Team',
  'nav.testimonials': 'Testimonials',
  'nav.contact': 'Contact',
  'nav.call': '0793 929 136',
  'nav.book': 'Book Now',
  'nav.emergencyMobile': 'Emergency Desk',

  // Hero
  'hero.badge': 'Founded 2023 · Near CHUB',
  'hero.headline.line1': 'Finally, Quality',
  'hero.headline.line2': 'Healthcare Without',
  'hero.headline.accent': 'the Kigali Trip.',
  'hero.subtext':
    'Specialized maternity, pediatric, and internal medicine care for Huye families.',
  'hero.cta.book': 'Book Appointment',
  'hero.cta.emergency': 'Emergency Desk',
  'hero.right.label': 'Polyclinic · Huye',
  'hero.right.headline.line1': 'Trusted by families',
  'hero.right.headline.line2': 'across Southern Province.',
  'hero.stat.patients': 'Patients',
  'hero.stat.satisfaction': 'Satisfaction',
  'hero.stat.emergency': 'Emergency',
  'hero.callCta.eyebrow': 'Call 24/7',
  'hero.callCta.number': '+250 793 929 136',

  // About
  'about.badge': 'About Sangwa',
  'about.headline.line1': 'Modern Medicine with a',
  'about.headline.accent': 'Compassionate Heart',
  'about.p1':
    'Founded in late 2023 near CHUB in Huye, Sangwa Polyclinic was established to give families across the region reliable access to specialized maternity and family medical care — without having to travel far from home.',
  'about.p2':
    'Our founder, Sylvie Mpongera, envisioned a healthcare facility that combines international standards with the warmth and familiarity of Rwandan hospitality, where every patient is treated like family.',
  'about.p3':
    "We are building toward a future as a premier regional teaching and international healthcare center, training the next generation of Rwandan healthcare professionals to serve communities like ours.",
  'about.values.compassion': 'Compassion',
  'about.values.compassion.text':
    'Every patient is met with warmth, dignity, and attentive care.',
  'about.values.excellence': 'Excellence',
  'about.values.excellence.text':
    'International standards of clinical practice, held to consistently.',
  'about.values.community': 'Community',
  'about.values.community.text':
    'Rooted in Ngoma, Huye, and accountable to the families we serve.',
  'about.values.growth': 'Growth',
  'about.values.growth.text':
    'Investing today in the teaching hospital of tomorrow.',
  'about.vision': 'Our Vision',
  'about.vision.text':
    "To become East Africa's leading community-based teaching hospital.",
  'about.mission': 'Our Mission',
  'about.mission.text':
    'Delivering exceptional, patient-centered care to every member of our community.',
  'about.cta.explore': 'Explore Our Services',
  'about.cta.learn': 'Learn More →',
  'about.journey.title': 'Our Journey',
  'about.journey.subtitle':
    "From a founder's vision to a growing regional clinic — and the teaching hospital we're building toward.",
  'about.fact.established': 'Established',
  'about.fact.establishedValue': 'Late 2023',
  'about.fact.founder': 'Founder',
  'about.fact.founderValue': 'Sylvie Mpongera',
  'about.fact.location': 'Location',
  'about.fact.locationValue': 'Ngoma, Huye · Rwanda',
  'about.fact.vision': 'Future Vision',
  'about.fact.visionValue': 'Teaching Hospital',
  'about.journey.s1.label': 'Late 2023',
  'about.journey.s1.title': 'Sangwa Polyclinic is founded',
  'about.journey.s1.text':
    'Established near CHUB in Huye to bring specialized maternity and family medical care closer to home.',
  'about.journey.s2.label': 'Today',
  'about.journey.s2.title': 'Regional care, close to home',
  'about.journey.s2.text':
    'A growing clinical team delivering patient-centered maternity and family medicine to the community.',
  'about.journey.s3.label': 'The Vision',
  'about.journey.s3.title': 'A premier teaching hospital',
  'about.journey.s3.text':
    'Training the next generation of Rwandan healthcare professionals, for East Africa and beyond.',
  'about.quote': '"We wanted a place where international standards of care meet the warmth of Rwandan hospitality."',
  'about.quoteCite': '— Sylvie Mpongera, Founder',

  // Services
  'services.badge': 'Our Services',
  'services.headline.line1': 'Comprehensive Care',
  'services.headline.accent': 'Under One Roof',
  'services.subtext':
    "From maternity to internal medicine, we provide specialized healthcare services tailored to your family's needs.",
  'services.item.maternity.title': 'Obstetrics & Maternity',
  'services.item.maternity.text':
    'Specialized delivery suites, prenatal, and postnatal care designed for mother and child comfort.',
  'services.item.maternity.f1': 'Private delivery rooms',
  'services.item.maternity.f2': 'Family accommodation',
  'services.item.maternity.f3': '24/7 midwife support',
  'services.item.internal.title': 'Internal Medicine',
  'services.item.internal.text':
    'Expert diagnosis and ongoing management of adult conditions with comprehensive care plans.',
  'services.item.internal.f1': 'Chronic disease management',
  'services.item.internal.f2': 'Preventive care',
  'services.item.internal.f3': 'Health screenings',
  'services.item.pediatrics.title': 'Pediatrics',
  'services.item.pediatrics.text':
    'Dedicated, compassionate healthcare for infants, children, and adolescents in a child-friendly environment.',
  'services.item.pediatrics.f1': 'Developmental screenings',
  'services.item.pediatrics.f2': 'Vaccinations',
  'services.item.pediatrics.f3': 'Growth monitoring',
  'services.item.amenities.title': 'Inpatient Amenities',
  'services.item.amenities.text':
    'On-site patient dining, private storage lockers, and structured care environments for comfortable recovery.',
  'services.item.amenities.f1': 'Nutritious meals',
  'services.item.amenities.f2': 'Private lockers',
  'services.item.amenities.f3': 'Comfortable rooms',
  'services.item.lab.title': 'Laboratory Services',
  'services.item.lab.text':
    'On-site diagnostics with rapid results for accurate and timely treatment decisions.',
  'services.item.lab.f1': 'Blood tests',
  'services.item.lab.f2': 'Urinalysis',
  'services.item.lab.f3': 'Microbiology',
  'services.item.pharmacy.title': 'Pharmacy',
  'services.item.pharmacy.text':
    'Fully-stocked dispensary with prescribed medications and professional pharmaceutical care.',
  'services.item.pharmacy.f1': 'Prescription filling',
  'services.item.pharmacy.f2': 'Medication counseling',
  'services.item.pharmacy.f3': 'Health products',
  'services.bookCta': 'Book this service →',
  'services.trust.patients': 'Patients Served',
  'services.trust.satisfaction': 'Satisfaction Rate',
  'services.trust.wait': 'Avg. Wait Time',
  'services.trust.emergency': 'Emergency Care',

  // Why
  'why.badge': 'Why Sangwa',
  'why.headline.line1': 'Why Choose',
  'why.headline.accent': 'Sangwa Polyclinic',
  'why.subtext':
    'We combine modern medicine with Rwandan hospitality to deliver healthcare that truly cares for you and your family.',
  'why.reason.care.title': 'Compassionate Care',
  'why.reason.care.text':
    'Every patient receives personalized attention in a warm, supportive environment.',
  'why.reason.specialists.title': 'Expert Specialists',
  'why.reason.specialists.text':
    'Our team brings years of experience in maternity, pediatrics, and internal medicine.',
  'why.reason.wait.title': 'Minimal Wait Times',
  'why.reason.wait.text':
    'Efficient scheduling ensures you spend less time waiting and more time healing.',
  'why.reason.quality.title': 'Trusted Quality',
  'why.reason.quality.text':
    'We maintain the highest standards of medical care and patient safety.',
  'why.reason.lang.title': 'Multilingual Staff',
  'why.reason.lang.text':
    'We communicate in Kinyarwanda, French, and English for your comfort.',
  'why.reason.tech.title': 'Modern Technology',
  'why.reason.tech.text':
    'Digital health records and online booking for seamless patient experience.',
  'why.stat.emergency': 'Emergency Care',
  'why.stat.beds': 'Beds Available',
  'why.stat.specialists': 'Specialists',
  'why.stat.rating': 'Patient Rating',
  'why.quote':
    '"Quality healthcare shouldn\'t require a trip to Kigali. We bring world-class care to Huye."',
  'why.quoteCite': '— Sangwa Polyclinic Team',

  // Testimonials
  'test.badge': 'Patient Stories',
  'test.headline.line1': 'What Our',
  'test.headline.accent': 'Patients',
  'test.headline.line2': 'Say',
  'test.subtext':
    'Real stories from real patients who found compassionate care at Sangwa Polyclinic.',
  'test.verified': 'Verified',
  'test.rosterTitle': 'Rostered this quarter',

  // Booking
  'book.title': 'Book Appointment',
  'book.step': 'Step {step} of 4',
  'book.patientName': 'Patient Name',
  'book.phone': 'Phone Number',
  'book.email': 'Email (optional)',
  'book.service': 'Select Service',
  'book.date': 'Preferred Date',
  'book.time': 'Preferred Time',
  'book.notes': 'Additional Notes',
  'book.next': 'Next Step →',
  'book.back': '← Back',
  'book.confirm': 'Confirm Appointment',
  'book.submitting': 'Submitting...',
  'book.success': 'Appointment Confirmed!',
  'book.successSub':
    "We'll send a confirmation SMS to {phone} shortly.",
  'book.ref': 'Reference',
  'book.paymentTitle': 'Payment Method',
  'book.paymentSub':
    'Choose how you would like to settle the consultation fee.',
  'book.payOnArrival': 'Pay on arrival',
  'book.payOnArrivalText':
    'Settle the consultation fee in cash or with card at reception.',
  'book.momo': 'Mobile Money (MoMo)',
  'book.momoText':
    'Pay instantly via MTN MoMo or Airtel Money. You will receive a prompt to confirm on your phone.',
  'book.momoHelp':
    'After confirming the appointment, you will receive a payment prompt on your registered mobile number within 60 seconds.',
  'book.momoProvider': 'Provider',
  'book.momoProviderMTN': 'MTN MoMo',
  'book.momoProviderAirtel': 'Airtel Money',
  'book.notesPh': 'Any special requests or symptoms to note...',
  'book.chooseService': 'Choose a service',
  'book.selectTime': 'Select time',
  'book.errorSubmit': 'Error booking appointment. Please try again.',
  'book.successToast':
    '✅ Appointment request received! Reception will confirm via SMS shortly.',

  // Footer / Contact
  'footer.about':
    'Delivering high-quality, compassionate healthcare to the Huye community and surrounding regions since 2023.',
  'footer.quick': 'Quick Links',
  'footer.contact': 'Contact & Hours',
  'footer.stay': 'Stay Updated',
  'footer.subscribeText': 'Subscribe to receive health tips and clinic updates.',
  'footer.emailPh': 'Your email address',
  'footer.subscribe': 'Subscribe',
  'footer.subscribed': '✓ Subscribed!',
  'footer.hours.weekday': 'Mon-Sat: 7:00 AM – 8:00 PM',
  'footer.hours.sunday': 'Sundays: Emergencies Only',
  'footer.emergency24': '24/7 Emergency',
  'footer.emergencyHelp':
    'Call our emergency desk anytime:',
  'footer.address.line1': 'Ngoma Sector, Huye District',
  'footer.address.line2': 'Near CHUB, Rwanda',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.top': 'Back to Top',
  'footer.madeWith': 'Made with',
  'footer.inRwanda': 'in Rwanda',
  'footer.copyright': '© 2026 Sangwa Polyclinic',
  'footer.emergencyLabel': 'Emergency Hotline:',
  'footer.available247': '24/7 Available',

  // Map / Contact section
  'map.badge': 'Find Us',
  'map.title': 'Visit Sangwa Polyclinic',
  'map.subtitle':
    'Located in Ngoma, Huye — a short trip from CHUB and Huye town centre.',
  'map.directionsCta': 'Get directions from CHUB',
  'map.transport.title': 'Getting here',
  'map.transport.text':
    'Accessible by public transport (motorbike or taxi from Huye town centre, approximately 10 minutes from CHUB). Free on-site parking available for private vehicles.',
  'map.addressLabel': 'Address',
  'map.hoursLabel': 'Opening hours',
  'map.callLabel': 'Call us',
  'map.brochure': 'Download brochure (PDF)',

  // Live chat
  'chat.ariaOpen': 'Open chat with reception',
  'chat.ariaClose': 'Close chat',
  'chat.headerName': 'Sangwa Reception',
  'chat.headerStatus': 'Online • Avg. reply 2 min',
  'chat.greeting':
    "Hello! 👋 Welcome to Sangwa Polyclinic. How can we help you today?",
  'chat.inputPh': 'Type a message...',
  'chat.send': 'Send message',
  'chat.quick.book': 'Book appointment',
  'chat.quick.emergency': 'Emergency info',
  'chat.quick.hours': 'Opening hours',
  'chat.quick.whatsapp': 'Chat on WhatsApp',
  'chat.resp.book':
    'Great — you can book in 30 seconds using the form here. Or I can route you to our reception team now.',
  'chat.resp.emergency':
    'Our 24/7 emergency line is 079 392 9136. For life-threatening cases, please call immediately.',
  'chat.resp.hours':
    "We're open Mon–Sat 7am–8pm. Sundays are emergencies only. Our lab and pharmacy follow the same hours.",
  'chat.resp.fallback': 'Thanks — a team member will be with you in a moment.',
  'chat.whatsappCta': 'Continue on WhatsApp',
  'chat.whatsappHint': 'Opens wa.me/250793929136 in a new tab.',

  // Mobile sticky bar
  'mobileBar.emergency': 'Emergency',
  'mobileBar.call': 'Call',
  'mobileBar.book': 'Book',

  //VirtualTour keys:
  'virtualTour.badge': 'Virtual Tour',
  'virtualTour.title': 'Explore Sangwa Before You Arrive',
  'virtualTour.subtitle': 'Take a 360° walkthrough of our facility — coming soon!',
  'virtualTour.comingSoon': 'Virtual Tour Coming Soon',
  'virtualTour.description': 'We\'re currently capturing 360° imagery of our facility. Check back soon to explore Sangwa from anywhere.',
  'virtualTour.areas.reception': 'Reception',
  'virtualTour.areas.maternity': 'Maternity Ward',
  'virtualTour.areas.consultation': 'Consultation Rooms',
  'virtualTour.areas.pharmacy': 'Pharmacy',
  'virtualTour.locationHint': 'Ngoma, Huye — Near CHUB',
  'virtualTour.areaLabel': 'Coming soon',


  // Generic
  'generic.patientIndex': 'Patient',
  'generic.reviewLabel': 'avg · 50+ reviews',
  'test.rosterTitle': 'Rostered this quarter',
  'chat.whatsappHint': 'Opens wa.me/250793929136 in a new tab.',
};

const rw = {
  // Navbar
  'nav.about': 'Ibyo dukora',
  'nav.services': 'Serivisi',
  'nav.team': 'Itsinda',
  'nav.testimonials': 'Ubunyamwuga',
  'nav.contact': 'Twandikire',
  'nav.call': '0793 929 136',
  'nav.book': 'Fata Igihe',
  'nav.emergencyMobile': 'Ibyihutwa',

  // Hero
  'hero.badge': 'Yashyizweho 2023 · Hafi ya CHUB',
  'hero.headline.line1': 'Ubwiza bwa',
  'hero.headline.line2': 'Sérivisi z’ubuzima',
  'hero.headline.accent': 'utarajya i Kigali.',
  'hero.subtext':
    'Serivisi zihariye zo kubyaro, abana, n’iby’imbere mu mubiri ku miryango ya Huye.',
  'hero.cta.book': 'Fata Igihe cyo Kwa Muganga',
  'hero.cta.emergency': 'Ibyihutwa',
  'hero.right.label': 'Polyclinic · Huye',
  'hero.right.headline.line1': 'Twizigamiwe n’',
  'hero.right.headline.line2': 'imiryango y’Amajyepfo.',
  'hero.stat.patients': 'Abantu',
  'hero.stat.satisfaction': 'Gushimishijwe',
  'hero.stat.emergency': 'Ibyihutwa',
  'hero.callCta.eyebrow': 'Hamagara 24/7',
  'hero.callCta.number': '+250 793 929 136',

  // About
  'about.badge': 'Ibyerekeye Sangwa',
  'about.headline.line1': 'Ubuvuzi bwa none',
  'about.headline.accent': 'bw’iheharye',
  'about.p1':
    'Yashinzwe mu mwaka wa 2023 hafi ya CHUB i Huye, Sangwa Polyclinic yashyizweho kugira ngo imiryango y’akarere ibone serivisi zihariye zo kubyaro n’ubuzimi bw’umuryango — batajya kure.',
  'about.p2':
    'Uwashinze, Sylvie Mpongera, yari afite icyerekezo cy’aho ubuvuzi bwiza mpuzamahanga buhura n’ubugwaneza bw’ubwakiranye bwa Rwanda.',
  'about.p3':
    'Dukora tuberekeza kuba kigo cyigisha n’ubuvuzi mpuzamahanga, tuhugura abanyamwuga b’ubuzima bazagera ku baturage nk’iwacu.',
  'about.values.compassion': 'Ubugwaneza',
  'about.values.compassion.text':
    'Buri murwayi yakirwa n’ubugwaneza, agaciro n’ubwitange.',
  'about.values.excellence': 'Ubwiza',
  'about.values.excellence.text':
    'Amahame mpuzamahanga y’ubuvuzi ashyirwa mu bikorwa bihoraho.',
  'about.values.community': 'Umuryango',
  'about.values.community.text':
    'Dushingiye i Ngoma, Huye, kandi tukanabarira imiryango dukorera.',
  'about.values.growth': 'Iterambere',
  'about.values.growth.text':
    'Twishyira mu bitaro bigisha bizaza.',
  'about.vision': 'Icyerekezo',
  'about.vision.text':
    "Kuba ibitaro bigisha by’umuryango bya mbere mu Burasirazuba bwa Afurika.",
  'about.mission': 'Intego',
  'about.mission.text':
    'Tanga ubuvuzi buhebuje, bushingiye ku murwayi, ku buntu bwacu bwose.',
  'about.cta.explore': 'Reba Serivisi',
  'about.cta.learn': 'Menya byinshi →',
  'about.journey.title': 'Inzira yacu',
  'about.journey.subtitle':
    'Kuva ku cyerekezo cy’uwashinze kugera ku kigo gikura — n’ibitaro bigisha turimo twubaka.',
  'about.fact.established': 'Yashyizweho',
  'about.fact.establishedValue': 'Mu mwaka wa 2023',
  'about.fact.founder': 'Uwashinze',
  'about.fact.founderValue': 'Sylvie Mpongera',
  'about.fact.location': 'Aho iherereye',
  'about.fact.locationValue': 'Ngoma, Huye · u Rwanda',
  'about.fact.vision': 'Icyerekezo',
  'about.fact.visionValue': 'Ibitaro Bigisha',
  'about.journey.s1.label': '2023',
  'about.journey.s1.title': 'Sangwa Polyclinic yashyizweho',
  'about.journey.s1.text':
    'Yashyizwe hafi ya CHUB i Huye kugira ngo yegere abaturage serivisi z’ubuzima bw’umuryango.',
  'about.journey.s2.label': 'Ubu',
  'about.journey.s2.title': 'Serivisi z’akarere, hafi y’iwanyu',
  'about.journey.s2.text':
    'Itsinda ry’abaganga rikora ritanga ubuvuzi bwiza ku babyeyi n’abana.',
  'about.journey.s3.label': 'Icyerekezo',
  'about.journey.s3.title': 'Ibitaro bigisha bya mbere',
  'about.journey.s3.text':
    'Tuhugura abanyamwuga b’ubuzima b’u Rwanda bazagera mu Burasirazuba bwa Afurika.',
  'about.quote': '"Twari dufite icyerekezo cyo guhuza ubuvuzi bwa mpuzamahanga n’ubugwaneza bw’u Rwanda."',
  'about.quoteCite': '— Sylvie Mpongera, Uwashinze',

  // Services
  'services.badge': 'Serivisi zacu',
  'services.headline.line1': 'Ubuvuzi bwuzuye',
  'services.headline.accent': 'mu nzu imwe',
  'services.subtext':
    'Kuva ku kubyaro kugera ku bwandu bw’imbere, dutanga serivisi z’ubuzima zihariye ku muryango wawe.',
  'services.item.maternity.title': 'Kubyara no ku bakenyezi',
  'services.item.maternity.text':
    'Ibyumba byihariye byo kubyara n’ubujyanama bw’imbere n’inyuma y’ibyara.',
  'services.item.maternity.f1': 'Ibyumba byihariye',
  'services.item.maternity.f2': 'Icumbi ry’umuryango',
  'services.item.maternity.f3': 'Ubufasha bwa sage 24/7',
  'services.item.internal.title': 'Ubuvuzi bw’imbere',
  'services.item.internal.text':
    'Isesengura ry’indwara z’abakuze n’ubuvuzi buhoraho.',
  'services.item.internal.f1': 'Indwara z’igihe kirekire',
  'services.item.internal.f2': 'Ubuvuzi bwo kwirinda',
  'services.item.internal.f3': 'Gupima ubuzima',
  'services.item.pediatrics.title': 'Abana',
  'services.item.pediatrics.text':
    'Ubuvuzi bw’umwana mu buryo bwiza bwabugenewe.',
  'services.item.pediatrics.f1': 'Gupima iterambere',
  'services.item.pediatrics.f2': 'Inkingo',
  'services.item.pediatrics.f3': 'Gukurikirana ukura',
  'services.item.amenities.title': 'Ibikoresho byo kuruhukiramo',
  'services.item.amenities.text':
    'Ibifunguro, kontineri bwite, n’ibidukikije byiza byo gukira.',
  'services.item.amenities.f1': 'Ibifunguro byiza',
  'services.item.amenities.f2': 'Kontineri bwite',
  'services.item.amenities.f3': 'Ibyumba bishimishije',
  'services.item.lab.title': 'Serivisi z’ishyamba',
  'services.item.lab.text':
    'Ibipimo vyihuse kugira ngo ubuvuzi butangwe mu gihe.',
  'services.item.lab.f1': 'Ibyipimo by’amaraso',
  'services.item.lab.f2': 'Inyenga',
  'services.item.lab.f3': 'Microbiology',
  'services.item.pharmacy.title': 'Farumasi',
  'services.item.pharmacy.text':
    'Farumasi yuzuye n’inama z’ubuvuzi.',
  'services.item.pharmacy.f1': 'Gutanga imiti',
  'services.item.pharmacy.f2': 'Inama ku miti',
  'services.item.pharmacy.f3': 'Ibicuruzwa by’ubuzima',
  'services.bookCta': 'Fata iyi serivisi →',
  'services.trust.patients': 'Abantu bayisuye',
  'services.trust.satisfaction': 'Gushimishijwe',
  'services.trust.wait': 'Igihe cyo gutegereza',
  'services.trust.emergency': 'Ibyihutwa',

  // Why
  'why.badge': 'Kuki Sangwa',
  'why.headline.line1': 'Hitamo',
  'why.headline.accent': 'Sangwa Polyclinic',
  'why.subtext':
    'Duhuza ubuvuzi bwa none n’ubugwaneza bw’u Rwanda kugira ngo tugufashe neza.',
  'why.reason.care.title': 'Ubugwaneza',
  'why.reason.care.text':
    'Buri murwayi ahabwa umwanya wihariye mu bidukikije bishyushye.',
  'why.reason.specialists.title': 'Abaganga b’inzobere',
  'why.reason.specialists.text':
    'Itsinda ryacu riyoboye mu kubyaro, abana n’ubuvuzi bw’imbere.',
  'why.reason.wait.title': 'Igihe gito cyo gutegereza',
  'why.reason.wait.text':
    'Gutegura neza bigufasha gutegereza gato, ukira vuba.',
  'why.reason.quality.title': 'Ubwiza bwizewe',
  'why.reason.quality.text':
    'Turinda amahare yo hejuru y’ubuvuzi n’umutekano w’umurwayi.',
  'why.reason.lang.title': 'Indimi zitandukanye',
  'why.reason.lang.text':
    'Tuvuga Ikinyarwanda, Igifaransa, n’icyongereza.',
  'why.reason.tech.title': 'Ikoranabuhanga rya none',
  'why.reason.tech.text':
    'Mafishi y’ubuzima mu ikoranabuhanga no gutanga ibiki byo kwa muganga.',
  'why.stat.emergency': 'Ibyihutwa',
  'why.stat.beds': 'Ibitaro biriho',
  'why.stat.specialists': 'Abaganga b’inzobere',
  'why.stat.rating': 'Amanota y’abarwayi',
  'why.quote':
    '"Ubuvuzi bwiza ntibukwiye gusaba kujya i Kigali. Tuzana serivisi nziza i Huye."',
  'why.quoteCite': '— Ikipe ya Sangwa Polyclinic',

  // Testimonials
  'test.badge': 'Inkuru z’abarwayi',
  'test.headline.line1': 'Ibyo',
  'test.headline.accent': 'Abarwayi bacu',
  'test.headline.line2': 'Bavuga',
  'test.subtext':
    'Inkuru z’ukuri z’abarwayi babonye ubuvuzi bwiza i Sangwa.',
  'test.verified': 'Byemejwe',
  'test.rosterTitle': 'Abarwayi b’iki gihe',

  // Booking
  'book.title': 'Fata Igihe',
  'book.step': 'Igikorwa {step} muri 4',
  'book.patientName': 'Izina ry’umurwayi',
  'book.phone': 'Numero ya telefone',
  'book.email': 'Imeli (si ngombwa)',
  'book.service': 'Hitamo serivisi',
  'book.date': 'Itariki ushaka',
  'book.time': 'Isaha ushaka',
  'book.notes': 'Ibindi bisobanuro',
  'book.next': 'Ibikurikira →',
  'book.back': '← Garuka',
  'book.confirm': 'Emeza',
  'book.submitting': 'Biracyoherezwa...',
  'book.success': 'Igihe cyemejwe!',
  'book.successSub':
    'Tuzohereza ubutumwa bwa SMS kuri {phone} vuba.',
  'book.ref': 'Numero',
  'book.paymentTitle': 'Uburyo bwo kwishyura',
  'book.paymentSub':
    'Hitamo uburyo ushaka kwishyuramo amafaranga yo kwa muganga.',
  'book.payOnArrival': 'Ishyura mu gihe uzaza',
  'book.payOnArrivalText':
    'Ishyura mu mafaranga cyangwa ikarita mu biro by’ubwakiranyi.',
  'book.momo': 'Mobile Money (MoMo)',
  'book.momoText':
    'Ishyura na MTN MoMo cyangwa Airtel Money. Uzabona ubutumwa busaba kwemeza kuri telefone yawe.',
  'book.momoHelp':
    'Nyuma y’igihe cyo kwemeza, uzabona ubutumwa bwo kwishyura kuri numero yawe mu minota 60.',
  'book.momoProvider': 'Utanga serivisi',
  'book.momoProviderMTN': 'MTN MoMo',
  'book.momoProviderAirtel': 'Airtel Money',
  'book.notesPh': 'Ibindi bisobanuro ushaka gutanga...',
  'book.chooseService': 'Hitamo serivisi',
  'book.selectTime': 'Hitamo isaha',
  'book.errorSubmit':
    'Habaye ikibazo mu gutanga igihe. Ongera ugerageze.',
  'book.successToast':
    '✅ Igihe cyawe cyakiriwe! Ubwakiranyi buzagusubiza vuba na SMS.',

  // Footer
  'footer.about':
    'Tanga ubuvuzi bwiza n’ubugwaneza ku baturage ba Huye n’uturere duturanye kuva 2023.',
  'footer.quick': 'Ihuza rya vuba',
  'footer.contact': 'Aho tubarizwa n’amasaha',
  'footer.stay': 'Komeza ubimenye',
  'footer.subscribeText':
    'Komeza wibonera inama z’ubuzima n’amakuru y’ibitaro.',
  'footer.emailPh': 'Imeli yawe',
  'footer.subscribe': 'Iyandikishe',
  'footer.subscribed': '✓ Wiyandikishije!',
  'footer.hours.weekday': 'Ku wa mbere – Ku wa gatandatu: 7:00 – 20:00',
  'footer.hours.sunday': 'Ku cyumweru: ibyihutwa gusa',
  'footer.emergency24': 'Ibyihutwa 24/7',
  'footer.emergencyHelp':
    'Hamagara ibiro by’ibyihutwa igihe cyose:',
  'footer.address.line1': 'Akagari ka Ngoma, Akarere ka Huye',
  'footer.address.line2': 'Hafi ya CHUB, u Rwanda',
  'footer.privacy': 'Politiki y’ibanga',
  'footer.terms': 'Amategeko',
  'footer.top': 'Garuka hejuru',
  'footer.madeWith': 'Yakozwe',
  'footer.inRwanda': 'mu Rwanda',
  'footer.copyright': '© 2026 Sangwa Polyclinic',
  'footer.emergencyLabel': 'Telefone y’ibyihutwa:',
  'footer.available247': 'Biraboneka 24/7',

  // Map
  'map.badge': 'Aho Tubarizwa',
  'map.title': 'Sura Sangwa Polyclinic',
  'map.subtitle':
    'Iherereye i Ngoma, Huye — hafi ya CHUB no mu mujyi wa Huye.',
  'map.directionsCta': 'Amazere aturuka kuri CHUB',
  'map.transport.title': 'Uko binyuze',
  'map.transport.text':
    'Binyuze mu modoka rusange (piki cyangwa tagisi ku mujyi wa Huye, iminota 10 uvuye kuri CHUB). Ahantu ho kuhagarika imodoka bwite ni ubuntu.',
  'map.addressLabel': 'Aderesi',
  'map.hoursLabel': 'Amasaha',
  'map.callLabel': 'Tuhamagare',
  'map.brochure': 'Kura amakuru yose (PDF)',

  // Live chat
  'chat.ariaOpen': 'Fungura ikiganiro n’ubwakiranyi',
  'chat.ariaClose': 'Funga ikiganiro',
  'chat.headerName': 'Ubwakiranyi bwa Sangwa',
  'chat.headerStatus': 'Turahari • Igisubizo mu minota 2',
  'chat.greeting':
    'Murakaza neza! 👋 Murashobora gufasha iki gihe?',
  'chat.inputPh': 'Andika ubutumwa...',
  'chat.send': 'Ohereza ubutumwa',
  'chat.quick.book': 'Fata igihe',
  'chat.quick.emergency': 'Amakuru y’ibyihutwa',
  'chat.quick.hours': 'Amasaha yo gufungura',
  'chat.quick.whatsapp': 'Komeza kuri WhatsApp',
  'chat.resp.book':
    'Byiza — ushobora gufata igihe mu masegonda 30 ukoresheje ifishi hano.',
  'chat.resp.emergency':
    'Umurongo w’ibyihutwa 24/7 ni 079 392 9136. Ku bibazo bikomeye, hamagara ako kanya.',
  'chat.resp.hours':
    'Tufungura ku wa mbere – ku wa gatandatu 7h – 20h. Ku cyumweru ni ibyihutwa gusa.',
  'chat.resp.fallback':
    'Murakoze — umwe mu itsinda rizababwira mu kanya.',
  'chat.whatsappCta': 'Komeza kuri WhatsApp',
  'chat.whatsappHint': 'Ifungura wa.me/250793929136 mu rubuga rushya.',

  // Mobile sticky bar
  'mobileBar.emergency': 'Ibyihutwa',
  'mobileBar.call': 'Hamagara',
  'mobileBar.book': 'Fata',

  // Generic
  'generic.patientIndex': 'Umurwayi',
  'generic.reviewLabel': 'amanota · 50+ ibitekerezo',
  'test.rosterTitle': 'Abarwayi b\'iki gihe',
  'chat.whatsappHint': 'Ifungura wa.me/250793929136 mu rubuga rushya.',
  'virtualTour.badge': 'Urugendo rwo Kureba',
  'virtualTour.title': 'Sura Sangwa Mbere Yo Kuza',
  'virtualTour.subtitle': 'Kora urugendo rwo kureba 360° mu kigo cyacu — bizaza vuba!',
  'virtualTour.comingSoon': 'Urugendo rwo Kureba Ruzaza Vuba',
  'virtualTour.description': 'Turimo gufata amashusho 360° y\'ikigo cyacu. Garuka vuba kugira ngo usure Sangwa uva aho uri.',
  'virtualTour.areas.reception': 'Ubwakiranyi',
  'virtualTour.areas.maternity': 'Ibyumba by\'Ibyara',
  'virtualTour.areas.consultation': 'Ibyumba by\'Abaganga',
  'virtualTour.areas.pharmacy': 'Farumasi',
  'virtualTour.locationHint': 'Ngoma, Huye — Hafi ya CHUB',
  'virtualTour.areaLabel': 'Bizaza vuba',
};

const fr = {
  // Navbar
  'nav.about': 'À propos',
  'nav.services': 'Services',
  'nav.team': 'Équipe',
  'nav.testimonials': 'Témoignages',
  'nav.contact': 'Contact',
  'nav.call': '0793 929 136',
  'nav.book': 'Réserver',
  'nav.emergencyMobile': 'Urgences',

  // Hero
  'hero.badge': 'Fondée en 2023 · Près du CHUB',
  'hero.headline.line1': 'Enfin, des soins',
  'hero.headline.line2': 'de qualité sans',
  'hero.headline.accent': 'aller à Kigali.',
  'hero.subtext':
    'Soins spécialisés en maternité, pédiatrie et médecine interne pour les familles de Huye.',
  'hero.cta.book': 'Prendre rendez-vous',
  'hero.cta.emergency': 'Urgences',
  'hero.right.label': 'Polyclinique · Huye',
  'hero.right.headline.line1': 'La confiance des',
  'hero.right.headline.line2': 'familles du Sud.',
  'hero.stat.patients': 'Patients',
  'hero.stat.satisfaction': 'Satisfaction',
  'hero.stat.emergency': 'Urgences',
  'hero.callCta.eyebrow': 'Appelez 24/7',
  'hero.callCta.number': '+250 793 929 136',

  // About
  'about.badge': 'À propos de Sangwa',
  'about.headline.line1': 'Médecine moderne,',
  'about.headline.accent': 'cœur compatissant',
  'about.p1':
    'Fondée fin 2023 près du CHUB à Huye, la Polyclinique Sangwa a été créée pour offrir aux familles de la région un accès fiable à des soins spécialisés en maternité et en médecine familiale — sans avoir à voyager loin.',
  'about.p2':
    'Notre fondatrice, Sylvie Mpongera, a imaginé un établissement qui allie les normes internationales à la chaleur de l’hospitalité rwandaise.',
  'about.p3':
    'Nous œuvrons à devenir un centre d’enseignement et de soins de référence, formant la prochaine génération de professionnels de santé au Rwanda.',
  'about.values.compassion': 'Bienveillance',
  'about.values.compassion.text':
    'Chaque patient est accueilli avec chaleur, dignité et attention.',
  'about.values.excellence': 'Excellence',
  'about.values.excellence.text':
    'Des normes cliniques internationales, appliquées avec constance.',
  'about.values.community': 'Communauté',
  'about.values.community.text':
    'Enracinés à Ngoma, Huye, redevables envers les familles que nous servons.',
  'about.values.growth': 'Croissance',
  'about.values.growth.text':
    'Investir aujourd’hui pour l’hôpital universitaire de demain.',
  'about.vision': 'Notre vision',
  'about.vision.text':
    "Devenir le premier hôpital communautaire universitaire d'Afrique de l'Est.",
  'about.mission': 'Notre mission',
  'about.mission.text':
    'Offrir des soins centrés sur le patient, d’une qualité exceptionnelle, à chaque membre de notre communauté.',
  'about.cta.explore': 'Découvrir nos services',
  'about.cta.learn': 'En savoir plus →',
  'about.journey.title': 'Notre parcours',
  'about.journey.subtitle':
    'D’une vision fondatrice à une clinique régionale en pleine croissance — et l’hôpital universitaire que nous construisons.',
  'about.fact.established': 'Fondée',
  'about.fact.establishedValue': 'Fin 2023',
  'about.fact.founder': 'Fondatrice',
  'about.fact.founderValue': 'Sylvie Mpongera',
  'about.fact.location': 'Localisation',
  'about.fact.locationValue': 'Ngoma, Huye · Rwanda',
  'about.fact.vision': 'Vision',
  'about.fact.visionValue': 'Hôpital universitaire',
  'about.journey.s1.label': 'Fin 2023',
  'about.journey.s1.title': 'Création de la Polyclinique Sangwa',
  'about.journey.s1.text':
    'Fondée près du CHUB à Huye pour rapprocher les soins spécialisés en maternité et en famille des habitants.',
  'about.journey.s2.label': "Aujourd'hui",
  'about.journey.s2.title': 'Soins régionaux, près de chez vous',
  'about.journey.s2.text':
    'Une équipe clinique croissante qui offre des soins centrés sur la mère et la famille.',
  'about.journey.s3.label': 'La vision',
  'about.journey.s3.title': 'Un hôpital universitaire de référence',
  'about.journey.s3.text':
    'Former la prochaine génération de professionnels de santé rwandais, pour l’Afrique de l’Est et au-delà.',
  'about.quote': '"Nous voulions un lieu où les normes internationales de soins rencontrent la chaleur de l’hospitalité rwandaise."',
  'about.quoteCite': '— Sylvie Mpongera, Fondatrice',

  // Services
  'services.badge': 'Nos services',
  'services.headline.line1': 'Des soins complets',
  'services.headline.accent': 'sous un même toit',
  'services.subtext':
    'De la maternité à la médecine interne, nous offrons des soins spécialisés adaptés aux besoins de votre famille.',
  'services.item.maternity.title': 'Obstétrique & Maternité',
  'services.item.maternity.text':
    'Salles d’accouchement privées, soins prénataux et postnataux pensés pour la mère et l’enfant.',
  'services.item.maternity.f1': 'Salles d’accouchement privées',
  'services.item.maternity.f2': 'Hébergement familial',
  'services.item.maternity.f3': 'Sage-femme 24/7',
  'services.item.internal.title': 'Médecine interne',
  'services.item.internal.text':
    'Diagnostic expert et prise en charge continue des pathologies adultes avec plans de soins complets.',
  'services.item.internal.f1': 'Maladies chroniques',
  'services.item.internal.f2': 'Médecine préventive',
  'services.item.internal.f3': 'Dépistages',
  'services.item.pediatrics.title': 'Pédiatrie',
  'services.item.pediatrics.text':
    'Soins attentionnés pour nourrissons, enfants et adolescents dans un environnement adapté.',
  'services.item.pediatrics.f1': 'Bilans de développement',
  'services.item.pediatrics.f2': 'Vaccinations',
  'services.item.pediatrics.f3': 'Suivi de croissance',
  'services.item.amenities.title': 'Hospitalisation',
  'services.item.amenities.text':
    'Restauration sur place, casiers privés et espaces de récupération confortables.',
  'services.item.amenities.f1': 'Repas équilibrés',
  'services.item.amenities.f2': 'Casiers privés',
  'services.item.amenities.f3': 'Chambres confortables',
  'services.item.lab.title': 'Laboratoire',
  'services.item.lab.text':
    'Diagnostics sur place avec des résultats rapides pour des décisions de traitement opportunes.',
  'services.item.lab.f1': 'Analyses sanguines',
  'services.item.lab.f2': 'Analyses urinaires',
  'services.item.lab.f3': 'Microbiologie',
  'services.item.pharmacy.title': 'Pharmacie',
  'services.item.pharmacy.text':
    'Pharmacie bien approvisionnée avec médicaments prescrits et conseils pharmaceutiques professionnels.',
  'services.item.pharmacy.f1': 'Délivrance d’ordonnances',
  'services.item.pharmacy.f2': 'Conseil pharmaceutique',
  'services.item.pharmacy.f3': 'Produits de santé',
  'services.bookCta': 'Réserver ce service →',
  'services.trust.patients': 'Patients soignés',
  'services.trust.satisfaction': 'Satisfaction',
  'services.trust.wait': "Attente moyenne",
  'services.trust.emergency': 'Urgences',

  // Why
  'why.badge': 'Pourquoi Sangwa',
  'why.headline.line1': 'Pourquoi choisir',
  'why.headline.accent': 'la Polyclinique Sangwa',
  'why.subtext':
    'Nous combinons médecine moderne et hospitalité rwandaise pour des soins qui prennent vraiment soin de vous.',
  'why.reason.care.title': 'Soins bienveillants',
  'why.reason.care.text':
    'Chaque patient reçoit une attention personnalisée dans un environnement chaleureux.',
  'why.reason.specialists.title': 'Spécialistes experts',
  'why.reason.specialists.text':
    'Notre équipe apporte des années d’expérience en maternité, pédiatrie et médecine interne.',
  'why.reason.wait.title': 'Délais minimisés',
  'why.reason.wait.text':
    'Une planification efficace pour passer moins de temps à attendre et plus à guérir.',
  'why.reason.quality.title': 'Qualité reconnue',
  'why.reason.quality.text':
    'Nous maintenons les normes les plus élevées en matière de soins et de sécurité.',
  'why.reason.lang.title': 'Personnel multilingue',
  'why.reason.lang.text':
    'Nous communiquons en kinyarwanda, français et anglais.',
  'why.reason.tech.title': 'Technologie moderne',
  'why.reason.tech.text':
    'Dossiers médicaux numériques et réservation en ligne pour une expérience fluide.',
  'why.stat.emergency': 'Urgences',
  'why.stat.beds': 'Lits disponibles',
  'why.stat.specialists': 'Spécialistes',
  'why.stat.rating': 'Note des patients',
  'why.quote':
    '"Des soins de qualité ne devraient pas exiger un voyage à Kigali. Nous amenons l’excellence à Huye."',
  'why.quoteCite': '— L’équipe de la Polyclinique Sangwa',

  // Testimonials
  'test.badge': 'Témoignages',
  'test.headline.line1': 'Ce que nos',
  'test.headline.accent': 'patients',
  'test.headline.line2': 'disent',
  'test.subtext':
    'Des histoires vraies de patients qui ont trouvé des soins bienveillants à Sangwa.',
  'test.verified': 'Vérifié',
  'test.rosterTitle': 'Ce trimestre',

  // Booking
  'book.title': 'Prendre rendez-vous',
  'book.step': 'Étape {step} sur 4',
  'book.patientName': 'Nom du patient',
  'book.phone': 'Numéro de téléphone',
  'book.email': 'E-mail (facultatif)',
  'book.service': 'Choisir un service',
  'book.date': 'Date souhaitée',
  'book.time': 'Heure souhaitée',
  'book.notes': 'Notes complémentaires',
  'book.next': 'Suivant →',
  'book.back': '← Retour',
  'book.confirm': 'Confirmer',
  'book.submitting': 'Envoi...',
  'book.success': 'Rendez-vous confirmé !',
  'book.successSub':
    'Nous enverrons un SMS de confirmation au {phone} bientôt.',
  'book.ref': 'Référence',
  'book.paymentTitle': 'Mode de paiement',
  'book.paymentSub':
    'Choisissez comment régler les frais de consultation.',
  'book.payOnArrival': 'Payer à l’arrivée',
  'book.payOnArrivalText':
    'Réglez en espèces ou par carte à la réception.',
  'book.momo': 'Mobile Money (MoMo)',
  'book.momoText':
    'Payez instantanément via MTN MoMo ou Airtel Money. Vous recevrez une demande de confirmation sur votre téléphone.',
  'book.momoHelp':
    'Après confirmation du rendez-vous, vous recevrez une demande de paiement sur votre numéro enregistré dans les 60 secondes.',
  'book.momoProvider': 'Opérateur',
  'book.momoProviderMTN': 'MTN MoMo',
  'book.momoProviderAirtel': 'Airtel Money',
  'book.notesPh': 'Toute demande particulière ou symptôme à signaler...',
  'book.chooseService': 'Choisissez un service',
  'book.selectTime': 'Sélectionnez l’heure',
  'book.errorSubmit':
    'Erreur lors de la prise de rendez-vous. Veuillez réessayer.',
  'book.successToast':
    '✅ Demande reçue ! La réception confirmera par SMS sous peu.',

  // Footer
  'footer.about':
    'Des soins de qualité et bienveillants à la communauté de Huye et ses environs depuis 2023.',
  'footer.quick': 'Liens rapides',
  'footer.contact': 'Contact & horaires',
  'footer.stay': 'Restez informé',
  'footer.subscribeText':
    'Recevez nos conseils santé et actualités de la clinique.',
  'footer.emailPh': 'Votre adresse e-mail',
  'footer.subscribe': "S'abonner",
  'footer.subscribed': '✓ Inscrit !',
  'footer.hours.weekday': 'Lun–Sam : 7h00 – 20h00',
  'footer.hours.sunday': 'Dimanches : urgences uniquement',
  'footer.emergency24': 'Urgences 24/7',
  'footer.emergencyHelp':
    'Appelez notre service d’urgences à tout moment :',
  'footer.address.line1': 'Secteur Ngoma, District de Huye',
  'footer.address.line2': 'Près du CHUB, Rwanda',
  'footer.privacy': 'Confidentialité',
  'footer.terms': "Conditions d'utilisation",
  'footer.top': 'Retour en haut',
  'footer.madeWith': 'Fait avec',
  'footer.inRwanda': 'au Rwanda',
  'footer.copyright': '© 2026 Polyclinique Sangwa',
  'footer.emergencyLabel': "Ligne d'urgence :",
  'footer.available247': 'Disponible 24/7',

  // Map
  'map.badge': 'Nous trouver',
  'map.title': 'Visitez la Polyclinique Sangwa',
  'map.subtitle':
    'Située à Ngoma, Huye — à quelques minutes du CHUB et du centre-ville.',
  'map.directionsCta': 'Itinéraire depuis le CHUB',
  'map.transport.title': 'Comment venir',
  'map.transport.text':
    'Accessible en transport en commun (moto ou taxi depuis le centre de Huye, environ 10 minutes depuis le CHUB). Parking gratuit sur place.',
  'map.addressLabel': 'Adresse',
  'map.hoursLabel': "Horaires d'ouverture",
  'map.callLabel': 'Appelez-nous',
  'map.brochure': 'Télécharger la brochure (PDF)',

  // Live chat
  'chat.ariaOpen': 'Ouvrir le chat avec la réception',
  'chat.ariaClose': 'Fermer le chat',
  'chat.headerName': 'Réception Sangwa',
  'chat.headerStatus': 'En ligne • Réponse moyenne 2 min',
  'chat.greeting':
    'Bonjour ! 👋 Bienvenue à la Polyclinique Sangwa. Comment pouvons-nous vous aider ?',
  'chat.inputPh': 'Tapez votre message...',
  'chat.send': 'Envoyer',
  'chat.quick.book': 'Prendre rendez-vous',
  'chat.quick.emergency': 'Infos urgences',
  'chat.quick.hours': "Horaires d'ouverture",
  'chat.quick.whatsapp': 'Continuer sur WhatsApp',
  'chat.resp.book':
    'Très bien — vous pouvez réserver en 30 secondes via le formulaire ici, ou je vous mets en relation avec la réception.',
  'chat.resp.emergency':
    'Notre ligne d’urgence 24/7 est le 079 392 9136. Pour les cas vitaux, appelez immédiatement.',
  'chat.resp.hours':
    'Nous sommes ouverts du lundi au samedi de 7h à 20h. Le dimanche : urgences uniquement.',
  'chat.resp.fallback':
    'Merci — un membre de l’équipe vous répondra dans un instant.',
  'chat.whatsappCta': 'Continuer sur WhatsApp',
  'chat.whatsappHint': 'Ouvre wa.me/250793929136 dans un nouvel onglet.',

  // Mobile sticky bar
  'mobileBar.emergency': 'Urgence',
  'mobileBar.call': 'Appeler',
  'mobileBar.book': 'Réserver',

  // Generic
  'generic.patientIndex': 'Patient',
  'generic.reviewLabel': 'moy. · 50+ avis',
  'test.rosterTitle': 'Ce trimestre',
  'chat.whatsappHint': 'Ouvre wa.me/250793929136 dans un nouvel onglet.',
  'virtualTour.badge': 'Visite virtuelle',
  'virtualTour.title': 'Découvrez Sangwa Avant Votre Venue',
  'virtualTour.subtitle': 'Faites une visite à 360° de notre établissement — bientôt disponible !',
  'virtualTour.comingSoon': 'Visite Virtuelle Bientôt Disponible',
  'virtualTour.description': 'Nous sommes en train de capturer des images à 360° de notre établissement. Revenez bientôt pour explorer Sangwa de n\'importe où.',
  'virtualTour.areas.reception': 'Accueil',
  'virtualTour.areas.maternity': 'Maternité',
  'virtualTour.areas.consultation': 'Salles de Consultation',
  'virtualTour.areas.pharmacy': 'Pharmacie',
  'virtualTour.locationHint': 'Ngoma, Huye — Près du CHUB',
  'virtualTour.areaLabel': 'Bientôt disponible',
};

export const dict = { en, rw, fr };
