import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Movies } from "../model/movies";

const enum endpoint{
    latest = "/movie/latest",
    now_playing = "/movie/now_playing",
    popular = "/movie/popular",
    top_rated = "/movie/top_rated",
    upcoming = "/movie/upcoming",
    trending = "/trending/all/week",
    originals = "/discover/tv"
}

@Injectable({
    providedIn : 'root'
})
export class MovieService{
    private URL:string = "https://api.themoviedb.org/3";
    private apiKey = environment.apiKey
    constructor(private http : HttpClient){

    }
    getMovieVideos(movieId: number): Observable<any> {
        return this.http.get<any>(`${this.URL}/movie/${movieId}/videos`, {
            params: {
                api_key: this.apiKey
            }
        });
    }
    
    getLatestMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.latest}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
    getNowPlayingMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.now_playing}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
    getPopularMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.popular}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
    getTopRatedMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.top_rated}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
    getUpcomingMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.upcoming}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
    getTrendingMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.trending}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
    getOriginalsMovie():Observable<Movies>{
        return this.http.get<Movies>(`${this.URL}${endpoint.originals}`,{
            params:{
                api_key :this.apiKey
            }
        });
    }
}
