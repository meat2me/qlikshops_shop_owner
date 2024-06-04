import * as moment from "moment";


export function modifyTime(timeStr) {
    const utcDate = moment(timeStr).utc(true);
    const localDate = moment(utcDate).local();
    return moment(localDate).format('DD/MM/YYYY HH:mm');
}