export function openLightbox(lb: HTMLElement, img: HTMLImageElement, src: string, alt: string) {
  img.src = src;
  img.alt = alt;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

export function closeLightbox(lb: HTMLElement) {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
