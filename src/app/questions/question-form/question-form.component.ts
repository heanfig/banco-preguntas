import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionFormMode } from 'src/app/shared/enums/question-form.mode';
import { Question } from 'src/app/shared/interfaces/question';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  formMode: QuestionFormMode;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {
    this.formMode = QuestionFormMode.CREATION;
  }

  get optionsFormArray(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formMode = QuestionFormMode.EDITION;
      this.cargarDatosParaEdicion(id);
    }
  }

  private cargarDatosParaEdicion(id: string) {
    this.questionsService.findQuestionById(id).subscribe((question) => {
      this.questionForm.patchValue(question);
      question.options.forEach((option) => {
        this.optionsFormArray.push(this.fb.control(option));
      });
    });
  }

  private initForm() {
    this.questionForm = this.fb.group({
      type: ['OPEN', Validators.required],
      text: ['', Validators.required],
      options: this.fb.array([]),
      mandatory: [false],
    });

    this.options.push(this.fb.control('', Validators.required));
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control('', Validators.required));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onSubmit() {
    //this.questionsService.addQuestion(this.questionForm.value);
    //console.log(this.questionsService.getQuestions());
  }
}
