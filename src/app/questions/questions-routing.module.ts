import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';

const routes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'create', component: QuestionFormComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forChild(routes)]],
})
export class QuestionsRoutingModule {}
