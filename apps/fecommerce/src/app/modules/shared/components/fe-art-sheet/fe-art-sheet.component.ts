import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { OrderArticle, Article } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'fe-art-sheet',
  templateUrl: './fe-art-sheet.component.html',
  styleUrls: ['./fe-art-sheet.component.scss']
})
export class FeArtSheetComponent implements OnInit {
  @Input() article: Article;

  constructor(private _bottomSheetRef: MatBottomSheetRef<FeArtSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  deleteArticle(): void {
    this._bottomSheetRef.dismiss('delete');
  }

  ngOnInit(): void {
    this.article = this.data.article;
  }

}
