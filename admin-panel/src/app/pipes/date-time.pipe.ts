import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'm2mDateTime' })

export class DateTimePipe implements PipeTransform {
    transform(dateTime: string, format: string = "DD/MM/YYYY HH:mm"): string {
        const utcDate = moment(dateTime).utc(true);
        const localDate = moment(utcDate).local();
        return moment(localDate).format(format);
    }
}