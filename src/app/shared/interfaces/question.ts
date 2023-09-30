import { QuestionType } from '../enums/question-type.enum';

export interface Question {
  type: QuestionType;
  text: string;
  mandatory: boolean;
}
