import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IArticle } from '@fecommerce-workspace/data';

@Component({
  selector: 'art-sheet',
  templateUrl: './art-sheet.component.html',
  styleUrls: ['./art-sheet.component.scss']
})
export class ArtSheetComponent implements OnInit {
  @Input() article: IArticle;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ArtSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}


  /**
   * Dismiss sheet.
   * @param event
   */
  public close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  /**
   * Delete article.
   */
  public deleteArticle(): void {
    this._bottomSheetRef.dismiss('delete');
  }

  ngOnInit(): void {
    this.article = this.data.article;
  }

}
