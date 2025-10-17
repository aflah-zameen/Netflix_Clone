import { Component, Inject, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trailer-modal',
  imports: [CommonModule],
  templateUrl: './trailer-modal.component.html',
  styleUrl: './trailer-modal.component.css'
})
export class TrailerModalComponent {
  @Input() trailerUrl!: SafeResourceUrl;   // ✅ Added trailerUrl property
  @Input() showModal: boolean = false;      // ✅ Ensure showModal is present

  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.trailerUrl = "";
  }
}
