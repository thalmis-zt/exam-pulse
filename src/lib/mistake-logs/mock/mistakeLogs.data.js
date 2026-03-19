/**
 * Mock Mistake Logs Data
 * =====================
 * Sample data representing incorrectly answered questions.
 */

export const mistakesData = [
  {
    id: 'mistake-001',
    testName: 'Full Length Test 1',
    testAttemptId: 'attempt-001',
    subject: 'Physics',
    topic: 'Kinematics',
    difficulty: 'Medium',
    text: 'A body is thrown vertically upward with a velocity of 20 m/s. What is the maximum height reached?',
    options: [
      { label: 'A', text: '10 m' },
      { label: 'B', text: '20 m' },
      { label: 'C', text: '40 m' },
      { label: 'D', text: '80 m' }
    ],
    correctOptionLabel: 'B',
    userOptionLabel: 'C',
    explanation: 'Using v² = u² - 2gs, at maximum height v = 0. So 0 = 20² - 2(10)s → s = 20 m.',
    tags: ['projectile-motion', 'equations-of-motion'],
    source: 'JEE Main 2022',
    mistakeAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 65
  },
  {
    id: 'mistake-002',
    testName: 'Chemistry Practice Set 2',
    testAttemptId: 'attempt-002',
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    difficulty: 'Hard',
    text: 'Which of the following has the highest bond energy?',
    options: [
      { label: 'A', text: 'O-H' },
      { label: 'B', text: 'C-H' },
      { label: 'C', text: 'C=C' },
      { label: 'D', text: 'N≡N' }
    ],
    correctOptionLabel: 'D',
    userOptionLabel: 'A',
    explanation: 'N≡N has the highest bond energy (940 kJ/mol) due to the triple bond between nitrogen atoms.',
    tags: ['bonding', 'bond-energy'],
    source: 'NEET 2023',
    mistakeAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 55
  },
  {
    id: 'mistake-003',
    testName: 'Mathematics Revision 1',
    testAttemptId: 'attempt-003',
    subject: 'Maths',
    topic: 'Calculus',
    difficulty: 'Medium',
    text: 'What is the derivative of x³ + 2x² - 5x + 3?',
    options: [
      { label: 'A', text: '3x² + 4x - 5' },
      { label: 'B', text: '3x² + 2x - 5' },
      { label: 'C', text: 'x³ + 2x² - 5' },
      { label: 'D', text: '3x + 4' }
    ],
    correctOptionLabel: 'A',
    userOptionLabel: 'B',
    explanation: 'Using power rule: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5. Answer is 3x² + 4x - 5.',
    tags: ['derivatives', 'differentiation'],
    source: 'Class 12 Board',
    mistakeAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 75
  },
  {
    id: 'mistake-004',
    testName: 'Physics Quick Test 3',
    testAttemptId: 'attempt-004',
    subject: 'Physics',
    topic: 'Electricity',
    difficulty: 'Hard',
    text: 'A wire of resistance 10 Ω is bent into a square loop. What is the resistance between two diagonally opposite corners?',
    options: [
      { label: 'A', text: '5/3 Ω' },
      { label: 'B', text: '10 Ω' },
      { label: 'C', text: '2.5 Ω' },
      { label: 'D', text: '20 Ω' }
    ],
    correctOptionLabel: 'A',
    userOptionLabel: 'C',
    explanation: 'The two paths from corner to opposite corner have equal resistance. Each path has 5 Ω, forming parallel combination: 1/R = 1/5 + 1/5 = 2/5 → R = 5/2 Ω. Wait, check again: Actually R = 5/3 Ω.',
    tags: ['circuit-analysis', 'resistance'],
    source: 'JEE Advanced 2022',
    mistakeAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 45
  },
  {
    id: 'mistake-005',
    testName: 'Chemistry Practice Set 3',
    testAttemptId: 'attempt-005',
    subject: 'Chemistry',
    topic: 'Thermodynamics',
    difficulty: 'Easy',
    text: 'Which of the following is an endothermic reaction?',
    options: [
      { label: 'A', text: 'Combustion of methane' },
      { label: 'B', text: 'Melting of ice' },
      { label: 'C', text: 'Rusting of iron' },
      { label: 'D', text: 'Neutralization reaction' }
    ],
    correctOptionLabel: 'B',
    userOptionLabel: 'A',
    explanation: 'Melting of ice requires heat energy from surroundings, making it endothermic. Combustion, rusting, and neutralization are all exothermic.',
    tags: ['thermodynamics', 'endothermic'],
    source: 'NEET 2022',
    mistakeAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 82
  },
  {
    id: 'mistake-006',
    testName: 'Maths Problem Set 5',
    testAttemptId: 'attempt-006',
    subject: 'Maths',
    topic: 'Algebra',
    difficulty: 'Medium',
    text: 'What is the sum of roots of the equation x² - 5x + 6 = 0?',
    options: [
      { label: 'A', text: '-5' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '11' }
    ],
    correctOptionLabel: 'B',
    userOptionLabel: 'A',
    explanation: 'By Vieta\'s formulas, for ax² + bx + c = 0, sum of roots = -b/a. Here, sum = -(-5)/1 = 5.',
    tags: ['quadratic-equations', 'vietas-formulas'],
    source: 'Class 11 Board',
    mistakeAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 70
  },
  {
    id: 'mistake-007',
    testName: 'Physics Full Length 2',
    testAttemptId: 'attempt-007',
    subject: 'Physics',
    topic: 'Optics',
    difficulty: 'Hard',
    text: 'A real image formed by a concave mirror is 4 times the size of the object. What is the magnification?',
    options: [
      { label: 'A', text: '+4' },
      { label: 'B', text: '-4' },
      { label: 'C', text: '+0.25' },
      { label: 'D', text: '-0.25' }
    ],
    correctOptionLabel: 'B',
    userOptionLabel: 'A',
    explanation: 'For real images formed by concave mirror, magnification is negative. Since size is 4 times, m = -4.',
    tags: ['mirror-formula', 'magnification', 'real-images'],
    source: 'JEE Main 2023',
    mistakeAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 50
  },
  {
    id: 'mistake-008',
    testName: 'Chemistry Full Length 1',
    testAttemptId: 'attempt-008',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'Hard',
    text: 'Which reagent is used to convert alkene to alkane?',
    options: [
      { label: 'A', text: 'H₂SO₄' },
      { label: 'B', text: 'H₂ with Ni catalyst (hydrogenation)' },
      { label: 'C', text: 'KMnO₄' },
      { label: 'D', text: 'Br₂ in CCl₄' }
    ],
    correctOptionLabel: 'B',
    userOptionLabel: 'D',
    explanation: 'Addition of H₂ in presence of Ni catalyst reduces the double bond to single bond (hydrogenation). Br₂ adds to double bond without reduction.',
    tags: ['alkenes', 'hydrogenation', 'organic-reactions'],
    source: 'NEET 2022',
    mistakeAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    accuracy: 48
  }
];

export const PAGE_SIZE = 10;
