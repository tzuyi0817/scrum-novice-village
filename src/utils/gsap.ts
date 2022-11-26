import gsap from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import CSSRulePlugin from 'gsap/CSSRulePlugin';

gsap.registerPlugin(CSSPlugin, CSSRulePlugin);

function fadeIn(target: string, delay = 0.5) {
  return new Promise(resolve => {
    gsap.to(target, { autoAlpha: 1 });
    gsap.delayedCall(delay, resolve);
  });
}

function fadeOut(target: string, delay = 0.5) {
  return new Promise(resolve => {
    gsap.to(target, { autoAlpha: 0 });
    gsap.delayedCall(delay, resolve);
  });
}

function showDialog(target: string, content: string) {
  return new Promise(async (resolve) => {
    gsap.set(content, { autoAlpha: 0 });
    gsap.set(`${content} > .continue`, { autoAlpha: 0 });
    await fadeIn(target);
    const timeline = gsap.timeline();

    gsap.set(content, { autoAlpha: 1 });
    timeline.from(content, 1, { height: 0 });
    gsap.to(`${content} > .continue`, { autoAlpha: 1 });
    gsap.delayedCall(0.5, resolve);
  });
}

function dialog(content: string, height = 108) {
  return new Promise(async (resolve) => {
    gsap.set(content, { autoAlpha: 0 });
    const timeline = gsap.timeline();

    gsap.set(content, { autoAlpha: 1 });
    timeline.fromTo(content, 1, { height: 0 }, { height }).call(resolve);
  });
}

function showRole(target: string, status = 'up') {
  return new Promise(async (resolve) => {
    const hole = `${target} > .hole`;
    const light = `${target} > .light`;
    const role = `${target} > .role`;
    const timeline = gsap.timeline();
    const offsetY = status === 'up' ? -70 : 70;

    gsap.set(hole, { autoAlpha: 0, scale: 0 });
    gsap.set(role, { autoAlpha: 0, scaleY: 0 });
    gsap.set(light, { autoAlpha: 0, yPercent: offsetY, scaleY: 0 });
    gsap.set(target, { autoAlpha: 1 });
    timeline
      .to(hole, { autoAlpha: 1, scale: 1, duration: 0.3 })
      .to(light, { autoAlpha: 1, yPercent: 0, scaleY: 1.5, duration: 0.3 })
      .to(role, { autoAlpha: 1, scaleY: 1, ease: 'elastic', duration: 1.5 }, '<')
      .call(resolve);
  });
}

function hideRole(target: string, status = 'up') {
  return new Promise(async (resolve) => {
    const hole = `${target} > .hole`;
    const light = `${target} > .light`;
    const role = `${target} > .role`;
    const timeline = gsap.timeline();
    const offsetY = status === 'up' ? -70 : 70;
  
    timeline
      .to(light, { autoAlpha: 0, yPercent: offsetY, scaleY: 0, duration: 0.3 })
      .to(role, { autoAlpha: 0, scaleY: 0, duration: 0.3 }, '<')
      .to(hole, { autoAlpha: 0, scale: 0, duration: 0.3 })
      .call(resolve);
  });
}

function slideIn(target: string) {
  return new Promise(async (resolve) => {
    gsap.fromTo(target, { autoAlpha: 0, xPercent: -10 }, { autoAlpha: 1, xPercent: 0 });
    gsap.delayedCall(0.5, resolve);
  });
}

function slideOut(target: string) {
  return new Promise(async (resolve) => {
    gsap.fromTo(target, { autoAlpha: 1, xPercent: 0 }, { autoAlpha: 0, xPercent: 100 });
    gsap.delayedCall(0.5, resolve);
  });
}

function scaleIn(target: string) {
  return new Promise(async (resolve) => {
    gsap.fromTo(target, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1 });
    gsap.delayedCall(0.5, resolve);
  });
}

function floatMove(target: string, delay = 0) {
  gsap.to(target,  { ease: 'slowmo', yoyo: true, yPercent: 15, repeat: -1, duration: 1, delay });
}

function flash(target: string, delay = 0) {
  const timeLine = gsap.timeline({ ease: 'rough', repeat: -1, delay, yoyo: true });

  timeLine
    .to(target, { opacity: 0.8, yPercent: 10 })
    .to(target, { opacity: 0.5, xPercent: -10 })
    .to(target, { opacity: 1, yPercent: 20 });
}

export {
  gsap,
  CSSRulePlugin,
  fadeIn,
  fadeOut,
  showDialog,
  showRole,
  hideRole,
  dialog,
  slideIn,
  slideOut,
  scaleIn,
  floatMove,
  flash,
};
