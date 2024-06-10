export interface Book {
  author: string,
  coverPhotoURL: string,
  readingLevel: string,
  title: string
}
export interface MenuProps {
  listItems: number,
  setShowReadList: (showList:boolean) => void,
  showReadList: boolean
}

export interface BooksProps {
  setListItems: (booksNumber: number) => void,
  setShowReadList: (showList:boolean) => void,
  showReadList: boolean
}

export interface ReadingListProps {
  removeFromList: (book: Book) => void
}