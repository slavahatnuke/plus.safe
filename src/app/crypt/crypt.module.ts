import { NgModule } from '@angular/core';
import { CryptService } from './crypt.service';
import {OpenPgpModule} from "../open-pgp/open-pgp.module";

@NgModule({
  declarations: [],
  imports: [OpenPgpModule],
  providers: [CryptService],
  exports: []
})
export class CryptModule { }
