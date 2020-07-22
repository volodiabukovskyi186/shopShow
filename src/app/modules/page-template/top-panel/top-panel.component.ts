import { Component, OnInit } from "@angular/core";
import { ClientMenuService } from "../../client-menu/client-menu.service";
import { AppLangService } from "../../core/app-lang.service";
import { CurrencyService, ICurrency } from '../../currency/currency.service';

@Component({
  selector: "app-top-panel",
  templateUrl: "./top-panel.component.html",
  styleUrls: ["./top-panel.component.scss"],
})
export class TopPanelComponent implements OnInit {
  constructor(
    public clientMenu: ClientMenuService,
    public currency: CurrencyService,
    public appLang: AppLangService
  ) {
    this.getCurrency();
  }

  ngOnInit(): void {}

  getCurrency() {
    this.currency.get().subscribe(this.getCurrencyHandler)
  }

  getCurrencyHandler = data => {
    this.currency.data = data.data;
    this.currency.setDefault();
  }

  onClickCurrency(e: Event, c: ICurrency) {
    e.preventDefault();
    this.currency.current = c;
  }

}
