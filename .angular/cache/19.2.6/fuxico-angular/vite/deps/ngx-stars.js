import {
  CommonModule,
  NgClass,
  NgForOf,
  NgStyle
} from "./chunk-GAMBKT2F.js";
import "./chunk-XZ75XUJI.js";
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate
} from "./chunk-YCA54VN2.js";
import "./chunk-S35MAB2V.js";

// node_modules/ngx-stars/fesm2020/ngx-stars.mjs
function NgxStarsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3);
    ɵɵlistener("click", function NgxStarsComponent_div_2_Template_div_click_0_listener($event) {
      const star_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.readonly ? ctx_r2.noop() : ctx_r2.onStarClick($event, star_r2));
    })("mousemove", function NgxStarsComponent_div_2_Template_div_mousemove_0_listener($event) {
      const star_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.readonly ? ctx_r2.noop() : ctx_r2.onStarHover($event, star_r2));
    });
    ɵɵelement(1, "span", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const star_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ctx_r2.starPadding());
    ɵɵadvance();
    ɵɵclassProp("star-rtl", ctx_r2.rtl);
    ɵɵproperty("ngClass", star_r2.classname)("ngStyle", ctx_r2.starColorAndSize());
  }
}
var NgxStarsComponent = class {
  constructor() {
    this.maxStars = 5;
    this.initialStars = 0;
    this.animationSpeed = 100;
    this.wholeStars = false;
    this.rtl = false;
    this.ratingOutput = new EventEmitter();
    this.customClassIdentifier = Math.random().toString(36).substring(2);
    this.safeSize = () => Number.isInteger(this.size) && this.size > 0 && this.size < 6 ? this.size : 1;
  }
  ngOnInit() {
    this.setupStarImages();
    this.editableStars = Array.from(new Array(this.maxStars)).map((elem, index) => new EditableStar(index));
    if (this.rtl) {
      this.editableStars = this.editableStars.reverse();
    }
    this.setRating(this.initialStars);
    if (this.animation) {
      this.animationInterval = setInterval(this.starAnimation.bind(this), this.animationSpeed);
    }
  }
  ngOnDestroy() {
    if (this.customCssClasses) {
      this.customCssClasses.forEach((style) => {
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    }
  }
  setupStarImages() {
    if (this.customStarIcons) {
      this.customCssClasses = [];
      Object.keys(this.customStarIcons).map((key) => key).forEach((starType) => {
        const classname = this.getStarClass(starType);
        this.createCssClass(classname, starType);
      });
    }
  }
  createCssClass(classname, starType) {
    const clazz = document.createElement("style");
    clazz.type = "text/css";
    clazz.innerHTML = `.${classname} {
      -webkit-mask-image: url(${this.customStarIcons[starType]});
      mask-image: url(${this.customStarIcons[starType]});
    }`;
    document.getElementsByTagName("head")[0].appendChild(clazz);
    this.customCssClasses.push(clazz);
  }
  starPadding() {
    return {
      "margin-right": this.customPadding || `calc(${this.starSize().width} / 10)`
    };
  }
  starColorAndSize() {
    return Object.assign({}, this.starColor(), this.starSize());
  }
  starColor() {
    return {
      "background-color": this.color || "crimson"
    };
  }
  starSize() {
    return {
      height: this.customSize || `${15 * this.safeSize()}px`,
      width: this.customSize || `${16 * this.safeSize()}px`
    };
  }
  zeroStarLeft() {
    if (this.rtl) {
      const width = this.starSize()["width"];
      return `calc(${width} * ${this.maxStars})`;
    }
    return "-16px";
  }
  starAnimation() {
    this.animationRunning = true;
    if (this.rating < this.maxStars) {
      this.setRating(this.rating += 0.5);
    } else {
      this.setRating(0);
    }
  }
  cancelStarAnimation() {
    if (this.animationRunning) {
      clearInterval(this.animationInterval);
      this.rating = 0;
      this.animationRunning = false;
    }
  }
  setRating(rating) {
    this.rating = Math.round(rating * 2) / 2;
    this.onStarsUnhover();
  }
  onStarHover(event, clickedStar) {
    this.cancelStarAnimation();
    const clickedInFirstHalf = this.clickedInFirstHalf(event);
    clickedStar.classname = !this.wholeStars && clickedInFirstHalf ? this.getStarClass("half") : this.getStarClass("full");
    this.editableStars.forEach((star) => {
      if (star.position > clickedStar.position) {
        star.classname = this.getStarClass("empty");
      } else if (star.position < clickedStar.position) {
        star.classname = this.getStarClass("full");
      }
    });
  }
  onStarClick(event, clickedStar) {
    this.cancelStarAnimation();
    const clickedInFirstHalf = this.clickedInFirstHalf(event);
    this.rating = clickedStar.position + (!this.wholeStars && clickedInFirstHalf ? 0.5 : 1);
    this.ratingOutput.emit(this.rating);
  }
  // hidden star to left of first star lets user click there to set to 0
  onZeroStarClick() {
    this.setRating(0);
    this.ratingOutput.emit(this.rating);
  }
  onZeroStarHover() {
    this.editableStars.forEach((star) => star.classname = this.getStarClass("empty"));
  }
  onStarsUnhover() {
    this.editableStars.forEach((star) => {
      const starNumber = star.position + 1;
      if (this.rating >= starNumber) {
        star.classname = this.getStarClass("full");
      } else if (this.rating > starNumber - 1 && this.rating < starNumber) {
        star.classname = this.getStarClass("half");
      } else {
        star.classname = this.getStarClass("empty");
      }
    });
  }
  clickedInFirstHalf(event) {
    const starIcon = event.target;
    if (this.rtl) {
      return event.pageX > starIcon.getBoundingClientRect().right - starIcon.offsetWidth / 2;
    } else {
      return event.pageX < starIcon.getBoundingClientRect().left + starIcon.offsetWidth / 2;
    }
  }
  noop() {
  }
  getStarClass(starType) {
    if (this.customCssClasses) {
      return `ngx-stars-star-${starType}-${this.customClassIdentifier}`;
    }
    return `star-${starType}`;
  }
  // this and the aria-labels and role in the html inspired by https://stackoverflow.com/q/55966205
  getAriaLabel() {
    return `Rating: ${this.rating} out of ${this.maxStars} stars ${this.readonly ? "" : ". Can be edited."}`;
  }
};
NgxStarsComponent.ɵfac = function NgxStarsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxStarsComponent)();
};
NgxStarsComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxStarsComponent,
  selectors: [["ngx-stars"]],
  inputs: {
    maxStars: "maxStars",
    initialStars: "initialStars",
    readonly: "readonly",
    size: "size",
    customSize: "customSize",
    color: "color",
    animation: "animation",
    animationSpeed: "animationSpeed",
    customPadding: "customPadding",
    wholeStars: "wholeStars",
    customStarIcons: "customStarIcons",
    rtl: "rtl"
  },
  outputs: {
    ratingOutput: "ratingOutput"
  },
  standalone: false,
  decls: 3,
  vars: 5,
  consts: [["role", "img", 1, "stars-line", 3, "mouseleave"], ["aria-hidden", "true", 1, "star", "zero-star", 3, "click", "mousemove", "ngStyle"], ["aria-hidden", "true", 3, "ngStyle", "click", "mousemove", 4, "ngFor", "ngForOf"], ["aria-hidden", "true", 3, "click", "mousemove", "ngStyle"], ["aria-hidden", "true", 1, "star", 3, "ngClass", "ngStyle"]],
  template: function NgxStarsComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵlistener("mouseleave", function NgxStarsComponent_Template_div_mouseleave_0_listener() {
        return ctx.readonly ? ctx.noop() : ctx.onStarsUnhover();
      });
      ɵɵelementStart(1, "span", 1);
      ɵɵlistener("click", function NgxStarsComponent_Template_span_click_1_listener() {
        return ctx.readonly ? ctx.noop() : ctx.onZeroStarClick();
      })("mousemove", function NgxStarsComponent_Template_span_mousemove_1_listener() {
        return ctx.readonly ? ctx.noop() : ctx.onZeroStarHover();
      });
      ɵɵelementEnd();
      ɵɵtemplate(2, NgxStarsComponent_div_2_Template, 2, 5, "div", 2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵattribute("aria-label", ctx.getAriaLabel());
      ɵɵadvance();
      ɵɵstyleProp("left", ctx.zeroStarLeft());
      ɵɵproperty("ngStyle", ctx.starSize());
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.editableStars);
    }
  },
  dependencies: [NgClass, NgForOf, NgStyle],
  styles: [`.stars-line[_ngcontent-%COMP%]{display:flex;align-items:center;position:relative}.stars-line[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{z-index:999}.zero-star[_ngcontent-%COMP%]{color:transparent;position:absolute}.star[_ngcontent-%COMP%]{display:inline-block;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.star-rtl[_ngcontent-%COMP%]{transform:scaleX(-1)}.star-empty[_ngcontent-%COMP%]{-webkit-mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z'%3E%3C/path%3E%3C/svg%3E%0A");mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z'%3E%3C/path%3E%3C/svg%3E%0A")}.star-half[_ngcontent-%COMP%]{-webkit-mask-image:url("data:image/svg+xml,%3C!-- had to hack this one's viewbox otherwise it didn't line up with the other two --%3E%3C!-- changed viewbox from '0 0 536 512' to '-20 0 576 512' --%3E%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star-half-alt' class='svg-inline--fa fa-star-half-alt fa-w-17' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='-20 0 576 512'%3E%3Cpath fill='currentColor' d='M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z'%3E%3C/path%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3C!-- had to hack this one's viewbox otherwise it didn't line up with the other two --%3E%3C!-- changed viewbox from '0 0 536 512' to '-20 0 576 512' --%3E%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star-half-alt' class='svg-inline--fa fa-star-half-alt fa-w-17' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='-20 0 576 512'%3E%3Cpath fill='currentColor' d='M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z'%3E%3C/path%3E%3C/svg%3E")}.star-full[_ngcontent-%COMP%]{-webkit-mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'%3E%3C/path%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'%3E%3C/path%3E%3C/svg%3E")}`]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxStarsComponent, [{
    type: Component,
    args: [{
      selector: "ngx-stars",
      template: '<div class="stars-line" (mouseleave)="readonly ? noop() : onStarsUnhover()" role="img" [attr.aria-label]="getAriaLabel()">\n  <span class="star zero-star" [ngStyle]="starSize()" [style.left]="zeroStarLeft()" aria-hidden="true" (click)="readonly ? noop() : onZeroStarClick()" (mousemove)="readonly ? noop() : onZeroStarHover()"></span>\n  <div *ngFor="let star of editableStars;" [ngStyle]="starPadding()" aria-hidden="true" (click)="readonly ? noop() : onStarClick($event, star)" (mousemove)="readonly ? noop() : onStarHover($event, star)">\n    <span class="star" [class.star-rtl]="rtl" [ngClass]="star.classname" [ngStyle]="starColorAndSize()" aria-hidden="true"></span>\n  </div>\n</div>\n',
      styles: [`.stars-line{display:flex;align-items:center;position:relative}.stars-line>div{z-index:999}.zero-star{color:transparent;position:absolute}.star{display:inline-block;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.star-rtl{transform:scaleX(-1)}.star-empty{-webkit-mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z'%3E%3C/path%3E%3C/svg%3E%0A");mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z'%3E%3C/path%3E%3C/svg%3E%0A")}.star-half{-webkit-mask-image:url("data:image/svg+xml,%3C!-- had to hack this one's viewbox otherwise it didn't line up with the other two --%3E%3C!-- changed viewbox from '0 0 536 512' to '-20 0 576 512' --%3E%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star-half-alt' class='svg-inline--fa fa-star-half-alt fa-w-17' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='-20 0 576 512'%3E%3Cpath fill='currentColor' d='M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z'%3E%3C/path%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3C!-- had to hack this one's viewbox otherwise it didn't line up with the other two --%3E%3C!-- changed viewbox from '0 0 536 512' to '-20 0 576 512' --%3E%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star-half-alt' class='svg-inline--fa fa-star-half-alt fa-w-17' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='-20 0 576 512'%3E%3Cpath fill='currentColor' d='M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z'%3E%3C/path%3E%3C/svg%3E")}.star-full{-webkit-mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'%3E%3C/path%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='star' class='svg-inline--fa fa-star fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='currentColor' d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'%3E%3C/path%3E%3C/svg%3E")}
`]
    }]
  }], null, {
    maxStars: [{
      type: Input
    }],
    initialStars: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    customSize: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    animation: [{
      type: Input
    }],
    animationSpeed: [{
      type: Input
    }],
    customPadding: [{
      type: Input
    }],
    wholeStars: [{
      type: Input
    }],
    customStarIcons: [{
      type: Input
    }],
    rtl: [{
      type: Input
    }],
    ratingOutput: [{
      type: Output
    }]
  });
})();
var EditableStar = class {
  constructor(position) {
    this.position = position;
  }
};
var NgxStarsModule = class {
};
NgxStarsModule.ɵfac = function NgxStarsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxStarsModule)();
};
NgxStarsModule.ɵmod = ɵɵdefineNgModule({
  type: NgxStarsModule,
  declarations: [NgxStarsComponent],
  imports: [CommonModule],
  exports: [NgxStarsComponent]
});
NgxStarsModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxStarsModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [NgxStarsComponent],
      exports: [NgxStarsComponent]
    }]
  }], null, null);
})();
export {
  EditableStar,
  NgxStarsComponent,
  NgxStarsModule
};
//# sourceMappingURL=ngx-stars.js.map
