export interface Note {
  id?: string;
  creationDate?: string;
  updateDate?: string;
  title: string;
  text: string;
  value: number;
  userId?: number;
  authorUsername?: string;
  authorEmail: string;
}
