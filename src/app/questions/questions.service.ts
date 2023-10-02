import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Question } from '../shared/interfaces/question';
import { HttpClient } from '@angular/common/http';
import { MOCK_QUESTION_LIST } from '../shared/constants/mocks';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionList: Question[] = MOCK_QUESTION_LIST;
  constructor() {}

  getQuestions(): Observable<Question[]> {
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
    return of(this.questionList).pipe(
      map((questions) => questions.find((question) => question.id === id))
    ) as Observable<Question>;
  }
}
