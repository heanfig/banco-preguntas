import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/interfaces/question';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  public questions: Question[] = [];
  displayedColumns = ['type', 'question', 'actions'];

  constructor(private questionService: QuestionsService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data) => {
      console.warn('getQuestions', data);
      this.questions = data;
    });
  }
}
