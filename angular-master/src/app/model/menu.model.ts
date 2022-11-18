export interface Menus {
    parameter: string
    id: string,
    recipe_name: string,
    imgUrl: String,
    price: string,
    available: string,
    status: string,
    ingredients : [
        {
            ingredient_id : [
                {
                    name: string,
                    stock: string
                }
            ],
            stock_used: string
        }
    ]
}