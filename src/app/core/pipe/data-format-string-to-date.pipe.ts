import { Pipe, PipeTransform } from '@angular/core';
import { ConstantsUtils } from '../utils/constants.utils';
import moment from "moment";

@Pipe({
    name: 'dateFormatStringToDate'
})
export class DateFormatStringToDatePipe implements PipeTransform {
    transform(value: any, args?: any): any | null{
        if(value)
            return moment(value, ConstantsUtils.DATE_FMT).toDate()

        return null
    }
}