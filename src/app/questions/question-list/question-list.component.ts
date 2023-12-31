import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/shared/interfaces/question';
import { QuestionsService } from '../questions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { QuestionTypeLabel } from 'src/app/shared/constants/question-type';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  public questions: Question[] = [];
  public questionLabel = QuestionTypeLabel;
  public dataSource = new MatTableDataSource<Question>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['type', 'question', 'actions'];
  decimalPipe = new DecimalPipe('es');

  constructor(
    private questionService: QuestionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${this.decimalPipe.transform(length)}`;
    };
  }

  openDeleteDialog(questionId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteQuestion(questionId);
      }
    });
  }

  deleteQuestion(questionId: string): void {
    this.questionService.removeQuestion(questionId);
    this.getQuestions();
  }
}
