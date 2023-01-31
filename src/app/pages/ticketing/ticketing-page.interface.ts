export interface IEvent {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
}
export interface IEventInfo {
  event: Event;
  sessions: Session[];
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Session {
  date: string;
  availability: string;
}
