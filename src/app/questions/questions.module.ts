import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [QuestionListComponent],
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    QuestionsRoutingModule,
  ],
  exports: [MatTableModule, MatButtonModule],
})
export class QuestionsModule {}
