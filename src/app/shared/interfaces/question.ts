import { QuestionType } from '../enums/question-type.enum';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  mandatory: boolean;
  options: string[];
}
