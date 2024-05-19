import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/events.interface';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [NgIf, RouterModule, DatePipe, NgFor],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {

  eventsService = inject(EventsService)
  public loading: boolean = false;
  public event!: Event;

  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.eventsService.getEvent(this.activatedRoute.snapshot.params['id']).subscribe((data: any) => {
      this.event = data;
    })
  }

}
