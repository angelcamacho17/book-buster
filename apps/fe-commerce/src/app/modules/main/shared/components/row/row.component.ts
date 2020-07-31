import { Component, OnInit, Input, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() item: any;
  @Input() itemType: any;
  @ViewChild("dynamic", { static: true, read: ViewContainerRef }) dynHost;
  public componentRef: ComponentRef<any>;

  constructor(public router: Router,
              public componentFactoryResolver: ComponentFactoryResolver,
              public store: Store) {
                console.log('row')
               }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {

    this.dynHost.clear();
    const factory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(this.itemType);

    this.componentRef = this.dynHost.createComponent(factory);
    (this.componentRef.instance).item = this.item;
    (this.componentRef.location.nativeElement.setAttribute("style","width: 100%"));
  }

}
