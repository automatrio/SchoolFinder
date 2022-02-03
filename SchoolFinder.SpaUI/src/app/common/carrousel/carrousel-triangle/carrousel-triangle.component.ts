import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core"

@Component({
    selector: 'carrousel-triangle',
    template: `
    <svg viewBox="239.561 236.889 15.814 13.695" width="15.814" height="13.695">
    <path d="M 247.468 236.889 L 255.375 250.584 L 239.561 250.584 L 247.468 236.889 Z" data-bx-shape="triangle 239.561 236.889 15.814 13.695 0.5 0 1@470c49a1" style="fill: rgb(255, 255, 255);"></path>
    </svg>
    `,
})
export class CarrouselTriangleComponent {
    @HostListener('click', ['$event.target'])
    onClick(btn) {
      if (!this.disabled) {
        this.customClick.emit();
      }
    }
    @Input() disabled: boolean = false;
    @Output() customClick = new EventEmitter<void>();
}
