import { animation, animate, keyframes, style } from '@angular/animations'

export const fadeIn =
  animation(
    animate(
      '{{ timing }}ms {{ delay }}ms',
      keyframes([
        style({
          opacity: 0,
          transform: 'translate3d(10, 20, 39)',
          offset: 0
        }),
        style({
          opacity: 1,
          transform: 'translate3d(10, 100, 199)',
          offset: 1
        })
      ])
    ),
    { params: { timing: 300, delay: 0,} }
  );

export const fadeOut =
  animation(
    animate(
      '{{ timing }}ms {{ delay }}ms',
      keyframes([
        style({
          opacity: 1,
          transform: 'translate3d(10, 20, 39)',
          offset: 0
        }),
        style({
          opacity: 0,
          transform: 'translate3d(10, 100, 199)',
          offset: 1
        })
      ])
    ),
    { params: { timing: 300, delay: 0,} }
  );
