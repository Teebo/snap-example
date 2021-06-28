import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { gsap, Cubic } from 'gsap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @ViewChild('navBar', { static: true }) navBar;
  @ViewChild('mainMenu', { static: true }) mainMenu;
  @ViewChild('logo', { static: true }) logo;
  layoutDirection = 'horizontal';
  hAlignment = "center";
  vAlignment = "center";
  currentLayout = "layout-align-center-center";
  menuBox;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout(event);
  }

  constructor() { }

  ngOnInit(): void {


    this.mainMenu = this.mainMenu.nativeElement as HTMLElement;
    this.navBar = this.navBar.nativeElement as HTMLElement;
    this.logo = this.logo.nativeElement as HTMLElement;

    console.log(this.navBar);


    gsap.set(this.mainMenu, { x: "+=0" });
    gsap.set(this.logo, { x: "+=0" });

    this.menuBox = {
      node: this.mainMenu,
      x: this.mainMenu.offsetLeft,
      y: this.mainMenu.offsetTop,
      transform: {
        x: gsap.getProperty(this.mainMenu, 'x'),
        y: gsap.getProperty(this.mainMenu, 'y')
      }
    };

    this.logo = {
      node: this.logo,
      x: this.logo.offsetLeft,
      y: this.logo.offsetTop,
      transform: {
        x: gsap.getProperty(this.logo, 'x'),
        y: gsap.getProperty(this.logo, 'y')
      }
    };

    console.log(this.mainMenu);
  }

  ngAfterViewInit(): void {
    console.log(this.navBar);
  }



  setAlignment(): void {

    this.hAlignment = 'end';

    // this.container.removeClass(this.currentLayout);
    // this.currentLayout = "layout-align-" + this.hAlignment + "-" + this.vAlignment;
    // this.container.addClass(this.currentLayout);
  }

  public triggerNavShiftToEnd(): void {
    this.layout({ type: 'shift' });
  }


  public layout(event): void {

    this.navBar.classList.remove(this.currentLayout)
    this.currentLayout = "layout-align-" + 'space' + "-" + 'between';
    this.navBar.classList.add(this.currentLayout);

    let lastX = this.menuBox.x;
    let lastY = this.menuBox.y;

    let lastLogoX = this.logo.x;
    let lastLogoY = this.logo.y;
    // const duration = event && event.type === "resize" ? 0 : 0.5;

    // const { right, width } = this.menuBox.node.getBoundingClientRect();
    // console.log();
    // gsap.to(this.menuBox.node, { x: right - width, ease: Cubic.easeInOut, duration });

    // Last offset position


    // Record new offset position
    this.menuBox.x = this.menuBox.node.offsetLeft;
    this.menuBox.y = this.menuBox.node.offsetTop;

    this.logo.x = this.logo.node.offsetLeft;
    this.logo.y = this.logo.node.offsetTop;

    // Exit if box hasn't moved
    if (lastX === this.menuBox.x && lastY === this.menuBox.y) return;
    if (lastLogoX === this.logo.x && lastLogoY === this.logo.y) return;

    // Reversed delta values taking into account current
    // transforms in case animation was interrupted
    var x = this.menuBox.transform.x + lastX - this.menuBox.x;
    var y = this.menuBox.transform.y + lastY - this.menuBox.y;

    var logox = this.logo.transform.x + lastLogoX + this.logo.x;
    var logoy = this.logo.transform.y + lastLogoY - this.logo.y;

    var duration = event && event.type === "resize" ? 0 : 0.5;

    // Tween to 0,0 to remove the transforms
    gsap.fromTo(this.menuBox.node, duration, { x: x, y: y }, { x: -100, y: 0, ease: Cubic.easeInOut });
    gsap.fromTo(this.logo.node, duration, { x: logox, y: logoy }, { x: +100, y: 0, opacity: 1, ease: Cubic.easeInOut });
  }

}
