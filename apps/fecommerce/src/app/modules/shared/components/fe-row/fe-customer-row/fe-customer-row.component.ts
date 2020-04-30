import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FeRowComponent } from '../fe-row.component';


@Component({
  selector: 'fe-customer-row',
  templateUrl: './fe-customer-row.component.html',
  styleUrls: ['./fe-customer-row.component.scss']
})
export class FeCustomerRowComponent extends FeRowComponent{

  public smaller: Observable<boolean>;
  public initials = '';

  constructor(router: Router) {
    super(router);
    if (this.item) {
      this.smaller = this.reduceLetterSize();
    }
  }

  private reduceLetterSize(): Observable<boolean> {
    const fullName = this.item.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      if (name.length > 2) {
        return of(true);
      }
      else {
        return of(false);
      }
    }
  }

  public getInitials(): string {
    const fullName = this.item.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      let initials: string;
      if (name.length > 2) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}${this.getChar(name[2], 0)}`;
      } else if (name.length > 1) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}`;
      } else {
        initials = `${this.getChar(name[0], 0)}`;
      }
      return initials.toUpperCase();
    }
  }

  private getChar(text: string, index: number) {
    return text.charAt(index);
  }

  public selectedCustomer(): void {
    setTimeout(()=> {
      this.router.navigate(['/article']);
    },500);

  }

}
