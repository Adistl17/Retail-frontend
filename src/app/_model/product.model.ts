import { FileHandle } from "./file_handle.model"

export interface Product{
  pid : number;
  pname: string,
  pprice:number,
  pdesc:string,
  pcategory:string
  productImages : FileHandle[]
}
