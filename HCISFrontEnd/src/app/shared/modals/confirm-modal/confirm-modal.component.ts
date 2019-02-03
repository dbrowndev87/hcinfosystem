import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css', '../modal-shared.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() public modalHeaderText: string;
  @Input() public modalBodyText: string;
  @Input() public okButtonText: string;
  @Input() public cancelButtonText: string;
  @Output() public confirmOk = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  okButtonClick() {
    this.confirmOk.emit();
  }


}
