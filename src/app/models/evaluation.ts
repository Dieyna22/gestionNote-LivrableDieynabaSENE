export class Evaluations {
  idEvaluation: number = 0;
  semester: string = '';
  date: Date = new Date();
  type: string = '';
  status: string = '';
  subject: string = '';
  Classe: any[] = [];
  grade: number | null = null;

}

export interface Evaluation {
  id: number;
  nom: string;
}

