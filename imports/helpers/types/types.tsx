export interface User {
  profile: {
    userType: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
}

export interface Specialist {
  _id: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  gender: string;
  userId: string;
  email: string;
  phone: string;
  timezone: Timezone;
  experience: number;
  price: number;
  currency: string;
  online: string;
  offline: string;
  background: string;
  info: string;
  descriptor: string;
  methodics: Array<{ value: string; label: string }>;
  specializations: Array<{ value: string; label: string }>;
  languages: object[];
  schedule: Date;
}

export interface Client {
  _id: string;
  name: string;
  surname: string;
  specialization: Specialization;
  age: number;
  gender: string;
  userId: string;
  email: string;
  phone: string;
  timezone: Timezone;
  company?: string;
  completeSessions?: number;
  languages?: object[];
}

export interface Specialization {
  specializationId: string;
  title: string;
}

export interface Methodics {
  methodicsId: string;
  title: string;
}

export interface Timezone {
  timezone: string;
  abbreviation: string;
}

export interface Photo {
  userId: string;
  name: string;
  surname: string;
  photo: string;
}

export interface PageElement {
  categoryName: string;
  text: string;
  fontStyle: string;
  fontSize: number;
  order?: number;
  _id?: string;
}

export interface Question {
  _id: string;
  name: string;
  email: string;
  question: string;
  answer: string;
  faq: boolean;
}

export interface Blog {
  _id: string;
  author: string;
  title: string;
  content: string;
  photo: string;
}

export interface PickerQuestion {
  _id: string;
  name: string;
  content: string;
  type: string;
  options: string[];
}

export interface PromoCode {
  _id: string;
  code: string;
  discount: number;
  maxUses: number;
  startDate: Date;
  endDate: Date;
  company?: string;
  firstUseDate?: Date;
}

export interface Message {
  _id: string;
  sessionId: string;
  clientId: string;
  userId: string;
  specialistId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Room {
  _id: string;
  room: string;
  status: string;
  StartTime: Date;
  endTime: Date;
  schedule: Date;
  step: string;
  specialist: string;
  client: string;
  sessionID: string;
}

export interface Feedback {
  _id: string;
  after: number;
  before: number;
  specialist: number;
  service: number;
  comment: string;
  sessionID: string;
}

export interface Manager {
  name: string;
  specialistId: string;
  company?: string;
}

export interface Session {
  clientName: string;
  specialistName: string;
  specialistId: string;
  _id: string;
  comments: string;
  online: string | boolean;
  schedule: Date;
  complete: boolean;
  cancel: boolean;
  cancelMessage: string;
  room: string;
  status: string;
  StartTime: Date;
  endTime: Date;
  step: string;
  specialist: string;
  client: string;
  clientId: string;
  sessionID: string;
}

export interface Schedule {
  _id: string;
  specialistUserId: string;
  specialist: any;
  name: string;
  disable: object[];
  active: string;
  booked: object[];
  client: string;
  clientUserId: string;
  step: string;
  workDays: object[];
  minTime: string;
  maxTime: string;
}

export interface City {
  city: string;
}

export interface Gender {
  gender: string;
}

export interface File {
  _id: string;
  name: string;
  type: string;
  url: string;
}

export interface FileData {
  name: string;
  type: string;
  data: Uint8Array;
}

export interface Certificate {
  _id?: string;
  certificateUrl: string;
  specialistUserId: string;
  title?: string;
}

export interface Company {
  _id?: string;
  company: string;
}
