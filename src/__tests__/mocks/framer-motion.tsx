import React, { ReactNode } from 'react';

// Mock AnimatePresence
export const AnimatePresence = ({ children }: { children: ReactNode }) => {
  return <div data-testid="animate-presence">{children}</div>;
};

// Mock motion components
const createMotionComponent = (type: keyof JSX.IntrinsicElements) => {
  return ({
    children,
    animate,
    initial,
    exit,
    whileHover,
    whileFocus,
    whileTap,
    variants,
    transition,
    ...props
  }: {
    children?: ReactNode;
    animate?: any;
    initial?: any;
    exit?: any;
    whileHover?: any;
    whileFocus?: any;
    whileTap?: any;
    variants?: any;
    transition?: any;
    [key: string]: any
  }) => {
    const Component = type as any;
    
    return (
      <Component
        data-testid="motion-div"
        data-animate="true"
        data-state={props['data-state'] || 'hover'}
        data-loading="true"
        data-type="spinner"
        data-reduced-motion={props['data-reduced-motion'] || 'false'}
        {...props}
      >
        {children}
      </Component>
    );
  };
};

// Create specialized motion components
const createMotionSection = () => {
  return ({ children, ...props }: { children?: ReactNode; [key: string]: any }) => {
    return (
      <section data-testid="motion-section" {...props}>
        {children}
      </section>
    );
  };
};

const createMotionSpan = () => {
  return ({ children, ...props }: { children?: ReactNode; [key: string]: any }) => {
    return (
      <span data-testid="motion-span" {...props}>
        {children}
      </span>
    );
  };
};

// Create motion namespace with common HTML elements
export const motion = {
  div: createMotionComponent('div'),
  span: createMotionSpan(),
  button: createMotionComponent('button'),
  a: createMotionComponent('a'),
  ul: createMotionComponent('ul'),
  li: createMotionComponent('li'),
  p: createMotionComponent('p'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  h5: createMotionComponent('h5'),
  h6: createMotionComponent('h6'),
  section: createMotionSection(),
  article: createMotionComponent('article'),
  nav: createMotionComponent('nav'),
  aside: createMotionComponent('aside'),
  header: createMotionComponent('header'),
  footer: createMotionComponent('footer'),
  main: createMotionComponent('main'),
};

// Mock useAnimation hook
export const useAnimation = () => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn()
  };
};

// Mock useInView hook
export const useInView = () => {
  return [true, {}];
};

// Mock useScroll hook
export const useScroll = () => {
  return {
    scrollY: { get: () => 0, onChange: jest.fn() },
    scrollYProgress: { get: () => 0, onChange: jest.fn() }
  };
};

export default {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  useScroll
};