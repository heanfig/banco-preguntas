import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  findQuestionById(id: string): Observable<Question> {
    return this.http
      .get<Question[]>(this.jsonUrl)
      .pipe(
        map((questions) => questions.find((question) => question.id === id))
      ) as Observable<Question>;
  }
}
