export interface LecueBookType {
  bookUuid: string;
  bookId: number;
  favoriteName: string;
  title: string;
  bookDate: string;
  noteNum: number;
  isFavorite: boolean;
}

export interface LecueBookProps extends LecueBookType {
  key: number;
}

export interface FavoriteBookType {
  bookId: number;
  bookUuid: string;
  favoriteImage: string;
  favoriteName: string;
}

export interface FavoriteBookProps extends FavoriteBookType {
  key: number;
}

export interface MyLetterProps {
  bookUuid: string;
  noteId: number;
  favoriteName: string;
  title: string;
  content: string;
  noteDate: string;
  noteTextColor: string;
  noteBackground: string;
}

export interface HistoryEmptyViewProps {
  topLineText: string;
  bottomLineText: string;
}

export type HistorySection = 'favorite' | 'mybook' | 'myletter';
