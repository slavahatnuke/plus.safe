import {NgModule}      from '@angular/core';

import {RouterModule}   from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

import {AppComponent}  from '../app.component';
import {SignUpComponent}  from '../signup/signup.component';
import {SignInComponent}  from '../signin/signin.component';
import {SafeComponent}  from '../safe/safe.component';
import {UploaderComponent}  from '../uploader/uploader.component';
import {SafeSimpleComponent} from "../safe/simple/safe-simple.component";
import {SafeIdentityComponent} from "../safe/identity/identity.component";
import {SafeCertificatesComponent} from "../safe/certificates/certificates.component";
import {SafeNewCertificateComponent} from "../safe/certificates/new/new-certificate.component";
import {SafeUploadCertificateComponent} from "../safe/certificates/upload/upload-certificate.component";
import {SafeManageCertificatesComponent} from "../safe/certificates/manage/mange-certificates.component";
import {SafeDocumentsComponent} from "../safe/documents/documents.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'signin',
        component: SignInComponent
      },
      {
        path: 'safe',
        component: SafeComponent,
        children: [
          {
            path: 'identity',
            component: SafeIdentityComponent
          },
          {
            path: 'certificates',
            component: SafeCertificatesComponent,
            children: [
              {
                path: 'new',
                component: SafeNewCertificateComponent
              },
              {
                path: 'upload',
                component: SafeUploadCertificateComponent
              },
              {
                path: 'manage',
                component: SafeManageCertificatesComponent
              }
            ]
          },
          {
            path: 'documents',
            component: SafeDocumentsComponent,
            children: []
          },
          {
            path: 'simple',
            component: SafeSimpleComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    SafeComponent,
    UploaderComponent,
    SafeSimpleComponent,
    SafeIdentityComponent,
    SafeCertificatesComponent,
    SafeNewCertificateComponent,
    SafeUploadCertificateComponent,
    SafeManageCertificatesComponent,
    SafeDocumentsComponent
  ]
})
export class RoutingModule {
}
