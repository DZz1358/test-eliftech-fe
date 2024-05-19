import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/events.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, PaginatorComponent, RouterModule, DatePipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public eventsList: Event[] = [];
  public currentPage = 1;
  public eventsPerPage = 6;
  public totalPages!: number;
  public eventsOnPage!: any[];
  public loading: boolean = false;

  eventsService = inject(EventsService)

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true

    this.eventsService.getEvents().subscribe(data => {
      console.log('data', data);
      this.eventsList = data;
      this.loading = false;
      this.updatePagination();

    });

  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.eventsList.length / this.eventsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  updatePagination() {
    const totalPages = Math.ceil(this.eventsList.length / this.eventsPerPage);
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    const endIndex = Math.min(startIndex + this.eventsPerPage, this.eventsList.length);
    this.eventsOnPage = this.eventsList.slice(startIndex, endIndex);

    this.totalPages = totalPages;
  }

  public registerOnEvent(id: string) {
    this.router.navigate([`dashboard/${id}/add-attendee`], {
      queryParams: {
        eventId: id,
      },
    });


  }

}
