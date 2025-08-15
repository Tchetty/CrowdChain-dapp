import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animations = {
  // Parallax hero animation
  parallaxHero() {
    gsap.timeline()
      .to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
      .fromTo('.hero-content', 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
  },

  // Staggered card animations
  staggerCards(selector: string, delay = 0.1) {
    const cards = gsap.utils.toArray(selector);
    
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  },

  // Progress bar animation
  progressBar(element: string | Element, progress: number) {
    gsap.to(element, {
      width: `${progress}%`,
      duration: 1.5,
      ease: 'power2.out'
    });
  },

  // Pulse animation for new data
  pulseElement(element: string | Element) {
    gsap.timeline({ repeat: 2 })
      .to(element, { 
        scale: 1.05, 
        duration: 0.3, 
        ease: 'power2.out' 
      })
      .to(element, { 
        scale: 1, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
  },

  // Success animation for completed transactions
  successAnimation(element: string | Element) {
    const tl = gsap.timeline();
    
    tl.to(element, {
      scale: 1.2,
      rotation: 360,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    return tl;
  },

  // Milestone release celebration
  milestoneRelease(container: string | Element) {
    const tl = gsap.timeline();
    
    // Create confetti-like particles
    const particles = gsap.utils.toArray(`${container} .particle`);
    
    tl.set(particles, {
      opacity: 1,
      scale: 0
    })
    .to(particles, {
      scale: 1,
      rotation: 360,
      x: 'random(-200, 200)',
      y: 'random(-200, 200)',
      duration: 1,
      stagger: 0.05,
      ease: 'power2.out'
    })
    .to(particles, {
      opacity: 0,
      duration: 0.5,
      delay: 0.5
    });

    return tl;
  },

  // Smooth scroll to element
  scrollTo(target: string | Element, offset = 0) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        offsetY: offset
      },
      ease: 'power2.inOut'
    });
  },

  // Entrance animation for modal/drawer
  slideIn(element: string | Element, direction = 'right') {
    const x = direction === 'right' ? '100%' : direction === 'left' ? '-100%' : 0;
    const y = direction === 'top' ? '-100%' : direction === 'bottom' ? '100%' : 0;
    
    return gsap.fromTo(element,
      { 
        x, 
        y,
        opacity: 0 
      },
      { 
        x: 0, 
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }
    );
  },

  // Counter animation
  animateCounter(element: string | Element, target: number, duration = 2) {
    const obj = { value: 0 };
    
    return gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate() {
        if (typeof element === 'string') {
          const el = document.querySelector(element);
          if (el) el.textContent = Math.floor(obj.value).toString();
        } else {
          element.textContent = Math.floor(obj.value).toString();
        }
      }
    });
  },

  // Loading animation
  loading(element: string | Element) {
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: 'none'
    });
  },

  // Hover scale effect
  hoverScale(element: string | Element, scale = 1.05) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale, duration: 0.3, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  }
};

export { gsap };
export default animations;
