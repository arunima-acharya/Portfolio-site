"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

interface ImageItemEl {
  el: HTMLElement;
  inner: HTMLElement;
  rect: DOMRect;
}

function makeImageItem(el: HTMLElement): ImageItemEl {
  const inner = el.querySelector(".img-inner") as HTMLElement;
  const item: ImageItemEl = { el, inner, rect: el.getBoundingClientRect() };
  window.addEventListener("resize", () => {
    gsap.set(el, { scale: 1, x: 0, y: 0, opacity: 0 });
    item.rect = el.getBoundingClientRect();
  });
  return item;
}

// ── Variant 1 ──────────────────────────────────────────────────────────────
class V1 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    window.addEventListener("touchmove", (ev) => { this.mousePos = { x: ev.touches[0].clientX, y: ev.touches[0].clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { opacity: 1, scale: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2 }, { duration: 0.4, ease: "power1", x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2 }, 0)
      .to(img.el, { duration: 0.4, ease: "power3", opacity: 0, scale: 0.2 }, 0.4);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

// ── Variant 2 ──────────────────────────────────────────────────────────────
class V2 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2 }, { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2 }, 0)
      .fromTo(img.inner, { scale: 2.8, filter: "brightness(250%)" }, { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%)" }, 0)
      .to(img.el, { duration: 0.4, ease: "power2", opacity: 0, scale: 0.2 }, 0.45);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

// ── Variant 3 ──────────────────────────────────────────────────────────────
class V3 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, xPercent: 0, yPercent: 0, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2 }, { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2 }, 0)
      .fromTo(img.inner, { scale: 1.2 }, { duration: 0.4, ease: "power1", scale: 1 }, 0)
      .to(img.el, { duration: 0.6, ease: "power2", opacity: 0, scale: 0.2, xPercent: () => gsap.utils.random(-30, 30), yPercent: -200 }, 0.6);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

// ── Variant 4 ──────────────────────────────────────────────────────────────
class V4 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist !== 0) { dx /= dist; dy /= dist; }
    dx *= dist / 100; dy *= dist / 100;
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2 }, { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2 }, 0)
      .fromTo(img.inner, { scale: 2, filter: `brightness(${Math.max((400 * dist) / 100, 100)}%) contrast(${Math.max((400 * dist) / 100, 100)}%)` }, { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%) contrast(100%)" }, 0)
      .to(img.el, { duration: 0.4, ease: "power3", opacity: 0 }, 0.4)
      .to(img.el, { duration: 1.5, ease: "power4", x: `+=${dx * 110}`, y: `+=${dy * 110}` }, 0.05);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

// ── Variant 5 ──────────────────────────────────────────────────────────────
class V5 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80; lastAngle = 0;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x;
    let dy = this.mousePos.y - this.cacheMousePos.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle > 90 && angle <= 270) angle += 180;
    const startAngle = angle >= this.lastAngle ? angle - 10 : angle + 10;
    this.lastAngle = angle;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist !== 0) { dx /= dist; dy /= dist; }
    dx *= dist / 150; dy *= dist / 150;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { opacity: 1, filter: "brightness(80%)", scale: 0.1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2, rotation: startAngle }, { duration: 1, ease: "power2", scale: 1, filter: "brightness(100%)", x: this.mousePos.x - img.rect.width / 2 + dx * 70, y: this.mousePos.y - img.rect.height / 2 + dy * 70, rotation: this.lastAngle }, 0)
      .to(img.el, { duration: 0.4, ease: "expo", opacity: 0 }, 0.5)
      .to(img.el, { duration: 1.5, ease: "power4", x: `+=${dx * 120}`, y: `+=${dy * 120}` }, 0.05);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

// ── Variant 6 ──────────────────────────────────────────────────────────────
class V6 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    const dx = this.mousePos.x - this.cacheMousePos.x;
    const dy = this.mousePos.y - this.cacheMousePos.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const scaleFactor = 0.3 + (Math.min(speed / 200, 1)) * 1.7;
    const brightnessValue = 0 + Math.min(speed / 70, 1) * 1.3;
    const blurValue = 20 - Math.min(speed / 90, 1) * 20;
    const grayscaleValue = 600 - Math.min(speed / 90, 1) * 600;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2 }, { duration: 0.8, ease: "power3", scale: scaleFactor, filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`, x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2 }, 0)
      .fromTo(img.inner, { scale: 2 }, { duration: 0.8, ease: "power3", scale: 1 }, 0)
      .to(img.el, { duration: 0.4, ease: "power3.in", opacity: 0, scale: 0.2 }, 0.45);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

// ── Variant 7 ──────────────────────────────────────────────────────────────
function getNewPosition(position: number, offset: number, arr: unknown[]) {
  const realOffset = Math.abs(offset) % arr.length;
  return position - realOffset >= 0 ? position - realOffset : arr.length - (realOffset - position);
}

class V7 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };
  visibleImagesCount = 0; visibleImagesTotal: number;

  constructor(container: HTMLElement) {
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    this.visibleImagesTotal = Math.min(9, this.imagesTotal - 1);
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    ++this.visibleImagesCount;
    gsap.killTweensOf(img.el);
    const scaleValue = gsap.utils.random(0.5, 1.6);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .fromTo(img.el, { scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0), rotationZ: 0, opacity: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2 }, { duration: 0.4, ease: "power3", scale: scaleValue, rotationZ: gsap.utils.random(-3, 3), x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2 }, 0);
    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const oldImg = this.images[getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images)];
      gsap.to(oldImg.el, { duration: 0.4, ease: "power4", opacity: 0, scale: 1.3, onComplete: () => { if (this.activeImagesCount === 0) this.isIdle = true; } });
    }
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; }
}

// ── Variant 8 ──────────────────────────────────────────────────────────────
class V8 {
  images: ImageItemEl[]; imagesTotal: number; imgPosition = 0; zIndexVal = 1;
  activeImagesCount = 0; isIdle = true; threshold = 80;
  mousePos = { x: 0, y: 0 }; lastMousePos = { x: 0, y: 0 }; cacheMousePos = { x: 0, y: 0 };
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.images = [...container.querySelectorAll<HTMLElement>(".content__img")].map(makeImageItem);
    this.imagesTotal = this.images.length;
    window.addEventListener("mousemove", (ev) => { this.mousePos = { x: ev.clientX, y: ev.clientY }; });
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
    if (distance > this.threshold) { this.showNextImage(); this.lastMousePos = { ...this.mousePos }; }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.width / 2; const centerY = rect.height / 2;
    const relX = this.mousePos.x - centerX; const relY = this.mousePos.y - centerY;
    const rotX = -(relY / centerY) * 30; const rotY = (relX / centerX) * 30;
    const distFromCenter = Math.sqrt(relX * relX + relY * relY);
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    const zValue = (distFromCenter / maxDist) * 1200 - 600;
    const brightness = 0.2 + ((zValue + 600) / 1200) * 2.3;
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    gsap.killTweensOf(img.el);
    gsap.timeline({ onStart: () => this.onActivated(), onComplete: () => this.onDeactivated() })
      .set(this.container, { perspective: 1000 }, 0)
      .fromTo(img.el, { opacity: 1, z: 0, scale: 1 + zValue / 1000, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.rect.width / 2, y: this.cacheMousePos.y - img.rect.height / 2, rotationX: rotX, rotationY: rotY, filter: `brightness(${brightness})` }, { duration: 1, ease: "expo", scale: 1 + zValue / 1000, x: this.mousePos.x - img.rect.width / 2, y: this.mousePos.y - img.rect.height / 2, rotationX: rotX, rotationY: rotY }, 0)
      .to(img.el, { duration: 0.4, ease: "power2", opacity: 0, z: -800 }, 0.3);
  }

  onActivated() { this.activeImagesCount++; this.isIdle = false; }
  onDeactivated() { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; }
}

const variantMap: Record<number, new (container: HTMLElement) => unknown> = {
  1: V1, 2: V2, 3: V3, 4: V4, 5: V5, 6: V6, 7: V7, 8: V8,
};

export interface ToolItem {
  name: string;
  slug: string;
  bg: string;
  color: string;
  border?: boolean;
}

const DEFAULT_TOOLS: ToolItem[] = [
  { name: "Figma",    slug: "figma",    bg: "#1E1E1E", color: "#fff" },
  { name: "Framer",   slug: "framer",   bg: "#0A0A0A", color: "#fff" },
  { name: "Notion",   slug: "notion",   bg: "#fff",    color: "#111", border: true },
  { name: "Miro",     slug: "miro",     bg: "#FFD02F", color: "#111" },
  { name: "Jira",     slug: "jira",     bg: "#0052CC", color: "#fff" },
  { name: "HubSpot",  slug: "hubspot",  bg: "#FF7A59", color: "#fff" },
  { name: "Sketch",   slug: "sketch",   bg: "#F7B500", color: "#fff" },
  { name: "Maze",     slug: "maze",     bg: "#6C47FF", color: "#fff" },
  { name: "Zeplin",   slug: "zeplin",   bg: "#FDBD39", color: "#111" },
];

interface ImageTrailProps {
  tools?: ToolItem[];
  variant?: number;
  boundary?: React.RefObject<HTMLElement | null>;
}

export default function ImageTrail({ tools = DEFAULT_TOOLS, variant = 1, boundary }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const Cls = variantMap[variant] ?? variantMap[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inst = new Cls(containerRef.current) as any;

    if (boundary) {
      const origRender = inst.render as () => void;
      inst.render = function (this: typeof inst) {
        if (boundary.current) {
          const r = boundary.current.getBoundingClientRect();
          const { mousePos } = this;
          const outside =
            mousePos.x < r.left || mousePos.x > r.right ||
            mousePos.y < r.top || mousePos.y > r.bottom;
          if (outside) {
            this.lastMousePos = { ...mousePos };
          }
        }
        origRender.call(this);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {tools.map((tool, i) => (
        <div
          key={i}
          className="content__img"
          style={{
            width: 78,
            height: 78,
            borderRadius: 14,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            overflow: "hidden",
            willChange: "transform, filter",
            background: tool.bg,
            border: tool.border ? "1px solid rgba(0,0,0,0.1)" : undefined,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          <div className="img-inner" style={{ display: "contents" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color.replace("#", "")}`}
              alt={tool.name}
              width={31}
              height={31}
              style={{ display: "block", flexShrink: 0 }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: tool.color,
                fontFamily: "var(--font-inter), sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              {tool.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
