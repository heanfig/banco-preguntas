import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../shared/interfaces/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private jsonUrl = 'assets/data/questions.json';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.jsonUrl);
  }
}
