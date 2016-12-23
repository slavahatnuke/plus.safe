import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SafeDocument} from "../../services/document/SafeDocument";
import {DocumentService} from "../../services/document/document.service";

@Component({
  selector: 'safe-documents',
  template: `

  <div>
    <a routerLink="/safe/documents/new">new</a>
    <a routerLink="/safe/documents/open">open</a>
  </div>
  
  <router-outlet></router-outlet>
  
  <h4>Documents</h4>
  <ul>
    <li></li>
  </ul>
`,
})
export class SafeDocumentsComponent implements OnInit{
  private documents:SafeDocument[] = [];
  
  constructor(private router:Router, private documentService:DocumentService) {
  }

  ngOnInit():void {
    this.documentService.load()
      .then(() => this.documentService.getDocuments())
      .then((documents:SafeDocument[]) => this.documents = documents);
  }
}
