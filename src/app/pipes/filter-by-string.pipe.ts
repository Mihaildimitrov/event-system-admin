import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByString'
})
export class FilterByStringPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let searchString = args[0];

    if(searchString.length) {
     return value.filter(item => (item.default_tra.indexOf(searchString) !== -1 || item.key.indexOf(searchString) !== -1 || item.value.indexOf(searchString) !== -1));
    } else {
      return value;
    }
  }

}
