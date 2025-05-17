import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImageUrl'
})
export class FormatImageUrlPipe implements PipeTransform {

  transform(imageUrls: Array<string|undefined> | undefined): string {
    let result:any = "";
    if(imageUrls?.length){
      result = imageUrls[0];
    }
    return result;
  }

}
