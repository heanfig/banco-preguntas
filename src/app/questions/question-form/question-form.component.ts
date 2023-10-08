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
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionFormMode } from 'src/app/shared/enums/question-form.mode';
import { v4 as uuidv4 } from 'uuid';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  public questionForm!: FormGroup;
  public formMode: QuestionFormMode;
  public questionType = QuestionType;
  public questionId: string = '';
  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) {
    this.formMode = QuestionFormMode.CREATION;
  }

  get text() {
    return this.questionForm.get('text') as FormControl;
  }

  /**
   * obtiene los options, el otro se puede borrar optionsFormArray ya
   * que hacen referencia a lo mismo
   */
  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  /**
   * get que obtiene los tipos que requerieren de preguntas
   * multiples
   */
  get questionTypeWithOptions() {
    return [
      QuestionType.CLOSED,
      QuestionType.DROPDOWN,
      QuestionType.MULTIPLECHOICE,
    ];
  }

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.questionId = id;
      this.formMode = QuestionFormMode.EDITION;
      this.cargarDatosParaEdicion(id);
      return;
    }

    this.options.push(this.fb.control('', Validators.required));
  }

  private cargarDatosParaEdicion(id: string) {
    this.questionForm.reset();
    this.questionsService.findQuestionById(id).subscribe((question) => {
      this.questionForm.patchValue(question);
      if (question?.options) {
        question.options.forEach((option) => {
          this.options.push(this.fb.control(option));
        });
      }
    });
  }

  private initForm() {
    this.questionForm = this.fb.group({
      type: ['OPEN', Validators.required],
      text: ['', Validators.required],
      options: this.fb.array([]),
      mandatory: [false],
    });
  }

  public addOption(event?: Event) {
    event?.preventDefault();
    this.options.push(this.fb.control('', Validators.required));
    this.autoFocusElement();
  }

  public preventInputSubmit(event: Event) {
    event.preventDefault();
  }

  public checkQuestionType(event: MatSelectChange) {
    if (
      this.questionTypeWithOptions.includes(event.value) &&
      this.options.length == 0
    ) {
      this.options.push(this.fb.control('', Validators.required));
    }
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

  private addQuestion() {
    this.questionsService.addQuestion({
      id: uuidv4(),
      ...this.questionForm.value,
    });
  }

  private editQuestion() {
    this.questionsService.editQuestion({
      id: this.questionId,
      ...this.questionForm.value,
    });
  }

  public onSubmit() {
    if (this.formMode == QuestionFormMode.EDITION) {
      this.editQuestion();
      this.router.navigate(['/questions']);
      return;
    }
    this.addQuestion();
    this.router.navigate(['/questions']);
  }
}
