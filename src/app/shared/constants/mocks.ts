import { Question } from "../interfaces/question";

export const MOCK_QUESTION_LIST = [
  {
    id: '04bf425d-9ef8-490f-8a10-1b2b6312ef74',
    type: 'OPEN',
    text: '¿Cuál es tu color favorito?',
    mandatory: true,
  },
  {
    id: 'b79e90e8-d8fa-4b38-8b3f-24a1c0021efd',
    type: 'CLOSED',
    text: '¿Te gusta el helado?',
    mandatory: true,
  },
  {
    id: '72402d30-d5d4-40fd-886e-115e621c497a',
    type: 'MULTIPLECHOICE',
    text: '¿Cuáles de los siguientes frutos te gusta comer? (Puede seleccionar más de uno)',
    options: ['Manzana', 'Plátano', 'Cereza', 'Pera'],
    mandatory: false,
  },
  {
    id: 'fa4cc809-1728-4bf9-a975-41a71405f5c1',
    type: 'MULTIPLECHOICE',
    text: '¿Cuáles de los siguientes frutos te gusta comer? (Puede seleccionar más de uno)',
    options: ['Manzana', 'Plátano', 'Cereza', 'Pera'],
    mandatory: false,
  },
  {
    id: '444bfb97-4484-4fce-84ba-72a084882d55',
    type: 'MULTIPLECHOICE',
    text: '¿Cuáles de los siguientes frutos te gusta comer? (Puede seleccionar más de uno)',
    options: ['Manzana', 'Plátano', 'Cereza', 'Pera'],
    mandatory: false,
  },
  {
    id: '3aad4ceb-b3aa-4232-b512-4ee5e6738bce',
    type: 'MULTIPLECHOICE',
    text: '¿Cuáles de los siguientes frutos te gusta comer? (Puede seleccionar más de uno)',
    options: ['Manzana', 'Plátano', 'Cereza', 'Pera'],
    mandatory: false,
  },
  {
    id: '163cd9b1-7c81-41db-8ff4-6794e8574a05',
    type: 'MULTIPLECHOICE',
    text: '¿Cuáles de los siguientes frutos te gusta comer? (Puede seleccionar más de uno)',
    options: ['Manzana', 'Plátano', 'Cereza', 'Pera'],
    mandatory: false,
  },
  {
    id: '8fbed864-4871-4ae4-9b38-6547d077b38b',
    type: 'Calendar',
    text: 'Selecciona una fecha importante',
    mandatory: false,
  },
  {
    id: 'c189dbea-977c-46d2-b2f6-fed597dc4ee5',
    type: 'Dropdown',
    text: 'Elige un país de la lista',
    options: ['México', 'Colombia', 'Perú', 'Argentina'],
    mandatory: true,
  },
] as Question[];
