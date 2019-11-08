import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-frog',
  templateUrl: './frog.component.html',
  styleUrls: ['./frog.component.sass']
})
export class FrogComponent implements OnInit {

  @Input() boxes: number;
  @Input() selected: number;
  @Input() config: boolean;

  @ViewChild('pfrog', {static: false}) pfrog: ElementRef;
  @ViewChild('nboxes', {static: false}) nboxes: ElementRef;

  readonly DEFAULT_BOXES = 5;
  readonly DEFAULT_SELECTED = 1;
  readonly DEFAULT_CONFIG = false;
  readonly CSS_STYLE_FROG = 'frog';

  boxesComponent: number;
  selectedComponent: number;
  configComponent: boolean;

  boxesElements;

  constructor() {
    // console.log('constructor - boxes : ', this.boxes);
    // console.log('constructor - selected : ', this.selected);
    // console.log('constructor - config : ', this.config);
  }

  ngOnInit() {
    this.boxesComponent = this.boxes !== undefined ?
      this.boxes : this.DEFAULT_BOXES;

    this.selectedComponent = this.selected !== undefined ?
      Number.parseInt(`${this.selected}`) : this.DEFAULT_SELECTED;

    this.configComponent = this.config !== undefined ?
      this.config : this.DEFAULT_CONFIG;

    this.generateObjectBoxes();
  }

  generateObjectBoxes () {
    this.boxesElements = [];
    for (let i = 0; i < this.boxesComponent; i++) {
      const box = this.getNewBoxObject(i+1, this.selectedComponent);

      this.boxesElements.push(box);
    }
  }

  getNewBoxObject (index, itemSelected) {
    const attrSelected = index === itemSelected;

    return this.getBoxObject(index, attrSelected);
  }

  getBoxObject (index, attrSelected) {
    return {
      selected: attrSelected, 
      index
    };
  }

  getIndex (item) {
    return item.index;
  }

  getBoxClass (item) {
    return item.selected ? this.CSS_STYLE_FROG : '';
  }

  jumpFrogAdv (boxSelected) {
    if (boxSelected.selected) {
      const newBoxSelection = boxSelected.index < this.boxesElements.length ?
        this.boxesElements[ boxSelected.index ] : this.boxesElements[ 0 ];

      this.boxesElements[boxSelected.index-1].selected = false;
      this.boxesElements[newBoxSelection.index-1].selected = true;

      this.selectedComponent = newBoxSelection.index;
    }
  }

  changeInputBoxes () {
    const newNumberBoxes = this.nboxes.nativeElement.value;
    const oldNumberBoxes = this.boxesComponent;
    this.changeBoxes(newNumberBoxes, oldNumberBoxes);
  }

  changeBoxes (newNumberBoxes, oldNumberBoxes=this.DEFAULT_SELECTED) {
    this.changeBoxesByObjects(newNumberBoxes, oldNumberBoxes);
  }

  changeBoxesByObjects (newNumberBoxes, oldNumberBoxes) {
    if (newNumberBoxes > 0) {
      if (newNumberBoxes > oldNumberBoxes) {
        this.boxesComponent = newNumberBoxes;
        this.addBoxesByObjects();
      } else if (newNumberBoxes < oldNumberBoxes) {
        this.boxesComponent = newNumberBoxes;
        this.removeBoxesByObjects();
      }
    }
  }

  addBoxesByObjects () {
    const numberCreatedBoxes = this.boxesElements.length;
    const numberNewBoxes = this.boxesComponent - numberCreatedBoxes;

    for (let i = 0; i < numberNewBoxes; i++) {
      const newBox = this.getBoxObject(numberCreatedBoxes + 1, false);

      this.boxesElements.push(newBox);
    }
  }

  removeBoxesByObjects () {
    let positionFrog = this.getPositionFrogAdvanced();
    const numberCreatedBoxes = this.boxesElements.length;
    const numberBoxes = this.boxesComponent;

    if (positionFrog >= numberBoxes) {
      positionFrog = numberBoxes;
      this.selectedComponent = positionFrog;
      this.boxesElements[positionFrog-1].selected = true;
    }

    for (let i = numberCreatedBoxes-1; i >= numberBoxes; i--) {
      this.boxesElements.pop();
    }
  }

  changeInputSelection () {
    const newPosition = this.pfrog.nativeElement.value;
    const oldPosition = this.getPositionFrogAdvanced();
    this.changeSelected(newPosition, oldPosition);
  }

  getPositionFrogAdvanced () {
    return this.boxesElements.filter(box => box.selected)[0].index;
  }

  changeSelected (newPosition, oldPosition=this.DEFAULT_BOXES) {
    this.changeSelectedByObjects(newPosition, oldPosition);
  }

  changeSelectedByObjects (newPosition, oldPosition) {
    if (this.boxesElements && this.boxesElements.length && oldPosition > -1){
      const positionFrog = oldPosition;

      const newPositionSelection = newPosition <= this.boxesElements.length ?
        newPosition : 1;

      this.selectedComponent = newPositionSelection;

      this.boxesElements[positionFrog-1].selected = false;
      this.boxesElements[newPositionSelection-1].selected = true;
    }
  }

}
