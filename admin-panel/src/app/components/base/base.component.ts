import { Subject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';

export class BaseComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
