import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() ruta: string;
  @Input() titulo: string;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {}

  choose(lang) {
    this.translateService.use(lang);
  }

}
