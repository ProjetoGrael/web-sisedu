import { Pipe, PipeTransform } from '@angular/core';
import { ConstantsUtils } from '../utils/constants.utils';
import moment from "moment";

@Pipe({
    name: 'dateFormatDateToString'
})
export class DateFormatDateToStringPipe implements PipeTransform {
    transform(value: any, args?: any): any | null{
        if(value)
          return moment(value).locale(ConstantsUtils.LOCALE).format(ConstantsUtils.DATE_FMT);

        return null
    }
}