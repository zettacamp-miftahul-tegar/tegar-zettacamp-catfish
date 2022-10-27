import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service'
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(private data: UserService, private router:Router ) {};

  // private route: ActivatedRoute = new ActivatedRoute;
  
  ngOnInit(): void {
  }

  @Input() user: any;

  selectData(data1: User){
    this.data.setSelectedData(data1);
  }

  onClick(items:any){
    this.router.navigate([`user/${this.user.id}`])
    
  }

}
