import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Movies } from '../../model/movies';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../service/movie.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone:true,
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit   {
  @Input()sliderConfig !: any;
  @Input() movies !: Movies;
  @Input()title !: string;
  @Output() openTrailerEvent = new EventEmitter<number>();

  constructor(private sanitizer: DomSanitizer, private movieService: MovieService) {}  



  ngOnInit(): void {
      
  }
  openTrailer(movieId: number): void {
    this.openTrailerEvent.emit(movieId);  // Emit movieId to the parent
  }
}



