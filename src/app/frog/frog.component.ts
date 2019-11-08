import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-frog',
  templateUrl: './frog.component.html',
  styleUrls: ['./frog.component.sass']
})
export class FrogComponent implements OnInit {

  @Input() boxes: number;
  @Input() selected: number;
  @Input() config: boolean;

  readonly DEFAULT_BOXES = 5;
  readonly DEFAULT_SELECTED = 1;
  readonly DEFAULT_CONFIG = false;
  readonly CSS_STYLE_FROG = 'frog';

  private boxesComponent: number;
  private selectedComponent: number;
  private configComponent: boolean;

  private boxesElements;

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
    }
  }

}
