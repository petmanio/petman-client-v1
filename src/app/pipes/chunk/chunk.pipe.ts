import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'chunk' })
export class ChunkPipe implements PipeTransform {
  transform(arr: any[] = [], size: number = 3) {
    let newArr = [];

    for (let i=0; i<arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }

    return newArr;
  }
}
