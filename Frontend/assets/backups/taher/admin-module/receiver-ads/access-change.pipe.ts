import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accessChange'
})
export class AccessChangePipe implements PipeTransform {

  transform(value: unknown): unknown {
    if(value==1)
    var data='Limited Access';
    return data;
  }

}
