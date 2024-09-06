import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const parts = value.split(':');
    if (parts.length < 2) return value;

    const [header, ...rest] = parts;
    const details = rest.join(':').trim();

    const url = header.match(/https?:\/\/\S+/)?.[0] || '';
    const errorCode = details.split(' ')[0];
    const errorMessage = details.split(' ').slice(1).join(' ');

    return `Error ${errorCode} while accessing ${url}: ${errorMessage}`;
  }
}
