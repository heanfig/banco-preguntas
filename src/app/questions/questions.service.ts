import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Question } from '../shared/interfaces/question';
import { HttpClient } from '@angular/common/http';
import { MOCK_QUESTION_LIST } from '../shared/constants/mocks';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  //private jsonUrl = 'assets/data/questions.json';
  private questionList: Question[] = MOCK_QUESTION_LIST;
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    //return this.http.get<Question[]>(this.jsonUrl);
    return of(this.questionList);
  }

  removeQuestion(id: string) {
    const questionList = this.questionList.filter((item) => item.id !== id);
    this.questionList = questionList;
  }

  addQuestion(question: Question) {
    const questionList = [question, ...this.questionList];
    this.questionList = questionList;
  }

  findQuestionById(id: string): Observable<Question> {
    return of(MOCK_QUESTION_LIST).pipe(
      map((questions) => questions.find((question) => question.id === id))
    ) as Observable<Question>;
    /*return this.http
      .get<Question[]>(this.jsonUrl)
      .pipe(
        map((questions) => questions.find((question) => question.id === id))
      ) as Observable<Question>;*/
  }
}
