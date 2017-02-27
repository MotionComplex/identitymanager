import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-changes-modal',
  templateUrl: './save-changes-modal.component.html',
  styleUrls: ['./save-changes-modal.component.css']
})
export class SaveChangesModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}
