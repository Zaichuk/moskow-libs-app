export interface LibraryInfo {
  Number: number;
  Cells: LibraryCell;
}

interface LibraryCell {
  FullName: string;
  CommonName: string;
  WebSite: string;
  ChiefName: string;
  ChiefPosition: string;
}
