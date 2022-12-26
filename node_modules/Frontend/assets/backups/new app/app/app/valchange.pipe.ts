import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valchange'
})
export class ValchangePipe implements PipeTransform {

  transform(value: boolean): unknown {
    let d= value? 'Active':'Deactive';
    return d;
  }

}
