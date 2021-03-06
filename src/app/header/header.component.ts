import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service:TranslocoService) { }

  ngOnInit(): void {
  }

  changeLang(lang:string){
    this.service.setActiveLang(lang);
  }
}
