export type PracticeAreaId =
  | 'corporate-commercial'
  | 'dispute-resolution'
  | 'real-estate-conveyancing'
  | 'employment-labour'
  | 'intellectual-property'
  | 'cross-border-international'
  | 'real-estate'
  | 'employment-law'
  | 'family-law'
  | 'personal-injury'
  | 'criminal-defense';

export interface PracticeArea {
  id: PracticeAreaId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  keyServices: string[];
  clientFocus: string;
  roadmap: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  leadAttorneyId: string;
}

export interface Attorney {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  education: string[];
  barAdmissions: string[];
  languages: string[];
  memberships: string[];
  notableMatters: string[];
  email: string;
  phone: string;
  linkedIn?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company?: string;
  practiceArea: string;
  avatar?: string;
  verified: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  matterType: string;
  practiceArea: string;
  clientSector: string;
  challenge: string;
  strategy: string;
  outcome: string;
  confidentialityNote: string;
}

export interface LegalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  tags?: string[];
  authorImage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  practiceArea: PracticeAreaId;
  preferredContact: 'email' | 'phone' | 'video';
  preferredDate?: string;
  message: string;
  uploadedFileName?: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface FirmStats {
  clientsServed: number;
  yearsExperience: number;
  expertAttorneys: number;
  successRatePercent: number;
}
