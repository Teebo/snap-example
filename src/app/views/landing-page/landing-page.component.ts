import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const goToSection = (i, anim?: any) => {
      gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 1
      });

      if (anim) {
        anim.restart();
      }
    }

    gsap.utils.toArray('.panel').forEach(
      (panel: any, i) => {
        ScrollTrigger.create({
          trigger: panel,
          onEnter: () => goToSection(i)
        });

        ScrollTrigger.create({
          trigger: panel,
          start: 'bottom bottom',
          onEnterBack: () => goToSection(i)
        });
      }
    )

  }

}
