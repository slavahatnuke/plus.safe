import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SafeDocument} from "../../../services/document/SafeDocument";
import {DocumentService} from "../../../services/document/document.service";

@Component({
  selector: 'safe-new-documents',
  template: `

  <h4>New Document</h4>
  <form>
    <input type="text" placeholder="name" [(ngModel)]="document.name">
    <button>save</button>
  </form>
`,
})
export class SafeNewDocumentComponent implements OnInit {
  private document:SafeDocument
    ;

  constructor(private router:Router, private documentService:DocumentService) {
  }


  ngOnInit():void {
  }
}
