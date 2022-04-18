import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private APIkey: string = "W3JuH3NuEU1R4li1nfIMT1EclPpUm3E6";
  private _historial: string[] = [];

  public resultados: any[] = [];

  constructor(
    private http: HttpClient
  ){};

  get historial(): string[]{
    return [...this._historial];
  };

  buscarGifs(query: string): void{
    query = query.trim().toLowerCase();

    if(query == "") return;
    if(this._historial.includes(query)) return;

    this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${ this.APIkey }&q=${ query }&limit=5`).subscribe((resp: any) =>{
      this.resultados = resp.data;
      console.log(resp.data);
    });
  }
}
