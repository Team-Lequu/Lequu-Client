export interface LecueBookProps {
  key: number;
  bookId: number;
  favoriteName: string;
  title: string;
  bookDate: string;
  noteNum: number;
}

export interface LecueNoteProps {
  key: number;
  noteId: number;
  favoriteName: string;
  title: string;
  noteDate: string;
  content: string;
  noteTextColor: number;
  noteBackgroundColor: number;
  noteBackgroundImage: string;
  noteList: LecueNoteType[];
}

export interface LecueBookType {
  bookId: number;
  favoriteName: string;
  title: string;
  bookDate: string;
  noteNum: number;
}

export interface LecueNoteType {
  noteId: number;
  favoriteName: string;
  title: string;
  noteDate: string;
  content: string;
  noteTextColor: number;
  noteBackgroundColor: number;
  noteBackgroundImage: string;
}
