import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Event } from '../../models/events.interface';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  public myForm!: FormGroup;

  eventsService = inject(EventsService)

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      date: ['', [Validators.required]],
      selection: ['', [Validators.required]]
    });

  }


  onSubmit() {
    const eventData: Event = this.myForm.value;
    const queryParams = this.activatedRoute.snapshot.queryParams;

    const params = {
      eventId: queryParams['eventId'],
      name: eventData.name,
      email: eventData.email,
    }

    console.log('eventData', eventData);
    console.log('queryParams', queryParams);



    this.eventsService.addAttendance(params).subscribe(
      () => {
        this.myForm.reset()
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
