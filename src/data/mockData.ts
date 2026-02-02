import type { 
  Patient, 
  Resource, 
  ForumPost, 
  CareTask, 
  Appointment,
  BreathingExercise,
  MoodEntry 
} from '@/types';

export const mockPatient: Patient = {
  id: '1',
  firstName: 'Margaret',
  lastName: 'Johnson',
  age: 78,
  diagnosis: "Alzheimer's Disease",
  stage: 'Stage 2 (Mild)',
  diagnosisDate: '2023-03-15',
  medicalHistory: {
    conditions: ['Hypertension', 'Arthritis'],
    allergies: ['Penicillin'],
    notes: 'Responds well to music therapy. Prefers morning appointments.'
  },
  medications: [
    {
      id: '1',
      name: 'Donepezil',
      dosage: '10mg',
      frequency: 'Once daily',
      timeOfDay: ['morning'],
      instructions: 'Take with breakfast'
    },
    {
      id: '2',
      name: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      timeOfDay: ['morning'],
      instructions: 'For blood pressure'
    },
    {
      id: '3',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      timeOfDay: ['morning'],
      instructions: 'Take with food'
    }
  ],
  preferences: {
    favoriteFoods: ['Oatmeal with berries', 'Vegetable soup', 'Tea', 'Yogurt', 'Bananas'],
    calmingActivities: ['Classical music', 'Looking at photo albums', 'Gardening', 'Hand massages'],
    dislikes: ['Loud noises', 'Crowded places', 'Sudden changes in routine', 'Cold foods'],
    routines: ['Morning walk at 9 AM', 'Tea time at 3 PM', 'Early dinner at 5 PM', 'Bedtime at 9 PM']
  },
  emergencyContacts: [
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Daughter (Primary Caregiver)',
      phone: '(555) 123-4567',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      relationship: 'Neurologist',
      phone: '(555) 987-6543',
      isPrimary: false
    },
    {
      id: '3',
      name: 'Robert Johnson',
      relationship: 'Son',
      phone: '(555) 456-7890',
      isPrimary: false
    }
  ]
};

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Understanding the 7 Stages of Alzheimer\'s',
    description: 'A comprehensive guide to understanding how Alzheimer\'s progresses and what to expect at each stage.',
    category: 'understanding',
    type: 'article',
    readTime: '8 min read',
    isBookmarked: true,
    thumbnail: '/resource-1.jpg'
  },
  {
    id: '2',
    title: 'Creating a Safe Home Environment',
    description: 'Practical tips for making your home safer and more comfortable for someone with Alzheimer\'s.',
    category: 'safety',
    type: 'guide',
    readTime: '5 min read',
    isBookmarked: false,
    thumbnail: '/resource-2.jpg'
  },
  {
    id: '3',
    title: 'Managing Caregiver Stress: A Complete Guide',
    description: 'Learn strategies to manage stress, prevent burnout, and take care of your own mental health.',
    category: 'self-care',
    type: 'article',
    readTime: '6 min read',
    isBookmarked: true,
    thumbnail: '/resource-3.jpg'
  },
  {
    id: '4',
    title: 'Communication Tips for Late-Stage Care',
    description: 'How to effectively communicate with your loved one as their ability to speak declines.',
    category: 'daily-care',
    type: 'video',
    readTime: '4 min watch',
    isBookmarked: false,
    thumbnail: '/resource-4.jpg'
  },
  {
    id: '5',
    title: 'Gentle Exercise Routines for Seniors',
    description: 'Safe and beneficial exercises that can help maintain mobility and mood.',
    category: 'daily-care',
    type: 'video',
    readTime: '12 min watch',
    isBookmarked: false,
    thumbnail: '/resource-5.jpg'
  },
  {
    id: '6',
    title: 'Nutrition Guide for Alzheimer\'s Patients',
    description: 'What to eat, what to avoid, and how to ensure proper nutrition.',
    category: 'daily-care',
    type: 'guide',
    readTime: '7 min read',
    isBookmarked: true,
    thumbnail: '/resource-6.jpg'
  },
  {
    id: '7',
    title: 'Legal and Financial Planning',
    description: 'Important documents and decisions to make early in the diagnosis.',
    category: 'legal',
    type: 'article',
    readTime: '10 min read',
    isBookmarked: false,
    thumbnail: '/resource-7.jpg'
  },
  {
    id: '8',
    title: 'Sleep Problems and Solutions',
    description: 'Understanding sleep disturbances and strategies for better rest.',
    category: 'daily-care',
    type: 'article',
    readTime: '5 min read',
    isBookmarked: false,
    thumbnail: '/resource-8.jpg'
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    author: 'Jennifer M.',
    isAnonymous: false,
    title: 'How do you handle sundowning?',
    content: 'My mom gets very agitated and confused in the late afternoon and evening. Has anyone found strategies that work for managing sundowning symptoms?',
    topic: 'daily-challenges',
    createdAt: '2024-01-15T14:30:00Z',
    replies: [
      {
        id: 'r1',
        author: 'David K.',
        isAnonymous: false,
        content: 'We found that keeping lights bright in the evening helps, and we established a calming routine with soft music.',
        createdAt: '2024-01-15T15:45:00Z'
      },
      {
        id: 'r2',
        author: 'Anonymous',
        isAnonymous: true,
        content: 'Limiting caffeine and naps during the day made a big difference for us.',
        createdAt: '2024-01-15T16:20:00Z'
      }
    ],
    reactions: 45
  },
  {
    id: '2',
    author: 'Anonymous',
    isAnonymous: true,
    title: 'Feeling overwhelmed today...',
    content: 'It\'s been a really hard week. My dad had two falls and I\'m constantly worried. I know I need to take care of myself too but it feels impossible right now.',
    topic: 'emotional-support',
    createdAt: '2024-01-14T09:15:00Z',
    replies: [
      {
        id: 'r3',
        author: 'Maria S.',
        isAnonymous: false,
        content: 'Sending you hugs. Please remember you\'re doing your best. Have you considered respite care to give yourself a break?',
        createdAt: '2024-01-14T10:30:00Z'
      },
      {
        id: 'r4',
        author: 'Anonymous',
        isAnonymous: true,
        content: 'I felt the same way last month. The crisis line helped me - 1-800-272-3900. You\'re not alone.',
        createdAt: '2024-01-14T11:00:00Z'
      }
    ],
    reactions: 62
  },
  {
    id: '3',
    author: 'Thomas R.',
    isAnonymous: false,
    title: 'Tip: Music therapy really works!',
    content: 'I started playing my wife\'s favorite songs from her 20s and the transformation is amazing. She sings along and becomes more alert and engaged.',
    topic: 'tips',
    createdAt: '2024-01-13T16:00:00Z',
    replies: [
      {
        id: 'r5',
        author: 'Lisa P.',
        isAnonymous: false,
        content: 'Thank you for sharing! What kind of music works best?',
        createdAt: '2024-01-13T17:30:00Z'
      },
      {
        id: 'r6',
        author: 'Thomas R.',
        isAnonymous: false,
        content: 'She loves Frank Sinatra and big band music from the 40s. I created a playlist on Spotify.',
        createdAt: '2024-01-13T18:00:00Z'
      }
    ],
    reactions: 89
  },
  {
    id: '4',
    author: 'Patricia L.',
    isAnonymous: false,
    title: 'New to caregiving - where do I start?',
    content: 'My husband was just diagnosed with early-stage Alzheimer\'s. I\'m feeling lost about what steps to take first. Any advice?',
    topic: 'new-caregiver',
    createdAt: '2024-01-12T11:00:00Z',
    replies: [
      {
        id: 'r7',
        author: 'James W.',
        isAnonymous: false,
        content: 'First, take a deep breath. Start with legal and financial planning while your husband can still participate in decisions.',
        createdAt: '2024-01-12T12:15:00Z'
      }
    ],
    reactions: 34
  },
  {
    id: '5',
    author: 'Anonymous',
    isAnonymous: true,
    title: 'Dealing with aggression in late stage',
    content: 'My father has become increasingly aggressive, especially during personal care. It breaks my heart. Any advice from those in late-stage caregiving?',
    topic: 'late-stage',
    createdAt: '2024-01-11T19:30:00Z',
    replies: [
      {
        id: 'r8',
        author: 'Susan B.',
        isAnonymous: false,
        content: 'This is so hard. We found that explaining each step before doing it helps. Also, try to maintain a calm, soothing tone.',
        createdAt: '2024-01-11T20:45:00Z'
      }
    ],
    reactions: 56
  }
];

export const mockTodaysTasks: CareTask[] = [
  {
    id: '1',
    title: 'Morning medication (Donepezil, Amlodipine)',
    category: 'medication',
    time: '8:00 AM',
    completed: true
  },
  {
    id: '2',
    title: 'Prepare breakfast - oatmeal with berries',
    category: 'meal',
    time: '8:30 AM',
    completed: true
  },
  {
    id: '3',
    title: 'Morning walk (15-20 minutes)',
    category: 'activity',
    time: '9:00 AM',
    completed: false
  },
  {
    id: '4',
    title: 'Doctor appointment with Dr. Johnson',
    category: 'appointment',
    time: '2:00 PM',
    completed: false,
    notes: 'Bring medication list and recent symptom notes'
  },
  {
    id: '5',
    title: 'Afternoon tea and photo album time',
    category: 'activity',
    time: '3:00 PM',
    completed: false
  },
  {
    id: '6',
    title: 'Evening medication (Vitamin D)',
    category: 'medication',
    time: '6:00 PM',
    completed: false
  },
  {
    id: '7',
    title: 'Prepare dinner',
    category: 'meal',
    time: '5:00 PM',
    completed: false
  },
  {
    id: '8',
    title: 'Evening hygiene routine',
    category: 'hygiene',
    time: '8:00 PM',
    completed: false
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Neurology Checkup',
    doctor: 'Dr. Michael Chen',
    location: 'Memorial Hospital, Suite 302',
    date: '2024-01-16',
    time: '10:00 AM',
    notes: '3-month follow-up, bring medication list'
  },
  {
    id: '2',
    title: 'Memory Care Support Group',
    location: 'Community Center, Room B',
    date: '2024-01-19',
    time: '3:00 PM',
    notes: 'Caregiver support session'
  },
  {
    id: '3',
    title: 'Physical Therapy',
    doctor: 'Dr. Sarah Williams',
    location: 'Wellness Center',
    date: '2024-01-22',
    time: '11:30 AM'
  }
];

export const breathingExercises: BreathingExercise[] = [
  {
    id: '1',
    name: '4-7-8 Relaxing Breath',
    duration: 5,
    description: 'A calming technique that helps reduce anxiety and promote sleep.',
    pattern: {
      inhale: 4,
      hold: 7,
      exhale: 8
    }
  },
  {
    id: '2',
    name: 'Box Breathing',
    duration: 4,
    description: 'Used by athletes and Navy SEALs to stay calm under pressure.',
    pattern: {
      inhale: 4,
      hold: 4,
      exhale: 4
    }
  },
  {
    id: '3',
    name: 'Gentle Belly Breathing',
    duration: 5,
    description: 'Simple and effective for immediate stress relief.',
    pattern: {
      inhale: 4,
      hold: 2,
      exhale: 6
    }
  }
];

export const mockMoodEntries: MoodEntry[] = [
  { id: '1', date: '2024-01-08', mood: 3, notes: 'Average day, some stress' },
  { id: '2', date: '2024-01-09', mood: 4, notes: 'Good support group meeting' },
  { id: '3', date: '2024-01-10', mood: 2, notes: 'Difficult night, little sleep' },
  { id: '4', date: '2024-01-11', mood: 3, notes: 'Managing okay' },
  { id: '5', date: '2024-01-12', mood: 4, notes: 'Nice walk in the park' },
  { id: '6', date: '2024-01-13', mood: 5, notes: 'Family visit, feeling supported' },
  { id: '7', date: '2024-01-14', mood: 3, notes: 'Tired but coping' }
];

export const categoryLabels: Record<string, string> = {
  'all': 'All Resources',
  'understanding': 'Understanding Alzheimer\'s',
  'daily-care': 'Daily Care',
  'safety': 'Safety',
  'self-care': 'Self-Care',
  'legal': 'Legal & Financial'
};

export const topicLabels: Record<string, string> = {
  'new-caregiver': 'New to Caregiving',
  'daily-challenges': 'Daily Challenges',
  'emotional-support': 'Emotional Support',
  'tips': 'Tips & Tricks',
  'late-stage': 'Late Stage Care'
};
