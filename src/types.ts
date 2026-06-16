export interface GlossaryEntry {
  id: string;
  original: string;
  translation: string;
  notes?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  originalText: string;
  sourceLang: 'CN' | 'EN' | 'KR';
  targetLang: 'FR';
  
  // Pipeline stages
  draftText?: string;
  validationNotes?: string;
  translatedText?: string; // final refined prose
  
  status: 'pending' | 'translating' | 'done' | 'failed';
  error?: string;
  createdAt: string;
  translatedAt?: string;
}

export interface WebnovelProject {
  id: string;
  name: string;
  description?: string;
  sourceLang: 'CN' | 'EN' | 'KR';
  targetLang: 'FR';
  glossary: GlossaryEntry[];
  chapters: Chapter[];
  createdAt: string;
}
