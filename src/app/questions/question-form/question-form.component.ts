import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionFormMode } from 'src/app/shared/enums/question-form.mode';
import { v4 as uuidv4 } from 'uuid';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  public questionForm!: FormGroup;
  public formMode: QuestionFormMode;
  public questionType = QuestionType;
  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) {
    this.formMode = QuestionFormMode.CREATION;
  }

  get optionsFormArray(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  get options() {
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

  public addOption(event?: Event) {
    event?.preventDefault();
    this.options.push(this.fb.control('', Validators.required));
    this.autoFocusElement();
  }

  public preventInputSubmit(event: Event) {
    event.preventDefault();
  }

  public autoFocusElement() {
    setTimeout(() => {
      const lastInput = this.inputElements.last;
      if (lastInput) {
        lastInput.nativeElement.focus();
      }
    });
  }

  public removeOption(index: number) {
    this.options.removeAt(index);
  }

  public onSubmit() {
    this.questionsService.addQuestion({
      id: uuidv4(),
      ...this.questionForm.value,
    });
    this.router.navigate(['/questions']);
  }
}
