// para crear una interface rpida sabiendo como viene la data de un JSOn, puedo copiar ese json, usar la extencion de convertir de json a interface
//quicktype.io
export interface PokeResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
