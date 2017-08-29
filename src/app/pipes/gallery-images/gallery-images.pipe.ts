import { Pipe, PipeTransform } from '@angular/core';
import { NgxGalleryImage } from 'ngx-gallery/lib/ngx-gallery-image.model';

@Pipe({name: 'addGalleryImages'})
export class GalleryImagesPipe implements PipeTransform {
  transform(images: any[] = []): NgxGalleryImage[] {
    return images.map(image => {
      return {
        small: image.src,
        medium: image.src,
        big: image.src,
      };
    });
  }
}
