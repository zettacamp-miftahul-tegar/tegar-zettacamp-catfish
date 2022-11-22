export interface Cartz {
  user_id: string,
  total_price: number,
  cart : {
    id : string,
    amount : number,
    note : string,
    total_price : string,
    recipe_id : {
      id : string,
      recipe_name : string
      price: string
      imgUrl: string
    }
  }
}
