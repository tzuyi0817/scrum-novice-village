import gsap from 'gsap';

function fadeIn(target: string, delay = 0.5) {
  return new Promise(resolve => {
    gsap.to(target, { autoAlpha: 1 });
    gsap.delayedCall(0.5, resolve);
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
    await fadeIn(target);
    const timeline = gsap.timeline();

    gsap.set(content, { autoAlpha: 1 });
    timeline.from(content, 1, { height: 0 });
    gsap.delayedCall(0.5, resolve);
  });
}

function showRole(target: string) {
  return new Promise(async (resolve) => {
    const hole = `${target} > .hole`;
    const light = `${target} > .light`;
    const role = `${target} > .role`;
    const timeline = gsap.timeline();

    gsap.set(hole, { autoAlpha: 0, scale: 0 });
    gsap.set(light, { autoAlpha: 0, yPercent: -70, scaleY: 0 });
    gsap.set(role, { autoAlpha: 0, scaleY: 0 });
    gsap.set(target, { autoAlpha: 1 });
    timeline
      .to(hole, { autoAlpha: 1, scale: 1, duration: 0.3 })
      .to(light, { autoAlpha: 1, yPercent: 0, scaleY: 1.5, duration: 0.3 })
      .to(role, { autoAlpha: 1, scaleY: 1, ease: 'elastic', duration: 1.5 }, '<')
      .call(resolve);
  });
}

export {
  gsap,
  fadeIn,
  fadeOut,
  showDialog,
  showRole,
};
