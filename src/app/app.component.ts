declare var $: any;
import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './component/slider/slider.component';
import { TrailerModalComponent } from './component/trailer-modal/trailer-modal.component';
import { Subscription } from 'rxjs';
import { Movies } from './model/movies';
import { MovieService } from './service/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatSlideToggleModule,MatIconModule,CommonModule,SliderComponent,TrailerModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy,AfterViewInit {
  sticky : boolean = false
  subs : Subscription[]=[]
  trending !: Movies
  popular !: Movies
  topRated !: Movies
  originals !: Movies
  nowPlaying!: Movies
  latest !: Movies
  upcoming!:Movies

  sliderConfig ={
    slidesToShow:9,
    slidesToScroll:2,
    arrows:true,
    autoplay : false
  }

  trailerUrl!: SafeResourceUrl; 
  showModal: boolean = false;


  @ViewChild('stickHeader')
  header !: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
      if(this.header && this.header.nativeElement){
        this.handleScroll();
      }
  }

  headerBGUrl !: string

  constructor(private movie : MovieService,private sanitizer: DomSanitizer){

  }

  ngOnInit(): void {
      this.subs.push(this.movie.getTrendingMovie().subscribe(data => {
        this.trending = data;
        this.headerBGUrl = this.trending?.results?.[0]?.backdrop_path 
        ? `http://image.tmdb.org/t/p/original${this.trending.results[0].backdrop_path}`
        : 'path/to/default/image.jpg';      
      }));
      this.subs.push(this.movie.getLatestMovie().subscribe(data => this.latest = data));
      this.subs.push(this.movie.getNowPlayingMovie().subscribe(data => this.nowPlaying = data));
      this.subs.push(this.movie.getOriginalsMovie().subscribe(data => this.originals = data));
      this.subs.push(this.movie.getPopularMovie().subscribe(data => this.popular = data));
      this.subs.push(this.movie.getUpcomingMovie().subscribe(data => this.upcoming = data));
  }

  ngOnDestroy(): void {
      this.subs.map(s => s.unsubscribe())
  }


  @HostListener('window:scroll', ['$event'])
handleScroll() {
  if (typeof window !== 'undefined') {  
    const windowScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (windowScroll >= this.header?.nativeElement?.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
openTrailer(movieId: number): void {
  this.trailerUrl = '';
  this.showModal = false;
  this.movie.getMovieVideos(movieId).subscribe((data) => {
    const trailer = data.results.find(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (trailer) {
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${trailer.key}`
      );
     this.showModal = true;
    } else {
      alert('Trailer not found.');
    }
  });
}

}


