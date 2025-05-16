export interface User {
  id: string;
  email: string;
  created_at: string;
  status: string;
  last_seen: Date | null;
  profile: Profile;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  website?: string;
  ticket_link?: string;
  views?: number;
  banner?: string;
  event_start_date?: string;
  event_end_date?: string;
  created_at?: string;
  owner: Profile | null;
  location?: string | null;
  link?: string | null;
  comments: Comment[];
  reactions: Reaction[];
  attachment?: string;
  type?: string;
}

export interface Comment {
  text: string;
  owner: Partial<Profile>;
  created_at: string;
  id: string;
}

export interface Reaction {
  text: string;
  owner: Partial<Profile>;
  created_at: string;
  id: string;
}

export interface Article {
  id: string;
  title: string;
  body: string;
  banner: string;
  created_at: string;
  owner: Profile;
  comments: Comment[];
  reactions: Reaction[];
  views?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  website: string;
  github_url: string | null;
  created_at: string;
  collaborators?: Profile[];
  skills?: Skill[];
  reactions?: any[];
  comments?: Comment[];
  owner: Profile;
  start_date?: string;
  status?: string;
  location?: string;
  views?: number | null;
  updated_at: string;
  attachment?: string;
  requires_feedback?: string;
  feedback_guide?: string;
  feedbacks?: Feedback[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  website: string;
  application_url: string | null;
  created_at: string;
  skills?: Skill[];
  likes?: any[];
  comments: Comment[];
  reactions: Reaction[];
  owner: Profile;
  deadline?: string;
  status?: string;
  location?: string;
  views?: number | null;
  updated_at: string;
}

export interface Skill {
  title: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  resume: string | null;
  languages?: string[] | null;
  skills?: Skill[] | null;
  title: string;
  heading: string;
  views?: number;
  followers?: Connection[];
  following?: Connection[];
  comments?: Comment[];
  reactions: Reaction[];
  events?: Event[];
  jobs?: Job[];
  articles?: Article[];
  projects?: Project[];
  user_id?: string;
  status?: string;
  is_mentor?: boolean;
  mentor_note?: string;
  requires_update?: boolean;
  visibility_status?: string;
}

export interface Connection {
  profile_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  title?: string;
  user_id?: string;
}

export interface Connections {
  followers: Connection[];
  following: Connection[];
}

export interface Feedback {
  id: string;
  guide: string;
  text: string;
  owner: Profile;
}

export enum ActivityTypes {
  FOLLOW = "follow",
  LIKE = "like",
  COMMENT = "comment",
}

export interface Activity {
  id: string;
  type: ActivityTypes;
  owner: Profile;
  participant: Profile;
  event: Event;
  profile: Profile;
  project: Project;
}

export interface Notification {
  id: string;
  initiator: {
    id: string;
    profile: Partial<Profile>;
  };
  recipient: {
    id: string;
    profile: Partial<Profile>;
  };
  category: string;
  is_read: boolean;
  article?: Article;
  event?: Event;
  project?: Project;
  job?: Job;
  profile?: Profile;
  resource_type: string;
  created_at?: string;
  content?: string;
}

export const mapLanguageToFlag = {
  english: "england",
  french: "france",
  spanish: "spain",
  italian: "italy",
  german: "germany",
};

export enum ProjectStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in progress",
  PAUSED = "paused",
  NEED_COLLABORATORS = "need collaborators",
}
export interface Message {
  id: string;
  text: string;
  sender: User;
  created_at: string;
}

export interface EventWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Event[];
}

export interface ArticlesWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Article[];
}

export interface JobsWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Job[];
}

export interface ProjectsWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Project[];
}

export interface ProfilesWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Profile[];
}

export interface NotificationsWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Notification[];
}

export interface IFilters {
  skills?: string[] | string;
  status?: string;
  keyword?: string;
  is_mentor?: undefined | boolean;
  order?: string;
  sortBy?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  type?: string;
  createdAt?: string | Date;
}

export interface IPagination {
  page: number;
  limit: number;
}

export interface Option {
  value: string;
  label: string;
}

export interface IMessageFilters {
  limit: number;
  page: number;
}
