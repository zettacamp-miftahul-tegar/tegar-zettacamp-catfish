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

  transform(value: User[], keyword: string): User[] {
    if (value.length == 0 || !keyword) return value;
    
    keyword = this.accentPipe.transform(keyword)
    keyword = this.combinePipe.transform(keyword)
    
    value = value.filter(user => {
      let name = this.accentPipe.transform(user.name)
      name = this.combinePipe.transform(name)
      return name.includes(keyword)
    })
    return value
  }
}