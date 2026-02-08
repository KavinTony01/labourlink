export interface PriceGuidance {
  min: number;
  max: number;
  unit: string;
}

export interface JobTypeConfig {
  id: string;
  category: string;
  name: string;
  icon: string;
  description: string;
  suggestedQuestions: string[];
  estimatedDuration: string;
  skillsRequired: string[];
  priceGuidance: PriceGuidance;
  insuranceRecommended: boolean;
}

export const JOB_TYPES: JobTypeConfig[] = [
  // CLEANING
  {
    id: 'house_cleaning',
    category: 'CLEANING',
    name: 'House Cleaning',
    icon: '🏠',
    description: 'General cleaning services for residential properties',
    suggestedQuestions: [
      'What is the size of your house (in sq ft)?',
      'How frequently do you need cleaning?',
      'Any specific areas needing extra attention?',
      'Do you have pets or allergies?'
    ],
    estimatedDuration: '2-4 hours',
    skillsRequired: ['Attention to Detail', 'Time Management', 'Physical Stamina'],
    priceGuidance: { min: 500, max: 2000, unit: 'Per Visit' },
    insuranceRecommended: false
  },
  {
    id: 'carpet_cleaning',
    category: 'CLEANING',
    name: 'Carpet Cleaning',
    icon: '🧹',
    description: 'Professional carpet cleaning and restoration',
    suggestedQuestions: [
      'What is the carpet area (in sq ft)?',
      'Type of carpet material?',
      'Any stains or damage?',
      'Preferred cleaning method?'
    ],
    estimatedDuration: '2-3 hours',
    skillsRequired: ['Equipment Operation', 'Stain Removal', 'Attention to Detail'],
    priceGuidance: { min: 800, max: 3000, unit: 'Per Room' },
    insuranceRecommended: true
  },
  {
    id: 'window_cleaning',
    category: 'CLEANING',
    name: 'Window Cleaning',
    icon: '🪟',
    description: 'Window and glass cleaning services',
    suggestedQuestions: [
      'Number of windows?',
      'Building height/access?',
      'Interior and exterior?',
      'Frame condition?'
    ],
    estimatedDuration: '1-3 hours',
    skillsRequired: ['Safety Awareness', 'Attention to Detail', 'Physical Fitness'],
    priceGuidance: { min: 300, max: 1500, unit: 'Per Job' },
    insuranceRecommended: true
  },

  // PLUMBING
  {
    id: 'pipe_repair',
    category: 'PLUMBING',
    name: 'Pipe Repair',
    icon: '🔧',
    description: 'Repair and maintenance of water pipes',
    suggestedQuestions: [
      'Type of pipe (PVC/copper/steel)?',
      'Location and accessibility?',
      'Is it leaking or clogged?',
      'Age of pipes?'
    ],
    estimatedDuration: '1-3 hours',
    skillsRequired: ['Plumbing Knowledge', 'Problem Solving', 'Precision'],
    priceGuidance: { min: 400, max: 2500, unit: 'Per Job' },
    insuranceRecommended: true
  },
  {
    id: 'leak_detection',
    category: 'PLUMBING',
    name: 'Leak Detection',
    icon: '💧',
    description: 'Identify and locate water leaks',
    suggestedQuestions: [
      'Where is the leak visible?',
      'How long has it been leaking?',
      'Any water damage?',
      'Plumbing type (modern/old)?'
    ],
    estimatedDuration: '1-2 hours',
    skillsRequired: ['Diagnostics', 'Technical Knowledge', 'Attention to Detail'],
    priceGuidance: { min: 300, max: 1000, unit: 'Per Job' },
    insuranceRecommended: false
  },
  {
    id: 'installation',
    category: 'PLUMBING',
    name: 'Installation',
    icon: '⚙️',
    description: 'Installation of new plumbing fixtures',
    suggestedQuestions: [
      'What type of fixture?',
      'Installation location?',
      'Existing plumbing compatibility?',
      'Any additional work needed?'
    ],
    estimatedDuration: '2-4 hours',
    skillsRequired: ['Technical Expertise', 'Precision', 'Tool Proficiency'],
    priceGuidance: { min: 800, max: 4000, unit: 'Per Fixture' },
    insuranceRecommended: true
  },

  // REPAIRS
  {
    id: 'furniture_repair',
    category: 'REPAIRS',
    name: 'Furniture Repair',
    icon: '🪑',
    description: 'Repair and restoration of furniture',
    suggestedQuestions: [
      'Type of furniture?',
      'What needs to be repaired?',
      'Material (wood/upholstery)?',
      'Age and condition?'
    ],
    estimatedDuration: '2-5 hours',
    skillsRequired: ['Carpentry', 'Problem Solving', 'Craftsmanship'],
    priceGuidance: { min: 500, max: 3000, unit: 'Per Item' },
    insuranceRecommended: false
  },
  {
    id: 'appliance_repair',
    category: 'REPAIRS',
    name: 'Appliance Repair',
    icon: '🔩',
    description: 'Repair of electrical appliances',
    suggestedQuestions: [
      'Type of appliance?',
      'What is the issue?',
      'Brand and model?',
      'Last serviced when?'
    ],
    estimatedDuration: '1-3 hours',
    skillsRequired: ['Electrical Knowledge', 'Diagnostics', 'Technical Skill'],
    priceGuidance: { min: 400, max: 2000, unit: 'Per Repair' },
    insuranceRecommended: true
  },
  {
    id: 'general_repair',
    category: 'REPAIRS',
    name: 'General Repair',
    icon: '🛠️',
    description: 'General handyman and repair services',
    suggestedQuestions: [
      'What needs to be repaired?',
      'How complex is the job?',
      'Materials needed?',
      'Timeline requirement?'
    ],
    estimatedDuration: '1-4 hours',
    skillsRequired: ['Problem Solving', 'Versatility', 'Tool Proficiency'],
    priceGuidance: { min: 300, max: 2000, unit: 'Per Job' },
    insuranceRecommended: false
  },

  // CARPENTRY
  {
    id: 'cabinet_making',
    category: 'CARPENTRY',
    name: 'Cabinet Making',
    icon: '🚪',
    description: 'Custom cabinet and storage solutions',
    suggestedQuestions: [
      'Cabinet size and design?',
      'Type of wood?',
      'Installation location?',
      'Timeline for completion?'
    ],
    estimatedDuration: '5-20 hours',
    skillsRequired: ['Woodworking', 'Design', 'Precision', 'Craftsmanship'],
    priceGuidance: { min: 5000, max: 50000, unit: 'Per Project' },
    insuranceRecommended: false
  },
  {
    id: 'door_installation',
    category: 'CARPENTRY',
    name: 'Door Installation',
    icon: '🚪',
    description: 'Installation of doors and frames',
    suggestedQuestions: [
      'Door type (wood/steel)?',
      'Size and measurement?',
      'Frame condition?',
      'Hinges and locks included?'
    ],
    estimatedDuration: '2-4 hours',
    skillsRequired: ['Carpentry', 'Precision', 'Measurement', 'Hardware Knowledge'],
    priceGuidance: { min: 1500, max: 5000, unit: 'Per Door' },
    insuranceRecommended: false
  },

  // PAINTING
  {
    id: 'interior_painting',
    category: 'PAINTING',
    name: 'Interior Painting',
    icon: '🎨',
    description: 'Interior wall and ceiling painting',
    suggestedQuestions: [
      'Area to be painted (in sq ft)?',
      'Current paint condition?',
      'Color preference?',
      'Any surface preparation needed?'
    ],
    estimatedDuration: '4-8 hours',
    skillsRequired: ['Painting Technique', 'Attention to Detail', 'Time Management'],
    priceGuidance: { min: 1000, max: 5000, unit: 'Per Room' },
    insuranceRecommended: false
  },
  {
    id: 'exterior_painting',
    category: 'PAINTING',
    name: 'Exterior Painting',
    icon: '🎨',
    description: 'Exterior wall and fence painting',
    suggestedQuestions: [
      'Surface area (in sq ft)?',
      'Current condition?',
      'Weather protection needed?',
      'Color scheme?'
    ],
    estimatedDuration: '6-12 hours',
    skillsRequired: ['Painting', 'Weather Knowledge', 'Safety', 'Precision'],
    priceGuidance: { min: 2000, max: 8000, unit: 'Per Area' },
    insuranceRecommended: true
  },

  // ELECTRICAL
  {
    id: 'wiring_installation',
    category: 'ELECTRICAL',
    name: 'Wiring Installation',
    icon: '⚡',
    description: 'Electrical wiring installation and upgrades',
    suggestedQuestions: [
      'Wiring type needed?',
      'Area to be wired?',
      'Load requirements?',
      'Safety certifications needed?'
    ],
    estimatedDuration: '4-8 hours',
    skillsRequired: ['Electrical Knowledge', 'Safety', 'Certification', 'Precision'],
    priceGuidance: { min: 2000, max: 10000, unit: 'Per Circuit' },
    insuranceRecommended: true
  },
  {
    id: 'fixture_repair',
    category: 'ELECTRICAL',
    name: 'Fixture Repair',
    icon: '💡',
    description: 'Repair of electrical fixtures and switches',
    suggestedQuestions: [
      'Type of fixture?',
      'What is not working?',
      'Age of installation?',
      'Safety concerns?'
    ],
    estimatedDuration: '0.5-2 hours',
    skillsRequired: ['Electrical Knowledge', 'Safety', 'Diagnostics'],
    priceGuidance: { min: 200, max: 1000, unit: 'Per Fixture' },
    insuranceRecommended: true
  },

  // LANDSCAPING
  {
    id: 'gardening',
    category: 'LANDSCAPING',
    name: 'Gardening',
    icon: '🌿',
    description: 'Garden maintenance and planting services',
    suggestedQuestions: [
      'Area size?',
      'Plant type preference?',
      'Maintenance frequency?',
      'Soil condition?'
    ],
    estimatedDuration: '2-6 hours',
    skillsRequired: ['Horticulture', 'Physical Stamina', 'Plant Knowledge'],
    priceGuidance: { min: 500, max: 3000, unit: 'Per Visit' },
    insuranceRecommended: false
  },
  {
    id: 'lawn_maintenance',
    category: 'LANDSCAPING',
    name: 'Lawn Maintenance',
    icon: '🌱',
    description: 'Regular lawn care and mowing',
    suggestedQuestions: [
      'Lawn area (in sq ft)?',
      'Current condition?',
      'Frequency required?',
      'Special services needed?'
    ],
    estimatedDuration: '1-3 hours',
    skillsRequired: ['Equipment Operation', 'Plant Care', 'Time Management'],
    priceGuidance: { min: 300, max: 1500, unit: 'Per Visit' },
    insuranceRecommended: false
  },
  {
    id: 'tree_trimming',
    category: 'LANDSCAPING',
    name: 'Tree Trimming',
    icon: '🌳',
    description: 'Tree trimming and branch removal',
    suggestedQuestions: [
      'Tree type and height?',
      'Type of trimming needed?',
      'Disposal of branches?',
      'Safety equipment available?'
    ],
    estimatedDuration: '2-6 hours',
    skillsRequired: ['Tree Knowledge', 'Safety', 'Equipment Operation', 'Physical Fitness'],
    priceGuidance: { min: 1000, max: 5000, unit: 'Per Tree' },
    insuranceRecommended: true
  }
];

export const JOB_CATEGORIES = Array.from(new Set(JOB_TYPES.map(t => t.category)));

export const JOB_SKILLS = [
  'Attention to Detail',
  'Time Management',
  'Physical Stamina',
  'Equipment Operation',
  'Safety Awareness',
  'Problem Solving',
  'Precision',
  'Plumbing Knowledge',
  'Technical Expertise',
  'Tool Proficiency',
  'Carpentry',
  'Craftsmanship',
  'Electrical Knowledge',
  'Diagnostics',
  'Woodworking',
  'Design',
  'Painting Technique',
  'Weather Knowledge',
  'Safety',
  'Certification',
  'Horticulture',
  'Plant Care',
  'Tree Knowledge',
  'Equipment Operation',
  'Physical Fitness',
  'Versatility',
  'Hardware Knowledge',
  'Measurement',
  'Technical Skill',
  'Stain Removal'
];
