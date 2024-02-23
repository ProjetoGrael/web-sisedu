import { Pipe, PipeTransform } from '@angular/core';
import { ConstantsUtils } from '../utils/constants.utils';
import moment from "moment";

@Pipe({
    name: 'dateFormatDateToString'
})
export class DateFormatYYYYMMDDDateToStringPipe implements PipeTransform {
    transform(value: any, args?: any): any | null{
        if(value)
          return moment(value).format('YYYY-MM-DD');

        return null
    }
}