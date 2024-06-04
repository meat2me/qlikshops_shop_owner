import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title;
  @Input() content;
  @Input() type: boolean;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close(true);
  }
}
