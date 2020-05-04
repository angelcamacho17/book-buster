import { Component, OnInit, Input, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fe-row',
  templateUrl: './fe-row.component.html',
  styleUrls: ['./fe-row.component.css']
})
export class FeRowComponent implements OnInit, AfterViewInit {

  @Input() item: any;
  @Input() itemType: any;
  @ViewChild("dynamic", { read: ViewContainerRef }) dynHost;
  public componentRef: ComponentRef<any>;

  constructor(public router: Router,
              public componentFactoryResolver: ComponentFactoryResolver,
              public store: Store) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.loadComponent();
  }

  private loadComponent(): void {
    // this.dynHost.clear();
    // const factory: ComponentFactory<any> =
    // this.componentFactoryResolver.resolveComponentFactory(FeCustomerRowComponent);

    // this.componentRef = this.dynHost.createComponent(factory);

    // this.componentRef.instance.type = type;

    // this.componentRef.instance.output.subscribe(event => console.log(event));
  }

}
