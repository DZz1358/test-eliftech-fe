import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  constructor() { }

  goToPrevPage() {
    this.prevPage.emit();
  }

  goToNextPage() {
    this.nextPage.emit();
  }
}
