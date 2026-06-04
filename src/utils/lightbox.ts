let _lastFocus: HTMLElement | null = null;

export interface LightboxBinding {
  open: (index: number) => void;
  close: () => void;
}

export function bindLightbox(
  lbId: string,
  itemSelector: string,
  options: { srcAttr?: string; altAttr?: string; withNav?: boolean } = {},
): LightboxBinding | null {
  const { srcAttr = 'data-src', altAttr = 'data-alt', withNav = false } = options;
  const lb = document.getElementById(lbId);
  if (!lb) return null;

  const img = lb.querySelector<HTMLImageElement>('[data-lb-img]');
  const prevBtn = lb.querySelector<HTMLElement>('[data-lb-prev]');
  const nextBtn = lb.querySelector<HTMLElement>('[data-lb-next]');
  if (!img) return null;

  const items = Array.from(document.querySelectorAll<HTMLElement>(itemSelector));
  let current = 0;

  function setSlide(index: number) {
    if (items.length === 0) return;
    current = (index + items.length) % items.length;
    const item = items[current];
    img!.src = item.getAttribute(srcAttr) || '';
    img!.alt = item.getAttribute(altAttr) || '';
  }

  function open(index: number) {
    if (items.length === 0) return;
    _lastFocus = document.activeElement as HTMLElement | null;
    setSlide(index);
    lb!.classList.add('open');
    lb!.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = lb!.querySelector<HTMLElement>('button, [tabindex]');
    (focusable ?? lb!).focus();
  }

  function close() {
    lb!.classList.remove('open');
    lb!.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    _lastFocus?.focus();
    _lastFocus = null;
  }

  items.forEach((el, i) => {
    if (!el.getAttribute(srcAttr)) return;
    el.addEventListener('click', () => open(i));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  lb.addEventListener('click', (e) => {
    if (e.target === prevBtn || e.target === nextBtn) return;
    close();
  });

  if (withNav) {
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(current - 1);
    });
    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(current + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (withNav && e.key === 'ArrowLeft') setSlide(current - 1);
    if (withNav && e.key === 'ArrowRight') setSlide(current + 1);
  });

  return { open, close };
}
