import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SubSink } from 'subsink';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-homepages',
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.css']
})
export class HomepagesComponent implements OnInit {

  private subs = new SubSink();
  menus:any
  menus1:any
  
  first_name: any;
  last_name: any;
  token : string | null = "";
  user_type: string | null = "";

  currentLanguage = 'en';
  srcImages: string = 'https://cdn-icons-png.flaticon.com/512/323/323329.png';

  constructor(private data: DataService, private translate : TranslateService) { 
    translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');
  }

  changeLanguage(lang: any) {
    console.log(lang);
    if (lang === 'en') {
      this.translate.use('fr');
      this.currentLanguage = 'fr';
      this.srcImages =
        '../assets/img/icons8-france-48.png';
    } else {
      this.translate.use('en');
      this.currentLanguage = 'en';
      this.srcImages = 'https://cdn-icons-png.flaticon.com/512/323/323329.png';
    }
  }

  ngOnInit(): void {
    this.getDatas_special()
    this.getDatas_menu()
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
      this.user_type = JSON.parse(localStorage.getItem('user_type')!)
    }
    this.first_name = JSON.parse(localStorage.getItem('first_name') !);
    this.last_name = JSON.parse(localStorage.getItem('last_name') !);
  }

  menus1length!: number;
  getDatas_special() {
    this.subs.sink = this.data.getRecipies_special()?.valueChanges.subscribe((resp : any) => {
      this.menus = resp?.data?.getAllRecipe?.recipes
      this.menus1length = resp?.data?.getAllRecipe?.recipes?.length
    })
  }

  menus2length!: number;
  getDatas_menu() {
    this.subs.sink = this.data.getRecipies_menus()?.valueChanges.subscribe((resp : any) => {
      this.menus1 = resp?.data?.getAllRecipe?.recipes
      this.menus2length = resp?.data?.getAllRecipe?.recipes?.length
    })
  }

}
