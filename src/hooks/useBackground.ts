import { gsap, CSSRulePlugin } from '@/utils/gsap';

export default function useBackground() {
  let currentPosition = '';

  function moveBackground(event: MouseEvent) {
    const mousePosition = event.x / window.innerWidth * 100;
    const bg1 = CSSRulePlugin.getRule('.background:before');
    const bg2 = CSSRulePlugin.getRule('.background:after');
  
    switch (true) {
      case mousePosition <= 33.3 && currentPosition !== 'left':
        currentPosition = 'left';
        gsap.to(bg1, { cssRule: { xPercent: 3 } });
        gsap.to(bg2, { cssRule: { xPercent: -3 } });
        break;
      case mousePosition > 33.3 && mousePosition < 66.6 && currentPosition !== 'middle':
        currentPosition = 'middle';
        gsap.to(bg1, { cssRule: { xPercent: 0 } });
        gsap.to(bg2, { cssRule: { xPercent: 0 } });
        break;
      case mousePosition > 66.6 && currentPosition !== 'right':
        currentPosition = 'right';
        gsap.to(bg1, { cssRule: { xPercent: -3 } });
        gsap.to(bg2, { cssRule: { xPercent: 3 } });
        break;
      default:
        break;
    }
  }

  return { 
    moveBackground,
  };
}
