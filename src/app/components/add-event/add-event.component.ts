import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { Router, RouterModule } from '@angular/router';
import { Event } from '../../models/events.interface';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, RouterModule, NgIf],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent implements OnInit {
  public myForm!: FormGroup;

  eventsService = inject(EventsService)

  constructor(private fb: FormBuilder,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required]],
    });

  }


  onSubmit() {
    const eventData: Event = this.myForm.value;

    this.eventsService.addEvent(eventData).subscribe(
      () => {
        this.myForm.reset()
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
