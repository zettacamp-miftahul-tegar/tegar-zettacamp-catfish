import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { Menus } from 'src/app/model/menu.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  query: any;
  constructor(private apollo: Apollo) { }

  getRecipe(pagination:Menus, val:any, nameF:any) {

    let nameFilter : any = ""
    if (val) {
      nameFilter = val
    }

    let statusFilter : any = ""
    if (nameF) {
      statusFilter = nameF
    }

    return this.apollo.query({
      query : gql `query GetAllRecipes($recipeName: String, $page: Int, $limit: Int, $status: String) {
        getAllRecipes(recipe_name: $recipeName, page: $page, limit: $limit, status:$status ) {
          page
          maxPage
          currentDocs
          totalDocs
          recipes {
            id
            discount
            highlight
            special_offer
            recipe_name
            price
            special_offer_price
            imgUrl
            available
            status
            ingredients {
              ingredient_id {
                name
                stock
              }
              stock_used
            }
          }
        }
      }`,
      variables: {
        ...pagination,
        recipeName:nameFilter,
        status: statusFilter
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  addRecipe(post: any) {

    let {recipe_name, price, imgUrl, ingredients:{ingredient_id, stock_used}, discount} = post

    this.query = gql `mutation CreateRecipe($recipeName: String, $input: [RecipeIngredient], $price: Int, $imgUrl: String, $discount: Float) {
      createRecipe(recipe_name: $recipeName, input: $input, price: $price, imgUrl: $imgUrl, discount: $discount) {
        imgUrl
        recipe_name
        price
        status
        ingredients {
          ingredient_id {
            name
            stock
          }
          stock_used
        }
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        ...post,input:post.ingredients
    },
    fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
  })}

  getStock(pagination:Menus) {
    return this.apollo.watchQuery({
      query : gql `query getAllIngredient (
        $page: Int, $limit: Int, $name: String, $status: String,
      ) {
        getAllIngredient (
          page: $page
          limit: $limit
          name : $name
          status: $status
        ) {
          ingredients {
            id
            name
            stock
            status
          }
          page
          currentDocs
          totalDocs
        }
      }`,
      variables: {
        ...pagination,
        status: 'active'
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  deleteRecepies(post:Menus) {
    this.query = gql `
    mutation DeleteRecipe($id: ID) {
      deleteRecipe(id: $id) {
        id
        recipe_name
      }
    }`
    
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        id:post
      }
    })
    .subscribe(subs => {
      // console.log(subs)
    }, err => 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  )}

  updateRecipe(post: any) {

    this.query = gql `
    mutation UpdateRecipe($updateRecipeId: ID, $recipeName: String, $input: [RecipeIngredient], $price: Int, $imgUrl: String, $discount: Float) {
      updateRecipe(id: $updateRecipeId, recipe_name: $recipeName, input: $input, price: $price, imgUrl: $imgUrl, discount: $discount) {
        id
        recipe_name
        price
        imgUrl
        ingredients {
          ingredient_id {
            id
            name
            stock
          }
          stock_used
        }
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        updateRecipeId: post.id,
        recipeName: post.recipe_name,
        price: post.price,
        imgUrl: post.imgUrl,
        input: post.ingredients,
        discount: post.discount
      }
    })
  }

  datalength(bebas: any) {
    // let {getOneRecipeId = bebas

    return this.apollo
      .query({
        query : gql`
        query GetOneRecipe($getOneRecipeId: ID) {
          getOneRecipe(id: $getOneRecipeId) {
            id
            ingredients {
              ingredient_id {
                name
                id
              }
              stock_used
            }
            totalLength
          }
        }`,
        variables: {
          getOneRecipeId:bebas
        }
      }
    )
  }

  updateAvailable(post: any) {

    this.query = gql `
    mutation UpdateRecipe($updateRecipeId: ID, $status: String) {
      updateRecipe(id: $updateRecipeId, status: $status) {
        id
        recipe_name
        price
        imgUrl
        status
        ingredients {
          ingredient_id {
            id
            name
            stock
          }
          stock_used
        }
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        updateRecipeId: post.id,
        status: post.status,
      }
    })
  }

  updateMenu(post: any) {

    this.query = gql `
    mutation UpdateRecipe($updateRecipeId: ID, $highlight: Boolean) {
      updateRecipe(id: $updateRecipeId, highlight: $highlight) {
        status
        special_offer_price
        special_offer
        recipe_name
        price
        imgUrl
        highlight
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        updateRecipeId: post.id,
        highlight: post.highlight,
      }
    })
  }

  updateSpecial(post: any) {

    this.query = gql `
    mutation UpdateRecipe($updateRecipeId: ID, $specialOffer: Boolean) {
      updateRecipe(id: $updateRecipeId, special_offer: $specialOffer) {
        status
        special_offer_price
        special_offer
        recipe_name
        price
        imgUrl
        highlight
      }
    }`
    return this.apollo.mutate({
      mutation : this.query,
      variables: {
        updateRecipeId: post.id,
        specialOffer: post.special_offer,
      }
    })
  }

}