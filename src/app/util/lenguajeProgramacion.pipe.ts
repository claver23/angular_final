import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lenguajeProgramacion' })
export class LenguajeProgramacionPipe implements PipeTransform {
    transform(code: string): string {
        if (code == 'J') {
            return 'Java';
        } else if (code == 'C') {
            return 'C#';
        }
    }
}