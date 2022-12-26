import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'server'
})
export class ServerPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    //return 'http://localhost:8000/' + value;
    return environment.server + '/' + value;
  }
  
}
