import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.questionForm = this.fb.group({
      type: ['', Validators.required],
      question: ['', Validators.required],
      options: this.fb.array([]),
    });
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
