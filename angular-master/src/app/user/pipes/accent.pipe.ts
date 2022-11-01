import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'accent'
})
export class AccentPipe implements PipeTransform {

  transform(value: string): string {
    let chars:string[] = value.split('');

    chars = chars.map(char => {
      const splited = char.normalize('NFD').split('');
      return splited[0]
    })
    return chars.join('');
  }

}
