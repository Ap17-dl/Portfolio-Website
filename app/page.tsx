'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';

// Lazy load components below the fold for better initial load performance
const Experience = dynamic(() => import('@/components/experience').then(mod => ({ default: mod.Experience })), {
  loading: () => null,
});

const Projects = dynamic(() => import('@/components/projects').then(mod => ({ default: mod.Projects })), {
  loading: () => null,
});

const Contact = dynamic(() => import('@/components/contact').then(mod => ({ default: mod.Contact })), {
  loading: () => null,
});

const Footer = dynamic(() => import('@/components/footer').then(mod => ({ default: mod.Footer })), {
  loading: () => null,
});

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: string | number): any;
  export function jsxs(type: any, props: any, key?: string | number): any;
  export function Fragment(props: { children?: any }): any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    type Element = any;
  }
}

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
