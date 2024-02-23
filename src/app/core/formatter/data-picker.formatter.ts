import {NativeDateAdapter} from "@angular/material/core";
import moment from "moment";
import {ConstantsUtils} from "../utils/constants.utils";
import {DateFormatDateToStringPipe} from "../pipe/data-format-date-to-string.pipe";

export class DataPickerFormatter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        const dateFormatPipe = new DateFormatDateToStringPipe()
        return dateFormatPipe.transform(date)
    }

    parse(value: any): Date | null {
        const date = moment(value, ConstantsUtils.DATE_FMT).locale(ConstantsUtils.LOCALE);
        return date.isValid() ? date.toDate() : null;
    }
}


