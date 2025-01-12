import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customFn'})
export class CustomFnPipe implements PipeTransform {
    public transform(value: any, fn?: (...params: any[]) => any, ...params: any[]): any {
        return fn?.(...(params.length ? params : [value]));
    }
}