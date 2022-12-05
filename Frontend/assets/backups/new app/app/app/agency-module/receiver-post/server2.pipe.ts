import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'server2'
})
export class Server2Pipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
      return environment.server + '/' + value;
    }


}
