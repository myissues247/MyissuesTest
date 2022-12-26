import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statuschange'
})
export class StatuschangePipe implements PipeTransform {

  transform(value: any): unknown {
    let d= value ?'Active':'Deactive';
    return d;
  }

}
