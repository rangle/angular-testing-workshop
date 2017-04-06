import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smiley'
})
export class SmileyPipe implements PipeTransform {
  public transform(mood) {
    switch (mood) {
      case "happy":
        return '🙂';
      case "sad":
        return '😔';
      default:
        return '🤷‍';
    }
  }
}