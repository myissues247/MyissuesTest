import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Pipe({
  name: 'sanitization'
})
export class SanitizationPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}
  transform(value): unknown {
    return null;
  }

}
