import { Directive, ContentChildren, Renderer, ElementRef } from '@angular/core';
import { Card, DomController } from "ionic-angular";

/*
  Generated class for the FocusCards directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[focuscards]', // Attribute selector
  host: {
    '(press)': 'onPress()'
  }
})
export class FocusCards {

  @ContentChildren(Card, { read: ElementRef }) cards;
  tappedCard: any;
  focusedCard: boolean = false;

  constructor(public renderer: Renderer, public domCtrl: DomController) {
    console.log('Hello FocusCards Directive');
  }

  ngAfterViewInit() {
    this.cards.forEach(card => {
      this.renderer.listen(card.nativeElement, 'touchstart', (ev) => {
        if (this.focusedCard) {
          this.resetStyle();
        }
        this.tappedCard = card;
      })
    });
  }

  onPress() {
    this.focusedCard = true;

    this.domCtrl.write(() => {
      this.cards.forEach(card => {
        if (card !== this.tappedCard) {
          this.domCtrl.write(() => {
            this.renderer.setElementStyle(card.nativeElement, 'opacity', '0.4')
          })
        }
      });
    })
  }

  resetStyle() {
    this.focusedCard = false

    this.cards.forEach(card => {
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(card.nativeElement, 'opacity', '1')
      })
    });
  }

}
