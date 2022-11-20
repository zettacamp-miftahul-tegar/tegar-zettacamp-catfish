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
  selectedCard: any;

  constructor(private apollo: Apollo) { }

  private userList = new BehaviorSubject<Menus[]>([]);
  userList$ = this.userList.asObservable();

  getRecipe(pagination:Menus) {
    return this.apollo.watchQuery({
      query : gql `query GetAllRecipes($recipeName: String, $page: Int, $limit: Int, $status: String) {
        getAllRecipes(recipe_name: $recipeName, page: $page, limit: $limit, status:$status ) {
          totalDocs
          recipes {
            id
            recipe_name
            price
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
        status: "deleted"
      },
      fetchPolicy: "network-only" // ketika ada perubahan ngambil server  
    })
  }

  addRecipe(post: any) {

    let {recipe_name, price, imgUrl, ingredients:{ingredient_id, stock_used}} = post
    // console.log("menu manegemnt", post);

    this.query = gql `mutation CreateRecipe($recipeName: String, $input: [RecipeIngredient], $price: Int, $imgUrl: String) {
      createRecipe(recipe_name: $recipeName, input: $input, price: $price, imgUrl: $imgUrl) {
        imgUrl
        recipe_name
        price
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
        $page: Int, $limit: Int, $name: String
      ) {
        getAllIngredient (
          page: $page
          limit: $limit
          name : $name
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
        ...pagination
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
    const id = post
    console.log(id);
    
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

  updateRecipe(post: Menus) {

    this.query = gql `
    mutation UpdateRecipe($updateRecipeId: ID, $recipeName: String, $input: [RecipeIngredient], $price: Int, $imgUrl: String) {
      updateRecipe(id: $updateRecipeId, recipe_name: $recipeName, input: $input, price: $price, imgUrl: $imgUrl) {
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
        input: post.ingredients
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
}