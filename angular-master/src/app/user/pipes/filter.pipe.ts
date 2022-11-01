import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user.model';
import { AccentPipe } from './accent.pipe';
import { CombinePipe } from './combine.pipe';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  
  accentPipe = new AccentPipe();
  combinePipe = new CombinePipe();

  transform(users: User[], keyword: string): User[] {
    // if (users.length == 0 || !keyword) return users;
    
    keyword = this.accentPipe.transform(keyword)
    keyword = this.combinePipe.transform(keyword)
    
    users = users.filter(user => {
      let name = this.accentPipe.transform(user.name)
      name = this.combinePipe.transform(name)
      return name.includes(keyword)
    })
    return users
  }
}