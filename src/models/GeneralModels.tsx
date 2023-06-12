export interface ISeatList {
  seats: number[][];
  handleSelectSeat: (col: number, row: number) => void;
}

export interface ISeat {
  rowIndex: number;
  colIndex: number;
  isReserve: boolean;
  handleSelectSeat: (col: number, row: number) => void;
}
