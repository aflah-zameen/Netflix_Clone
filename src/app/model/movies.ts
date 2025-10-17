export interface Movies{
    results ?: ResultEntity[]|null;
    page : number;
    total_results:number;
    dates : Dates;
    total_pages:number;
}

export interface ResultEntity{
    popularity : number;
    vote_count: number;
    video : boolean;
    poster_path : string;
    id : number;
    adult:number;
    backdrop_path : string;
    original_language:string;
    original_title : string;
    genre_ids ?: number[]|null;
    title : string;
    vote_average : number;
    overview : string;
    release_date : string; 
    videos?: VideoData;
}

export interface VideoData {
    results: VideoEntity[];
}

export interface VideoEntity {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;        // YouTube video ID
    site: string;       // Typically "YouTube"
    size: number;       // Video quality (e.g., 720p, 1080p)
    type: string;       // "Trailer", "Teaser", etc.
    official: boolean;
    published_at: string;
    id: string;
}

export interface Dates{
    maximum : string;
    minimum : string;
}