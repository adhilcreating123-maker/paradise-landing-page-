import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
console.log('GSAP registered with ScrollTrigger successfully! Version:', gsap.version);
