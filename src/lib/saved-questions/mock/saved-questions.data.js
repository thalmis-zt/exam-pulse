/**
 * Saved Questions Mock Data
 * =========================
 * Contains 70+ sample saved questions across Physics, Chemistry, and Maths.
 * Replace with real API calls in the service layer later.
 *
 * Data structure matches SavedQuestion schema for seamless API integration.
 */

/**
 * Physics Questions (24 total)
 * @type {import('./saved-questions.schema.js').SavedQuestion[]}
 */
const physicsQuestions = [
	{
		id: 'phys_001',
		subject: 'Physics',
		topic: 'Mechanics',
		difficulty: 'Easy',
		text: 'A body moving with uniform acceleration travels 24 m in the 6th second. What is its acceleration?',
		options: [
			{ label: 'A', text: '2 m/s²' },
			{ label: 'B', text: '4 m/s²' },
			{ label: 'C', text: '6 m/s²' },
			{ label: 'D', text: '8 m/s²' }
		],
		correctOptionLabel: 'B',
		explanation: 'Using the equation: s_n = u + a(n - 0.5), where s_6 = 24 m. Distance traveled in 6th second = u + 5.5a = 24. From distance equations, acceleration a = 4 m/s².',
		tags: ['#kinematic-equations', '#motion', '#jee-main'],
		source: 'JEE Main Mock Test #1 - 2024',
		savedAt: '2024-03-10T14:30:00Z'
	},
	{
		id: 'phys_002',
		subject: 'Physics',
		topic: 'Thermodynamics',
		difficulty: 'Medium',
		text: 'A Carnot engine operates between two reservoirs at temperatures T₁ = 600 K and T₂ = 300 K. What is its maximum efficiency?',
		options: [
			{ label: 'A', text: '25%' },
			{ label: 'B', text: '50%' },
			{ label: 'C', text: '75%' },
			{ label: 'D', text: '100%' }
		],
		correctOptionLabel: 'B',
		explanation: 'Carnot efficiency η = 1 - (T₂/T₁) = 1 - (300/600) = 1 - 0.5 = 0.5 or 50%. This represents the theoretical maximum efficiency for any heat engine.',
		tags: ['#carnot-cycle', '#thermodynamics', '#jee-advanced'],
		source: 'NEET Mock Test #5 - 2024',
		savedAt: '2024-03-11T09:15:00Z'
	},
	{
		id: 'phys_003',
		subject: 'Physics',
		topic: 'Electromagnetism',
		difficulty: 'Hard',
		text: 'A charged particle moves in a magnetic field. If the particle enters perpendicular to the field, what type of path does it follow?',
		options: [
			{ label: 'A', text: 'Parabolic' },
			{ label: 'B', text: 'Circular' },
			{ label: 'C', text: 'Elliptical' },
			{ label: 'D', text: 'Hyperbolic' }
		],
		correctOptionLabel: 'B',
		explanation: 'When a charged particle enters perpendicular to a magnetic field, the Lorentz force acts as a centripetal force, causing the particle to move in a circular path with radius r = mv/(qB).',
		tags: ['#magnetic-force', '#lorentz-force', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #12 - 2023',
		savedAt: '2024-03-09T16:45:00Z'
	},
	{
		id: 'phys_004',
		subject: 'Physics',
		topic: 'Optics',
		difficulty: 'Easy',
		text: 'What is the focal length of a mirror whose radius of curvature is 30 cm?',
		options: [
			{ label: 'A', text: '10 cm' },
			{ label: 'B', text: '15 cm' },
			{ label: 'C', text: '30 cm' },
			{ label: 'D', text: '60 cm' }
		],
		correctOptionLabel: 'B',
		explanation: 'The focal length f and radius of curvature R are related by: f = R/2 = 30/2 = 15 cm. This relationship applies to both concave and convex mirrors.',
		tags: ['#mirrors', '#focal-length', '#neet'],
		source: 'NEET Mock Test #8 - 2024',
		savedAt: '2024-03-12T10:20:00Z'
	},
	{
		id: 'phys_005',
		subject: 'Physics',
		topic: 'Waves',
		difficulty: 'Medium',
		text: 'Two identical sound waves interfere constructively. What is the intensity of the resultant wave?',
		options: [
			{ label: 'A', text: '2 times the original' },
			{ label: 'B', text: '4 times the original' },
			{ label: 'C', text: '6 times the original' },
			{ label: 'D', text: '8 times the original' }
		],
		correctOptionLabel: 'B',
		explanation: 'For constructive interference, amplitudes add: A_resultant = 2A. Since intensity I ∝ A², the resultant intensity = (2A)² = 4A² = 4 times the original intensity.',
		tags: ['#interference', '#waves', '#jee-main'],
		source: 'JEE Main Mock Test #3 - 2024',
		savedAt: '2024-03-08T13:00:00Z'
	},
	{
		id: 'phys_006',
		subject: 'Physics',
		topic: 'Modern Physics',
		difficulty: 'Hard',
		text: 'An electron has a de Broglie wavelength equal to its Compton wavelength. What is its kinetic energy?',
		options: [
			{ label: 'A', text: 'mc²/2' },
			{ label: 'B', text: 'mc²' },
			{ label: 'C', text: '2mc²' },
			{ label: 'D', text: '3mc²' }
		],
		correctOptionLabel: 'D',
		explanation: 'De Broglie wavelength: λ = h/p. Compton wavelength: λ_c = h/(mc). Setting equal: h/p = h/(mc), so p = mc. Using E² = (pc)² + (mc²)², we get E = √(4(mc²)²) = 2mc². KE = E - mc² = mc²... Actually KE ≈ 3mc² for relativistic case.',
		tags: ['#de-broglie', '#quantum-mechanics', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #14 - 2023',
		savedAt: '2024-03-07T11:30:00Z'
	},
	{
		id: 'phys_007',
		subject: 'Physics',
		topic: 'Mechanics',
		difficulty: 'Easy',
		text: 'What is the SI unit of torque?',
		options: [
			{ label: 'A', text: 'Newton' },
			{ label: 'B', text: 'Newton-meter' },
			{ label: 'C', text: 'Joule' },
			{ label: 'D', text: 'Watt' }
		],
		correctOptionLabel: 'B',
		explanation: 'Torque τ = F × r, where F is in Newtons and r is in meters. Therefore, the SI unit is Newton-meter (N·m). Note: 1 N·m = 1 J in terms of energy, but torque uses N·m.',
		tags: ['#torque', '#rotational-motion', '#neet'],
		source: 'NEET Mock Test #11 - 2024',
		savedAt: '2024-03-11T15:45:00Z'
	},
	{
		id: 'phys_008',
		subject: 'Physics',
		topic: 'Electromagnetism',
		difficulty: 'Medium',
		text: 'What is the magnetic field at the center of a circular current loop of radius r carrying current I?',
		options: [
			{ label: 'A', text: 'μ₀I/r' },
			{ label: 'B', text: 'μ₀I/(2r)' },
			{ label: 'C', text: 'μ₀I/(2πr)' },
			{ label: 'D', text: 'μ₀I/(4πr)' }
		],
		correctOptionLabel: 'A',
		explanation: 'The magnetic field at the center of a circular loop is B = μ₀I/(2r), where μ₀ is the permeability of free space, I is current, and r is radius.',
		tags: ['#magnetic-field', '#current-loop', '#jee-main'],
		source: 'JEE Main Mock Test #7 - 2024',
		savedAt: '2024-03-10T12:10:00Z'
	},
	{
		id: 'phys_009',
		subject: 'Physics',
		topic: 'Thermodynamics',
		difficulty: 'Easy',
		text: 'What is the relationship between Celsius and Kelvin scales?',
		options: [
			{ label: 'A', text: 'K = C + 273.15' },
			{ label: 'B', text: 'K = C - 273.15' },
			{ label: 'C', text: 'K = C × 273.15' },
			{ label: 'D', text: 'K = C / 273.15' }
		],
		correctOptionLabel: 'A',
		explanation: 'The Kelvin scale is an absolute temperature scale. The relationship is K = °C + 273.15. At 0°C, temperature is 273.15 K. At absolute zero (-273.15°C), temperature is 0 K.',
		tags: ['#temperature-scales', '#thermodynamics', '#neet'],
		source: 'NEET Mock Test #4 - 2024',
		savedAt: '2024-03-12T08:30:00Z'
	},
	{
		id: 'phys_010',
		subject: 'Physics',
		topic: 'Optics',
		difficulty: 'Hard',
		text: 'A lens has power P = 5 diopters. What is its focal length?',
		options: [
			{ label: 'A', text: '0.1 m' },
			{ label: 'B', text: '0.2 m' },
			{ label: 'C', text: '0.5 m' },
			{ label: 'D', text: '1.0 m' }
		],
		correctOptionLabel: 'B',
		explanation: 'Power P = 1/f, where f is focal length in meters. Therefore, f = 1/P = 1/5 = 0.2 m = 20 cm. A positive power indicates a converging lens.',
		tags: ['#lens-power', '#optics', '#jee-main'],
		source: 'JEE Main Mock Test #9 - 2024',
		savedAt: '2024-03-09T14:20:00Z'
	},
	{
		id: 'phys_011',
		subject: 'Physics',
		topic: 'Waves',
		difficulty: 'Medium',
		text: 'A string resonates at its fundamental frequency. How many nodes does it have?',
		options: [
			{ label: 'A', text: '1' },
			{ label: 'B', text: '2' },
			{ label: 'C', text: '3' },
			{ label: 'D', text: '4' }
		],
		correctOptionLabel: 'B',
		explanation: 'At the fundamental frequency (first harmonic), the string vibrates with one antinode and two nodes (at the fixed ends). This creates half a wavelength fitting on the string.',
		tags: ['#standing-waves', '#resonance', '#neet'],
		source: 'NEET Mock Test #13 - 2024',
		savedAt: '2024-03-06T17:00:00Z'
	},
	{
		id: 'phys_012',
		subject: 'Physics',
		topic: 'Modern Physics',
		difficulty: 'Hard',
		text: 'What is the photoelectric effect?',
		options: [
			{ label: 'A', text: 'Spontaneous emission of electrons from a metal when heated' },
			{ label: 'B', text: 'Emission of electrons from a metal when illuminated by light' },
			{ label: 'C', text: 'Deflection of electrons in an electric field' },
			{ label: 'D', text: 'Creation of electron-positron pairs' }
		],
		correctOptionLabel: 'B',
		explanation: 'The photoelectric effect is the phenomenon where electrons are emitted from a metal surface when light of sufficient frequency shines on it. Einstein explained this using the photon theory, earning him the Nobel Prize.',
		tags: ['#photoelectric-effect', '#quantum-mechanics', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #2 - 2023',
		savedAt: '2024-03-05T10:45:00Z'
	},
	{
		id: 'phys_013',
		subject: 'Physics',
		topic: 'Mechanics',
		difficulty: 'Easy',
		text: 'An object is in equilibrium. What can we conclude about the net force?',
		options: [
			{ label: 'A', text: 'Net force is positive' },
			{ label: 'B', text: 'Net force is negative' },
			{ label: 'C', text: 'Net force is zero' },
			{ label: 'D', text: 'Net force is undefined' }
		],
		correctOptionLabel: 'C',
		explanation: 'By Newton\'s First Law, if an object is in equilibrium (at rest or moving with constant velocity), the net force acting on it must be zero. ΣF = 0.',
		tags: ['#newtons-laws', '#mechanics', '#neet'],
		source: 'NEET Mock Test #2 - 2024',
		savedAt: '2024-03-11T13:25:00Z'
	},
	{
		id: 'phys_014',
		subject: 'Physics',
		topic: 'Electromagnetism',
		difficulty: 'Easy',
		text: 'What is the direction of the force on a current-carrying conductor in a magnetic field?',
		options: [
			{ label: 'A', text: 'In the direction of current' },
			{ label: 'B', text: 'In the direction of magnetic field' },
			{ label: 'C', text: 'Perpendicular to both current and field (Fleming\'s Left Hand Rule)' },
			{ label: 'D', text: 'Opposite to the direction of current' }
		],
		correctOptionLabel: 'C',
		explanation: 'Fleming\'s Left Hand Rule states: Thumb = current, Index = magnetic field, Middle = force. The force is perpendicular to both the current and the magnetic field.',
		tags: ['#magnetic-force', '#electromagnetism', '#jee-main'],
		source: 'JEE Main Mock Test #4 - 2024',
		savedAt: '2024-03-12T09:50:00Z'
	},
	{
		id: 'phys_015',
		subject: 'Physics',
		topic: 'Thermodynamics',
		difficulty: 'Medium',
		text: 'What is the first law of thermodynamics?',
		options: [
			{ label: 'A', text: 'Energy is always conserved' },
			{ label: 'B', text: 'ΔU = Q - W' },
			{ label: 'C', text: 'Entropy always increases' },
			{ label: 'D', text: 'Heat flows from hot to cold' }
		],
		correctOptionLabel: 'B',
		explanation: 'The first law of thermodynamics states: ΔU = Q - W, where ΔU is change in internal energy, Q is heat added to system, and W is work done by system. It\'s essentially the conservation of energy.',
		tags: ['#first-law', '#thermodynamics', '#neet'],
		source: 'NEET Mock Test #6 - 2024',
		savedAt: '2024-03-10T16:30:00Z'
	},
	{
		id: 'phys_016',
		subject: 'Physics',
		topic: 'Optics',
		difficulty: 'Medium',
		text: 'What happens when light passes from a denser to a rarer medium?',
		options: [
			{ label: 'A', text: 'Light bends towards the normal' },
			{ label: 'B', text: 'Light bends away from the normal' },
			{ label: 'C', text: 'Light travels straight' },
			{ label: 'D', text: 'Light is absorbed' }
		],
		correctOptionLabel: 'B',
		explanation: 'By Snell\'s law: n₁sin(θ₁) = n₂sin(θ₂). When light passes from denser (higher n) to rarer (lower n) medium, the angle of refraction is larger, so light bends away from the normal.',
		tags: ['#refraction', '#optics', '#jee-main'],
		source: 'JEE Main Mock Test #6 - 2024',
		savedAt: '2024-03-08T11:15:00Z'
	},
	{
		id: 'phys_017',
		subject: 'Physics',
		topic: 'Waves',
		difficulty: 'Easy',
		text: 'What is the relationship between wavelength, frequency, and wave speed?',
		options: [
			{ label: 'A', text: 'v = λf' },
			{ label: 'B', text: 'v = λ/f' },
			{ label: 'C', text: 'v = f/λ' },
			{ label: 'D', text: 'v = λ + f' }
		],
		correctOptionLabel: 'A',
		explanation: 'The wave equation is v = λf, where v is wave speed, λ (lambda) is wavelength, and f is frequency. This fundamental relationship applies to all types of waves.',
		tags: ['#wave-equation', '#waves', '#neet'],
		source: 'NEET Mock Test #7 - 2024',
		savedAt: '2024-03-12T14:40:00Z'
	},
	{
		id: 'phys_018',
		subject: 'Physics',
		topic: 'Modern Physics',
		difficulty: 'Medium',
		text: 'What is the rest mass energy of an electron?',
		options: [
			{ label: 'A', text: '0.511 MeV' },
			{ label: 'B', text: '1.022 MeV' },
			{ label: 'C', text: '5.11 MeV' },
			{ label: 'D', text: '10.22 MeV' }
		],
		correctOptionLabel: 'A',
		explanation: 'Using E = mc², the rest mass energy of an electron (m = 9.109 × 10⁻³¹ kg) is approximately 0.511 MeV (megaelectronvolts). This is a fundamental constant in particle physics.',
		tags: ['#mass-energy', '#modern-physics', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #15 - 2023',
		savedAt: '2024-03-07T15:55:00Z'
	},
	{
		id: 'phys_019',
		subject: 'Physics',
		topic: 'Mechanics',
		difficulty: 'Hard',
		text: 'A ball is thrown upward at 20 m/s. What is the maximum height reached? (Take g = 10 m/s²)',
		options: [
			{ label: 'A', text: '10 m' },
			{ label: 'B', text: '20 m' },
			{ label: 'C', text: '30 m' },
			{ label: 'D', text: '40 m' }
		],
		correctOptionLabel: 'B',
		explanation: 'Using v² = u² - 2gh (negative because gravity opposes motion). At max height, v = 0. So: 0 = (20)² - 2(10)h → h = 400/20 = 20 m.',
		tags: ['#projectile-motion', '#mechanics', '#jee-main'],
		source: 'JEE Main Mock Test #2 - 2024',
		savedAt: '2024-03-11T10:05:00Z'
	},
	{
		id: 'phys_020',
		subject: 'Physics',
		topic: 'Electromagnetism',
		difficulty: 'Hard',
		text: 'What is electromagnetic induction?',
		options: [
			{ label: 'A', text: 'Generation of magnetic field by current' },
			{ label: 'B', text: 'Generation of electric current by changing magnetic flux' },
			{ label: 'C', text: 'Deflection of charged particles in fields' },
			{ label: 'D', text: 'Interaction between two magnetic fields' }
		],
		correctOptionLabel: 'B',
		explanation: 'Electromagnetic induction, discovered by Faraday, is the phenomenon where a changing magnetic flux through a conductor induces an electric current. This principle is used in generators, transformers, and many other applications.',
		tags: ['#faraday-law', '#electromagnetic-induction', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #3 - 2023',
		savedAt: '2024-03-09T12:35:00Z'
	},
	{
		id: 'phys_021',
		subject: 'Physics',
		topic: 'Thermodynamics',
		difficulty: 'Hard',
		text: 'What is the second law of thermodynamics?',
		options: [
			{ label: 'A', text: 'Energy conservation' },
			{ label: 'B', text: 'Entropy of an isolated system always increases' },
			{ label: 'C', text: 'Heat cannot flow from cold to hot' },
			{ label: 'D', text: 'Both B and C' }
		],
		correctOptionLabel: 'D',
		explanation: 'The second law can be stated in multiple equivalent forms: entropy always increases, heat spontaneously flows from hot to cold (not vice versa), and perpetual motion machines are impossible.',
		tags: ['#second-law', '#entropy', '#neet'],
		source: 'NEET Mock Test #9 - 2024',
		savedAt: '2024-03-06T14:20:00Z'
	},
	{
		id: 'phys_022',
		subject: 'Physics',
		topic: 'Optics',
		difficulty: 'Hard',
		text: 'What is critical angle in optics?',
		options: [
			{ label: 'A', text: 'Angle at which light refracts' },
			{ label: 'B', text: 'Angle of incidence at which refracted ray grazes the surface' },
			{ label: 'C', text: 'Angle between incident and reflected rays' },
			{ label: 'D', text: 'Angle of prism' }
		],
		correctOptionLabel: 'B',
		explanation: 'The critical angle θc is the angle of incidence for which the refracted ray travels along the surface (θr = 90°). For angles greater than θc, total internal reflection occurs. sin(θc) = n₂/n₁.',
		tags: ['#total-internal-reflection', '#optics', '#jee-main'],
		source: 'JEE Main Mock Test #10 - 2024',
		savedAt: '2024-03-10T13:45:00Z'
	},
	{
		id: 'phys_023',
		subject: 'Physics',
		topic: 'Waves',
		difficulty: 'Hard',
		text: 'What is the Doppler effect?',
		options: [
			{ label: 'A', text: 'Change in amplitude of waves' },
			{ label: 'B', text: 'Change in frequency of waves due to relative motion' },
			{ label: 'C', text: 'Interference of waves' },
			{ label: 'D', text: 'Diffraction of waves' }
		],
		correctOptionLabel: 'B',
		explanation: 'The Doppler effect is the change in frequency (and wavelength) of waves due to the relative motion between source and observer. When source approaches, frequency increases; when moving away, frequency decreases.',
		tags: ['#doppler-effect', '#waves', '#neet'],
		source: 'NEET Mock Test #12 - 2024',
		savedAt: '2024-03-05T09:30:00Z'
	},
	{
		id: 'phys_024',
		subject: 'Physics',
		topic: 'Modern Physics',
		difficulty: 'Easy',
		text: 'What is a photon?',
		options: [
			{ label: 'A', text: 'A particle of light with energy E = hf' },
			{ label: 'B', text: 'A wave of electromagnetic radiation' },
			{ label: 'C', text: 'An electron in excited state' },
			{ label: 'D', text: 'A unit of electric charge' }
		],
		correctOptionLabel: 'A',
		explanation: 'A photon is the quantum of light, discovered by Einstein. It has energy E = hf, where h is Planck\'s constant and f is frequency. Photons have zero rest mass and always travel at speed of light.',
		tags: ['#photon', '#quantum-mechanics', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #6 - 2023',
		savedAt: '2024-03-12T11:15:00Z'
	}
];

/**
 * Chemistry Questions (18 total)
 * @type {import('./saved-questions.schema.js').SavedQuestion[]}
 */
const chemistryQuestions = [
	{
		id: 'chem_001',
		subject: 'Chemistry',
		topic: 'Organic Chemistry',
		difficulty: 'Easy',
		text: 'Which of the following compounds will exhibit the highest boiling point due to intermolecular hydrogen bonding?',
		options: [
			{ label: 'A', text: 'Ethanol' },
			{ label: 'B', text: 'Diethyl ether' },
			{ label: 'C', text: 'Ethane-1,2-diol' },
			{ label: 'D', text: 'Propan-1-ol' }
		],
		correctOptionLabel: 'C',
		explanation: 'Ethane-1,2-diol (HOCH₂CH₂OH) has two hydroxyl groups, allowing extensive hydrogen bonding both as donor and acceptor, resulting in the highest boiling point among the options.',
		tags: ['#hydrogen-bonding', '#organic-chemistry', '#neet'],
		source: 'NEET Mock Test #10 - 2024',
		savedAt: '2024-03-11T16:20:00Z'
	},
	{
		id: 'chem_002',
		subject: 'Chemistry',
		topic: 'Inorganic Chemistry',
		difficulty: 'Medium',
		text: 'What is the oxidation state of sulfur in H₂SO₄?',
		options: [
			{ label: 'A', text: '+2' },
			{ label: 'B', text: '+4' },
			{ label: 'C', text: '+6' },
			{ label: 'D', text: '-2' }
		],
		correctOptionLabel: 'C',
		explanation: 'In H₂SO₄: 2(+1) + S + 4(-2) = 0. Therefore, S = +6. Sulfur forms two double bonds with oxygen atoms in sulfuric acid.',
		tags: ['#oxidation-state', '#inorganic-chemistry', '#jee-main'],
		source: 'JEE Main Mock Test #11 - 2024',
		savedAt: '2024-03-10T14:50:00Z'
	},
	{
		id: 'chem_003',
		subject: 'Chemistry',
		topic: 'Physical Chemistry',
		difficulty: 'Hard',
		text: 'According to Le Chatelier\'s principle, what happens when pressure is increased in the reaction: N₂ + 3H₂ ⇌ 2NH₃?',
		options: [
			{ label: 'A', text: 'Equilibrium shifts to the left' },
			{ label: 'B', text: 'Equilibrium shifts to the right' },
			{ label: 'C', text: 'Equilibrium doesn\'t shift' },
			{ label: 'D', text: 'Reaction stops' }
		],
		correctOptionLabel: 'B',
		explanation: 'In this reaction, 4 moles of gas → 2 moles of gas (fewer moles on product side). When pressure increases, equilibrium shifts toward the side with fewer moles to relieve the pressure, so it shifts right.',
		tags: ['#le-chatelier', '#equilibrium', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #8 - 2023',
		savedAt: '2024-03-09T10:30:00Z'
	},
	{
		id: 'chem_004',
		subject: 'Chemistry',
		topic: 'Organic Chemistry',
		difficulty: 'Easy',
		text: 'What is the IUPAC name of CH₃-CH(OH)-CH₃?',
		options: [
			{ label: 'A', text: 'Propan-2-ol' },
			{ label: 'B', text: 'Propan-1-ol' },
			{ label: 'C', text: '2-Propanol' },
			{ label: 'D', text: 'Isopropanol' }
		],
		correctOptionLabel: 'A',
		explanation: 'The structure CH₃-CH(OH)-CH₃ is a 3-carbon chain with an OH group on the middle carbon. IUPAC name is propan-2-ol. Options A and C are both correct, but A is the standard IUPAC form.',
		tags: ['#iupac-nomenclature', '#organic-chemistry', '#neet'],
		source: 'NEET Mock Test #14 - 2024',
		savedAt: '2024-03-12T08:45:00Z'
	},
	{
		id: 'chem_005',
		subject: 'Chemistry',
		topic: 'Inorganic Chemistry',
		difficulty: 'Medium',
		text: 'Which acid is used in car batteries?',
		options: [
			{ label: 'A', text: 'Nitric acid' },
			{ label: 'B', text: 'Dilute sulfuric acid' },
			{ label: 'C', text: 'Hydrochloric acid' },
			{ label: 'D', text: 'Acetic acid' }
		],
		correctOptionLabel: 'B',
		explanation: 'Lead-acid batteries in cars contain dilute sulfuric acid (H₂SO₄) as the electrolyte. It provides the chemical medium for the redox reactions that produce electrical energy.',
		tags: ['#electrochemistry', '#inorganic-chemistry', '#jee-main'],
		source: 'JEE Main Mock Test #12 - 2024',
		savedAt: '2024-03-11T12:15:00Z'
	},
	{
		id: 'chem_006',
		subject: 'Chemistry',
		topic: 'Physical Chemistry',
		difficulty: 'Hard',
		text: 'What is the relationship between Kp and Kc?',
		options: [
			{ label: 'A', text: 'Kp = Kc' },
			{ label: 'B', text: 'Kp = Kc(RT)^Δn' },
			{ label: 'C', text: 'Kp = Kc/(RT)^Δn' },
			{ label: 'D', text: 'Kp = Kc + Δn' }
		],
		correctOptionLabel: 'B',
		explanation: 'Kp = Kc(RT)^Δn, where R is gas constant, T is temperature, and Δn = moles of gaseous products - moles of gaseous reactants. This relates equilibrium constants in terms of partial pressure and concentration.',
		tags: ['#equilibrium-constant', '#physical-chemistry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #4 - 2023',
		savedAt: '2024-03-08T15:40:00Z'
	},
	{
		id: 'chem_007',
		subject: 'Chemistry',
		topic: 'Organic Chemistry',
		difficulty: 'Medium',
		text: 'What functional group is present in aldehydes?',
		options: [
			{ label: 'A', text: 'R-OH' },
			{ label: 'B', text: 'R-O-R\'' },
			{ label: 'C', text: 'R-CHO' },
			{ label: 'D', text: 'R-CO-R\'' }
		],
		correctOptionLabel: 'C',
		explanation: 'Aldehydes contain the carbonyl functional group (C=O) bonded to at least one hydrogen atom. The general formula is R-CHO. Ketones have R-CO-R\' instead.',
		tags: ['#aldehydes', '#functional-groups', '#neet'],
		source: 'NEET Mock Test #15 - 2024',
		savedAt: '2024-03-07T11:25:00Z'
	},
	{
		id: 'chem_008',
		subject: 'Chemistry',
		topic: 'Physical Chemistry',
		difficulty: 'Easy',
		text: 'What is the pH of a neutral solution at 25°C?',
		options: [
			{ label: 'A', text: '0' },
			{ label: 'B', text: '7' },
			{ label: 'C', text: '14' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'B',
		explanation: 'At 25°C, the ionic product of water Kw = [H⁺][OH⁻] = 10⁻¹⁴. For a neutral solution, [H⁺] = [OH⁻] = 10⁻⁷, so pH = -log(10⁻⁷) = 7.',
		tags: ['#ph-scale', '#physical-chemistry', '#jee-main'],
		source: 'JEE Main Mock Test #13 - 2024',
		savedAt: '2024-03-12T09:55:00Z'
	},
	{
		id: 'chem_009',
		subject: 'Chemistry',
		topic: 'Inorganic Chemistry',
		difficulty: 'Hard',
		text: 'What is the coordination number of iron in [Fe(CN)₆]⁴⁻?',
		options: [
			{ label: 'A', text: '3' },
			{ label: 'B', text: '4' },
			{ label: 'C', text: '6' },
			{ label: 'D', text: '8' }
		],
		correctOptionLabel: 'C',
		explanation: 'In the complex ion [Fe(CN)₆]⁴⁻, the iron center is surrounded by 6 cyanide (CN⁻) ligands. Therefore, the coordination number is 6. This forms an octahedral geometry.',
		tags: ['#coordination-chemistry', '#inorganic-chemistry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #7 - 2023',
		savedAt: '2024-03-10T17:30:00Z'
	},
	{
		id: 'chem_010',
		subject: 'Chemistry',
		topic: 'Organic Chemistry',
		difficulty: 'Medium',
		text: 'What is an isomer?',
		options: [
			{ label: 'A', text: 'Compounds with different molecular formulas' },
			{ label: 'B', text: 'Compounds with same molecular formula but different structural arrangement' },
			{ label: 'C', text: 'Compounds with same structure but different elemental composition' },
			{ label: 'D', text: 'Compounds with different numbers of atoms' }
		],
		correctOptionLabel: 'B',
		explanation: 'Isomers are compounds with the same molecular formula but different structural arrangements. Examples: ethanol (C₂H₅OH) and dimethyl ether (CH₃OCH₃) both have molecular formula C₂H₆O.',
		tags: ['#isomerism', '#organic-chemistry', '#neet'],
		source: 'NEET Mock Test #16 - 2024',
		savedAt: '2024-03-09T13:20:00Z'
	},
	{
		id: 'chem_011',
		subject: 'Chemistry',
		topic: 'Physical Chemistry',
		difficulty: 'Easy',
		text: 'What is the unit of rate constant in a first-order reaction?',
		options: [
			{ label: 'A', text: 's⁻¹' },
			{ label: 'B', text: 'M·s⁻¹' },
			{ label: 'C', text: 'M⁻¹·s⁻¹' },
			{ label: 'D', text: 'M²·s⁻¹' }
		],
		correctOptionLabel: 'A',
		explanation: 'For a first-order reaction with rate law: rate = k[A], the units are: M·s⁻¹ = k·M, therefore k has units of s⁻¹. First-order reactions follow: ln[A] = ln[A]₀ - kt.',
		tags: ['#kinetics', '#physical-chemistry', '#jee-main'],
		source: 'JEE Main Mock Test #14 - 2024',
		savedAt: '2024-03-11T14:45:00Z'
	},
	{
		id: 'chem_012',
		subject: 'Chemistry',
		topic: 'Inorganic Chemistry',
		difficulty: 'Hard',
		text: 'Which of the following is not a polynomial coordination compound?',
		options: [
			{ label: 'A', text: '[Cu(NH₃)₄]²⁺' },
			{ label: 'B', text: '[Ag(NH₃)₂]⁺' },
			{ label: 'C', text: '[Fe(H₂O)₆]³⁺' },
			{ label: 'D', text: 'All are coordination compounds' }
		],
		correctOptionLabel: 'D',
		explanation: 'All three are coordination compounds. Coordination compounds consist of a central metal ion bonded to ligands through coordinate covalent bonds. The ligands can be NH₃, H₂O, CN⁻, etc.',
		tags: ['#complex-ions', '#inorganic-chemistry', '#neet'],
		source: 'NEET Mock Test #17 - 2024',
		savedAt: '2024-03-08T10:10:00Z'
	},
	{
		id: 'chem_013',
		subject: 'Chemistry',
		topic: 'Organic Chemistry',
		difficulty: 'Easy',
		text: 'What is the hybridization of carbon in ethylene (C₂H₄)?',
		options: [
			{ label: 'A', text: 'sp' },
			{ label: 'B', text: 'sp²' },
			{ label: 'C', text: 'sp³' },
			{ label: 'D', text: 'sp³d' }
		],
		correctOptionLabel: 'B',
		explanation: 'In ethylene, each carbon is bonded to 3 atoms (2 hydrogens and 1 other carbon with a double bond). The carbon uses sp² hybridization to form σ bonds and has one unhybridized p orbital for the π bond.',
		tags: ['#hybridization', '#organic-chemistry', '#jee-main'],
		source: 'JEE Main Mock Test #15 - 2024',
		savedAt: '2024-03-12T07:30:00Z'
	},
	{
		id: 'chem_014',
		subject: 'Chemistry',
		topic: 'Physical Chemistry',
		difficulty: 'Medium',
		text: 'What is the relationship between ΔG, ΔH, and ΔS?',
		options: [
			{ label: 'A', text: 'ΔG = ΔH + TΔS' },
			{ label: 'B', text: 'ΔG = ΔH - TΔS' },
			{ label: 'C', text: 'ΔG = ΔS - TΔH' },
			{ label: 'D', text: 'ΔG = ΔH × TΔS' }
		],
		correctOptionLabel: 'B',
		explanation: 'The Gibbs free energy equation is ΔG = ΔH - TΔS, where ΔH is enthalpy change, T is temperature, and ΔS is entropy change. When ΔG < 0, the reaction is spontaneous at that temperature.',
		tags: ['#gibbs-free-energy', '#physical-chemistry', '#neet'],
		source: 'NEET Mock Test #18 - 2024',
		savedAt: '2024-03-10T16:15:00Z'
	},
	{
		id: 'chem_015',
		subject: 'Chemistry',
		topic: 'Inorganic Chemistry',
		difficulty: 'Medium',
		text: 'What is the oxidation state of nitrogen in NO₂?',
		options: [
			{ label: 'A', text: '+1' },
			{ label: 'B', text: '+2' },
			{ label: 'C', text: '+4' },
			{ label: 'D', text: '+3' }
		],
		correctOptionLabel: 'C',
		explanation: 'In NO₂: N + 2(-2) = -1 (since it\'s a radical). However, in typical problems: N + 2(-2) = -1... Actually, considering NO₂⁻ or standard: N = +4. In NO₂ radical, it\'s typically +4.',
		tags: ['#oxidation-state', '#inorganic-chemistry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #9 - 2023',
		savedAt: '2024-03-09T11:50:00Z'
	},
	{
		id: 'chem_016',
		subject: 'Chemistry',
		topic: 'Organic Chemistry',
		difficulty: 'Hard',
		text: 'What are the products of the dehydration of 2-methylpropan-2-ol?',
		options: [
			{ label: 'A', text: 'Propene and water' },
			{ label: 'B', text: '2-Methylpropene and water' },
			{ label: 'C', text: 'Acetone and water' },
			{ label: 'D', text: 'Methane and ethanol' }
		],
		correctOptionLabel: 'B',
		explanation: 'Dehydration of (CH₃)₃C-OH (2-methylpropan-2-ol) produces 2-methylpropene (CH₃)₂C=CH₂ and water. This is an E1 reaction favored by tertiary alcohols.',
		tags: ['#elimination-reactions', '#organic-chemistry', '#neet'],
		source: 'NEET Mock Test #19 - 2024',
		savedAt: '2024-03-07T14:35:00Z'
	},
	{
		id: 'chem_017',
		subject: 'Chemistry',
		topic: 'Physical Chemistry',
		difficulty: 'Hard',
		text: 'What is the half-life of a radioactive isotope?',
		options: [
			{ label: 'A', text: 'Time for all atoms to decay' },
			{ label: 'B', text: 'Time for half the atoms to decay' },
			{ label: 'C', text: 'Time for activity to reduce to 1/e' },
			{ label: 'D', text: 'Time for decay constant to become half' }
		],
		correctOptionLabel: 'B',
		explanation: 'Half-life (t₁/₂) is the time required for exactly half of the radioactive atoms in a sample to undergo decay. It\'s related to decay constant λ by: t₁/₂ = ln(2)/λ = 0.693/λ.',
		tags: ['#radioactivity', '#physical-chemistry', '#jee-main'],
		source: 'JEE Main Mock Test #16 - 2024',
		savedAt: '2024-03-06T13:40:00Z'
	},
	{
		id: 'chem_018',
		subject: 'Chemistry',
		topic: 'Inorganic Chemistry',
		difficulty: 'Easy',
		text: 'What is the color of copper sulfate solution?',
		options: [
			{ label: 'A', text: 'Colorless' },
			{ label: 'B', text: 'Red' },
			{ label: 'C', text: 'Blue' },
			{ label: 'D', text: 'Green' }
		],
		correctOptionLabel: 'C',
		explanation: 'Copper sulfate solution (CuSO₄·5H₂O) appears blue due to the hydrated copper(II) ions [Cu(H₂O)₄]²⁺. The color persists in aqueous solution.',
		tags: ['#hydrated-ions', '#inorganic-chemistry', '#neet'],
		source: 'NEET Mock Test #20 - 2024',
		savedAt: '2024-03-12T10:25:00Z'
	}
];

/**
 * Maths Questions (32 total)
 * @type {import('./saved-questions.schema.js').SavedQuestion[]}
 */
const mathsQuestions = [
	{
		id: 'math_001',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Easy',
		text: 'If 2x + 3 = 11, what is the value of x?',
		options: [
			{ label: 'A', text: '2' },
			{ label: 'B', text: '4' },
			{ label: 'C', text: '6' },
			{ label: 'D', text: '8' }
		],
		correctOptionLabel: 'B',
		explanation: '2x + 3 = 11 → 2x = 8 → x = 4. This is a basic linear equation solved by isolating the variable.',
		tags: ['#linear-equations', '#algebra', '#neet'],
		source: 'NEET Mock Test #21 - 2024',
		savedAt: '2024-03-11T15:20:00Z'
	},
	{
		id: 'math_002',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Medium',
		text: 'What is the derivative of f(x) = x³ + 2x² - 5x + 7?',
		options: [
			{ label: 'A', text: '3x² + 4x - 5' },
			{ label: 'B', text: '3x² - 4x - 5' },
			{ label: 'C', text: 'x³ + 2x² - 5' },
			{ label: 'D', text: '3x + 4x' }
		],
		correctOptionLabel: 'A',
		explanation: 'Using power rule: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5. So f\'(x) = 3x² + 4x - 5.',
		tags: ['#derivatives', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #17 - 2024',
		savedAt: '2024-03-10T13:45:00Z'
	},
	{
		id: 'math_003',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Easy',
		text: 'What is the area of a circle with radius 7 cm?',
		options: [
			{ label: 'A', text: '49π cm²' },
			{ label: 'B', text: '14π cm²' },
			{ label: 'C', text: '98π cm²' },
			{ label: 'D', text: '7π cm²' }
		],
		correctOptionLabel: 'A',
		explanation: 'Area of circle = πr² = π(7)² = 49π cm². This is the fundamental formula for circle area.',
		tags: ['#circle-area', '#geometry', '#neet'],
		source: 'NEET Mock Test #22 - 2024',
		savedAt: '2024-03-12T11:30:00Z'
	},
	{
		id: 'math_004',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Medium',
		text: 'What is sin(30°)?',
		options: [
			{ label: 'A', text: '0.5' },
			{ label: 'B', text: '√3/2' },
			{ label: 'C', text: '1' },
			{ label: 'D', text: '0' }
		],
		correctOptionLabel: 'A',
		explanation: 'sin(30°) = 1/2 = 0.5. This is a standard angle in trigonometry found from a 30-60-90 triangle.',
		tags: ['#standard-angles', '#trigonometry', '#jee-main'],
		source: 'JEE Main Mock Test #18 - 2024',
		savedAt: '2024-03-09T14:55:00Z'
	},
	{
		id: 'math_005',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Hard',
		text: 'What is the sum of the roots of the quadratic equation x² - 5x + 6 = 0?',
		options: [
			{ label: 'A', text: '5' },
			{ label: 'B', text: '6' },
			{ label: 'C', text: '1' },
			{ label: 'D', text: '-5' }
		],
		correctOptionLabel: 'A',
		explanation: 'For quadratic ax² + bx + c = 0, sum of roots = -b/a = -(-5)/1 = 5. Alternatively, roots are 2 and 3, and 2 + 3 = 5.',
		tags: ['#quadratic-equations', '#algebra', '#neet'],
		source: 'NEET Mock Test #23 - 2024',
		savedAt: '2024-03-08T12:10:00Z'
	},
	{
		id: 'math_006',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Hard',
		text: 'What is the integral of ∫ 2x dx?',
		options: [
			{ label: 'A', text: 'x² + C' },
			{ label: 'B', text: '2x + C' },
			{ label: 'C', text: 'x²/2 + C' },
			{ label: 'D', text: '2 + C' }
		],
		correctOptionLabel: 'A',
		explanation: '∫ 2x dx = 2 · x²/2 + C = x² + C. Using power rule for integration: ∫ x^n dx = x^(n+1)/(n+1) + C.',
		tags: ['#integration', '#calculus', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #5 - 2023',
		savedAt: '2024-03-07T16:40:00Z'
	},
	{
		id: 'math_007',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Medium',
		text: 'What is the volume of a sphere with radius 3 cm?',
		options: [
			{ label: 'A', text: '9π cm³' },
			{ label: 'B', text: '27π cm³' },
			{ label: 'C', text: '36π cm³' },
			{ label: 'D', text: '108π cm³' }
		],
		correctOptionLabel: 'C',
		explanation: 'Volume of sphere = (4/3)πr³ = (4/3)π(3)³ = (4/3)π(27) = 36π cm³.',
		tags: ['#sphere-volume', '#geometry', '#neet'],
		source: 'NEET Mock Test #24 - 2024',
		savedAt: '2024-03-11T10:05:00Z'
	},
	{
		id: 'math_008',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Easy',
		text: 'What is tan(45°)?',
		options: [
			{ label: 'A', text: '0' },
			{ label: 'B', text: '1' },
			{ label: 'C', text: '√3' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'B',
		explanation: 'tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1. At 45°, the opposite and adjacent sides are equal.',
		tags: ['#tangent-ratio', '#trigonometry', '#jee-main'],
		source: 'JEE Main Mock Test #19 - 2024',
		savedAt: '2024-03-12T09:20:00Z'
	},
	{
		id: 'math_009',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Medium',
		text: 'What is the solution to the system: x + y = 5 and x - y = 1?',
		options: [
			{ label: 'A', text: 'x=2, y=3' },
			{ label: 'B', text: 'x=3, y=2' },
			{ label: 'C', text: 'x=4, y=1' },
			{ label: 'D', text: 'x=1, y=4' }
		],
		correctOptionLabel: 'B',
		explanation: 'Adding equations: (x+y) + (x-y) = 5+1 → 2x = 6 → x = 3. Substituting: 3 + y = 5 → y = 2. Solution: (3, 2).',
		tags: ['#system-of-equations', '#algebra', '#neet'],
		source: 'NEET Mock Test #25 - 2024',
		savedAt: '2024-03-10T15:35:00Z'
	},
	{
		id: 'math_010',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Medium',
		text: 'What is the limit of (x² - 4)/(x - 2) as x approaches 2?',
		options: [
			{ label: 'A', text: '0' },
			{ label: 'B', text: '2' },
			{ label: 'C', text: '4' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'C',
		explanation: 'Factoring: (x² - 4)/(x - 2) = (x-2)(x+2)/(x-2) = x + 2. As x → 2: limit = 2 + 2 = 4.',
		tags: ['#limits', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #20 - 2024',
		savedAt: '2024-03-09T12:50:00Z'
	},
	{
		id: 'math_011',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Hard',
		text: 'What is the equation of a circle with center (2, 3) and radius 5?',
		options: [
			{ label: 'A', text: '(x-2)² + (y-3)² = 5' },
			{ label: 'B', text: '(x-2)² + (y-3)² = 10' },
			{ label: 'C', text: '(x-2)² + (y-3)² = 25' },
			{ label: 'D', text: '(x+2)² + (y+3)² = 25' }
		],
		correctOptionLabel: 'C',
		explanation: 'Circle equation: (x - h)² + (y - k)² = r², where (h,k) = (2,3) and r = 5. So: (x-2)² + (y-3)² = 25.',
		tags: ['#circle-equation', '#geometry', '#neet'],
		source: 'NEET Mock Test #26 - 2024',
		savedAt: '2024-03-08T14:25:00Z'
	},
	{
		id: 'math_012',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Hard',
		text: 'What is cos(60°)?',
		options: [
			{ label: 'A', text: '0.5' },
			{ label: 'B', text: '√3/2' },
			{ label: 'C', text: '1' },
			{ label: 'D', text: '√2/2' }
		],
		correctOptionLabel: 'A',
		explanation: 'cos(60°) = 1/2 = 0.5. From 30-60-90 triangle, the side adjacent to 60° is half the hypotenuse.',
		tags: ['#cosine-ratio', '#trigonometry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #10 - 2023',
		savedAt: '2024-03-07T11:40:00Z'
	},
	{
		id: 'math_013',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Easy',
		text: 'What is the slope of the line passing through (1, 2) and (3, 6)?',
		options: [
			{ label: 'A', text: '1' },
			{ label: 'B', text: '2' },
			{ label: 'C', text: '3' },
			{ label: 'D', text: '4' }
		],
		correctOptionLabel: 'B',
		explanation: 'Slope m = (y₂ - y₁)/(x₂ - x₁) = (6 - 2)/(3 - 1) = 4/2 = 2.',
		tags: ['#slope', '#algebra', '#neet'],
		source: 'NEET Mock Test #27 - 2024',
		savedAt: '2024-03-12T08:15:00Z'
	},
	{
		id: 'math_014',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Hard',
		text: 'What is the second derivative of f(x) = x⁴ - 2x³ + 5x?',
		options: [
			{ label: 'A', text: '4x³ - 6x² + 5' },
			{ label: 'B', text: '12x² - 12x' },
			{ label: 'C', text: 'x⁴ - 2x³' },
			{ label: 'D', text: '4x² - 6x' }
		],
		correctOptionLabel: 'B',
		explanation: 'First derivative: f\'(x) = 4x³ - 6x² + 5. Second derivative: f\'\'(x) = 12x² - 12x.',
		tags: ['#second-derivative', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #21 - 2024',
		savedAt: '2024-03-10T17:50:00Z'
	},
	{
		id: 'math_015',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Easy',
		text: 'What is the perimeter of a square with side 5 cm?',
		options: [
			{ label: 'A', text: '10 cm' },
			{ label: 'B', text: '15 cm' },
			{ label: 'C', text: '20 cm' },
			{ label: 'D', text: '25 cm' }
		],
		correctOptionLabel: 'C',
		explanation: 'Perimeter of square = 4 × side = 4 × 5 = 20 cm.',
		tags: ['#square-perimeter', '#geometry', '#neet'],
		source: 'NEET Mock Test #28 - 2024',
		savedAt: '2024-03-11T13:35:00Z'
	},
	{
		id: 'math_016',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Medium',
		text: 'What is sin²(x) + cos²(x)?',
		options: [
			{ label: 'A', text: '0' },
			{ label: 'B', text: '1' },
			{ label: 'C', text: '2' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'B',
		explanation: 'This is the Pythagorean identity: sin²(x) + cos²(x) = 1. It\'s true for all values of x and is fundamental in trigonometry.',
		tags: ['#pythagorean-identity', '#trigonometry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #11 - 2023',
		savedAt: '2024-03-09T15:45:00Z'
	},
	{
		id: 'math_017',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Hard',
		text: 'What is the next term in the series: 2, 6, 12, 20, ...?',
		options: [
			{ label: 'A', text: '28' },
			{ label: 'B', text: '30' },
			{ label: 'C', text: '32' },
			{ label: 'D', text: '34' }
		],
		correctOptionLabel: 'B',
		explanation: 'Pattern: 2=1×2, 6=2×3, 12=3×4, 20=4×5. Next term = 5×6 = 30. General term: n(n+1).',
		tags: ['#sequence-series', '#algebra', '#neet'],
		source: 'NEET Mock Test #29 - 2024',
		savedAt: '2024-03-08T10:20:00Z'
	},
	{
		id: 'math_018',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Easy',
		text: 'What is the derivative of f(x) = 5?',
		options: [
			{ label: 'A', text: '5' },
			{ label: 'B', text: '0' },
			{ label: 'C', text: '1' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'B',
		explanation: 'The derivative of a constant is always 0. The graph of f(x) = 5 is a horizontal line with no slope.',
		tags: ['#derivative-rules', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #22 - 2024',
		savedAt: '2024-03-07T14:05:00Z'
	},
	{
		id: 'math_019',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Medium',
		text: 'What is the area of a triangle with base 10 cm and height 6 cm?',
		options: [
			{ label: 'A', text: '30 cm²' },
			{ label: 'B', text: '60 cm²' },
			{ label: 'C', text: '16 cm²' },
			{ label: 'D', text: '120 cm²' }
		],
		correctOptionLabel: 'A',
		explanation: 'Area of triangle = (1/2) × base × height = (1/2) × 10 × 6 = 30 cm².',
		tags: ['#triangle-area', '#geometry', '#neet'],
		source: 'NEET Mock Test #30 - 2024',
		savedAt: '2024-03-12T10:40:00Z'
	},
	{
		id: 'math_020',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Hard',
		text: 'What is the value of arcsin(0.5)?',
		options: [
			{ label: 'A', text: '30°' },
			{ label: 'B', text: '45°' },
			{ label: 'C', text: '60°' },
			{ label: 'D', text: '90°' }
		],
		correctOptionLabel: 'A',
		explanation: 'arcsin(0.5) = 30° (or π/6 radians). This means sin(30°) = 0.5, which we know from the 30-60-90 triangle.',
		tags: ['#inverse-trig', '#trigonometry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #12 - 2023',
		savedAt: '2024-03-10T12:55:00Z'
	},
	{
		id: 'math_021',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Medium',
		text: 'What is the value of log₁₀(100)?',
		options: [
			{ label: 'A', text: '1' },
			{ label: 'B', text: '2' },
			{ label: 'C', text: '10' },
			{ label: 'D', text: '100' }
		],
		correctOptionLabel: 'B',
		explanation: 'log₁₀(100) = 2 because 10² = 100. The logarithm is the exponent to which we must raise the base to get the number.',
		tags: ['#logarithms', '#algebra', '#neet'],
		source: 'NEET Mock Test #31 - 2024',
		savedAt: '2024-03-09T11:25:00Z'
	},
	{
		id: 'math_022',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Hard',
		text: 'What is the integral of ∫ e^x dx?',
		options: [
			{ label: 'A', text: 'x·e^x + C' },
			{ label: 'B', text: 'e^x + C' },
			{ label: 'C', text: 'e^(x+1) + C' },
			{ label: 'D', text: '1 + C' }
		],
		correctOptionLabel: 'B',
		explanation: '∫ e^x dx = e^x + C. The exponential function e^x is unique because its derivative and integral are the same.',
		tags: ['#exponential-integration', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #23 - 2024',
		savedAt: '2024-03-08T15:15:00Z'
	},
	{
		id: 'math_023',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Hard',
		text: 'What is the distance between points (0, 0) and (3, 4)?',
		options: [
			{ label: 'A', text: '5' },
			{ label: 'B', text: '7' },
			{ label: 'C', text: '12' },
			{ label: 'D', text: '25' }
		],
		correctOptionLabel: 'A',
		explanation: 'Distance = √((3-0)² + (4-0)²) = √(9 + 16) = √25 = 5. This is the 3-4-5 Pythagorean triple.',
		tags: ['#distance-formula', '#geometry', '#neet'],
		source: 'NEET Mock Test #32 - 2024',
		savedAt: '2024-03-07T09:50:00Z'
	},
	{
		id: 'math_024',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Easy',
		text: 'What is the period of sin(x)?',
		options: [
			{ label: 'A', text: 'π' },
			{ label: 'B', text: '2π' },
			{ label: 'C', text: 'π/2' },
			{ label: 'D', text: '1' }
		],
		correctOptionLabel: 'B',
		explanation: 'The period of sin(x) is 2π. This means sin(x + 2π) = sin(x) for all values of x.',
		tags: ['#sine-function', '#trigonometry', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #13 - 2023',
		savedAt: '2024-03-12T07:35:00Z'
	},
	{
		id: 'math_025',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Easy',
		text: 'What is the value of 2³?',
		options: [
			{ label: 'A', text: '6' },
			{ label: 'B', text: '8' },
			{ label: 'C', text: '9' },
			{ label: 'D', text: '16' }
		],
		correctOptionLabel: 'B',
		explanation: '2³ = 2 × 2 × 2 = 8. This is exponentiation where 2 is the base and 3 is the exponent.',
		tags: ['#exponents', '#algebra', '#neet'],
		source: 'NEET Mock Test #33 - 2024',
		savedAt: '2024-03-11T08:20:00Z'
	},
	{
		id: 'math_026',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Medium',
		text: 'What is the derivative of sin(x)?',
		options: [
			{ label: 'A', text: 'cos(x)' },
			{ label: 'B', text: '-cos(x)' },
			{ label: 'C', text: 'sin(x)' },
			{ label: 'D', text: 'tan(x)' }
		],
		correctOptionLabel: 'A',
		explanation: 'd/dx(sin(x)) = cos(x). This is one of the fundamental derivative formulas in calculus.',
		tags: ['#trig-derivatives', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #24 - 2024',
		savedAt: '2024-03-10T14:10:00Z'
	},
	{
		id: 'math_027',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Easy',
		text: 'What is the circumference of a circle with radius 5 cm?',
		options: [
			{ label: 'A', text: '5π cm' },
			{ label: 'B', text: '10π cm' },
			{ label: 'C', text: '25π cm' },
			{ label: 'D', text: '50π cm' }
		],
		correctOptionLabel: 'B',
		explanation: 'Circumference = 2πr = 2π(5) = 10π cm. This is the formula for the perimeter of a circle.',
		tags: ['#circumference', '#geometry', '#neet'],
		source: 'NEET Mock Test #34 - 2024',
		savedAt: '2024-03-09T16:30:00Z'
	},
	{
		id: 'math_028',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Hard',
		text: 'What are the roots of x² - 5x + 6 = 0?',
		options: [
			{ label: 'A', text: '2 and 3' },
			{ label: 'B', text: '1 and 6' },
			{ label: 'C', text: '-2 and -3' },
			{ label: 'D', text: '5 and 1' }
		],
		correctOptionLabel: 'A',
		explanation: 'Factoring: (x - 2)(x - 3) = 0. Therefore x = 2 or x = 3. Verification: 4 - 10 + 6 = 0 ✓ and 9 - 15 + 6 = 0 ✓',
		tags: ['#quadratic-roots', '#algebra', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #14 - 2023',
		savedAt: '2024-03-08T11:45:00Z'
	},
	{
		id: 'math_029',
		subject: 'Maths',
		topic: 'Trigonometry',
		difficulty: 'Medium',
		text: 'What is cot(45°)?',
		options: [
			{ label: 'A', text: '0' },
			{ label: 'B', text: '1' },
			{ label: 'C', text: '√3' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'B',
		explanation: 'cot(45°) = cos(45°)/sin(45°) = (√2/2)/(√2/2) = 1. Alternatively, cot(45°) = 1/tan(45°) = 1/1 = 1.',
		tags: ['#cotangent-ratio', '#trigonometry', '#neet'],
		source: 'NEET Mock Test #35 - 2024',
		savedAt: '2024-03-07T13:55:00Z'
	},
	{
		id: 'math_030',
		subject: 'Maths',
		topic: 'Calculus',
		difficulty: 'Easy',
		text: 'What is the derivative of cos(x)?',
		options: [
			{ label: 'A', text: 'sin(x)' },
			{ label: 'B', text: '-sin(x)' },
			{ label: 'C', text: 'cos(x)' },
			{ label: 'D', text: '-cos(x)' }
		],
		correctOptionLabel: 'B',
		explanation: 'd/dx(cos(x)) = -sin(x). Note the negative sign, which distinguishes this from the derivative of sine.',
		tags: ['#cosine-derivative', '#calculus', '#jee-main'],
		source: 'JEE Main Mock Test #25 - 2024',
		savedAt: '2024-03-12T06:40:00Z'
	},
	{
		id: 'math_031',
		subject: 'Maths',
		topic: 'Geometry',
		difficulty: 'Medium',
		text: 'What is the volume of a cube with side 3 cm?',
		options: [
			{ label: 'A', text: '9 cm³' },
			{ label: 'B', text: '27 cm³' },
			{ label: 'C', text: '18 cm³' },
			{ label: 'D', text: '81 cm³' }
		],
		correctOptionLabel: 'B',
		explanation: 'Volume of cube = side³ = 3³ = 27 cm³.',
		tags: ['#cube-volume', '#geometry', '#neet'],
		source: 'NEET Mock Test #36 - 2024',
		savedAt: '2024-03-11T09:05:00Z'
	},
	{
		id: 'math_032',
		subject: 'Maths',
		topic: 'Algebra',
		difficulty: 'Medium',
		text: 'What is the absolute value of -5?',
		options: [
			{ label: 'A', text: '-5' },
			{ label: 'B', text: '5' },
			{ label: 'C', text: '0' },
			{ label: 'D', text: 'undefined' }
		],
		correctOptionLabel: 'B',
		explanation: 'The absolute value |−5| = 5. Absolute value represents the distance from zero on the number line, always non-negative.',
		tags: ['#absolute-value', '#algebra', '#jee-advanced'],
		source: 'JEE Advanced Mock Test #16 - 2023',
		savedAt: '2024-03-10T11:30:00Z'
	}
];

export const allQuestions = [...physicsQuestions, ...chemistryQuestions, ...mathsQuestions];

export { physicsQuestions, chemistryQuestions, mathsQuestions };
