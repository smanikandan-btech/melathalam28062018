import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class GlobalService{
  public apiHost: string;
  public settings: any = {};

  constructor() {
    this.apiHost = environment.apiHost;
  }

  loadGlobalSettingsFromSessionStorage(): void{
    if(sessionStorage.getItem(environment.settings) != null){
      this.settings = JSON.parse(sessionStorage.getItem(environment.settings));
    }
  }
}