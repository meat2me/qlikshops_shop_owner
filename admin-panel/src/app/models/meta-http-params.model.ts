import { HttpParams } from '@angular/common/http';

export class MetaHttpParams extends HttpParams {
    constructor(
        options?: any,
        public supressError: boolean = false,
        public preventLoading: boolean = false,
        public keepLoading: boolean = false,
        public preventDefault: boolean = false,
    ) {
        super(options);
    }
}
