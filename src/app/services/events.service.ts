import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  apiUrl = 'https://event-be-mu.vercel.app'

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }


  addEvent(data: Event) {
    return this.http.post(`${this.apiUrl}/add-event`, data);
  }

  addAttendance(data: any) {
    return this.http.post(`${this.apiUrl}/event/${data.eventId}/add-attendee`, data);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/event/${id}`);
  }

}
