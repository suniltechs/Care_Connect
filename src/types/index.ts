// Patient Profile Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  diagnosis: string;
  stage: string;
  diagnosisDate: string;
  photo?: string;
  medicalHistory: MedicalHistory;
  medications: Medication[];
  preferences: Preferences;
  emergencyContacts: EmergencyContact[];
}

export interface MedicalHistory {
  conditions: string[];
  allergies: string[];
  notes: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  instructions?: string;
}

export interface Preferences {
  favoriteFoods: string[];
  calmingActivities: string[];
  dislikes: string[];
  routines: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

// Care Plan Types
export interface CareTask {
  id: string;
  title: string;
  category: 'medication' | 'meal' | 'activity' | 'hygiene' | 'appointment';
  time: string;
  completed: boolean;
  notes?: string;
}

export interface DailyChecklist {
  date: string;
  tasks: CareTask[];
}

export interface Appointment {
  id: string;
  title: string;
  doctor?: string;
  location?: string;
  date: string;
  time: string;
  notes?: string;
}

// Resource Library Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: 'article' | 'video' | 'guide';
  readTime: string;
  thumbnail?: string;
  isBookmarked: boolean;
  content?: string;
}

export type ResourceCategory = 
  | 'all' 
  | 'understanding' 
  | 'daily-care' 
  | 'safety' 
  | 'self-care' 
  | 'legal';

// Community Forum Types
export interface ForumPost {
  id: string;
  author: string;
  avatar?: string;
  isAnonymous: boolean;
  title: string;
  content: string;
  topic: ForumTopic;
  createdAt: string;
  replies: Reply[];
  reactions: number;
}

export interface Reply {
  id: string;
  author: string;
  isAnonymous: boolean;
  content: string;
  createdAt: string;
}

export type ForumTopic = 
  | 'new-caregiver' 
  | 'daily-challenges' 
  | 'emotional-support' 
  | 'tips' 
  | 'late-stage';

// Mental Health Types
export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5
  notes?: string;
}

export interface BreathingExercise {
  id: string;
  name: string;
  duration: number;
  description: string;
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
  };
}

// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'caregiver' | 'professional' | 'moderator';
  patients: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  fontSize: 'normal' | 'large';
  highContrast: boolean;
  language: string;
  notifications: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'medication' | 'appointment' | 'alert';
  isRead: boolean;
}
