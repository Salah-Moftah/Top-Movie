import { IGenre } from "@/types/types";

export function findGenre(arr1: number[], arr2: IGenre[]) {
  return arr2.filter((element) => {
    return arr1.includes(element.id);
  });
}
