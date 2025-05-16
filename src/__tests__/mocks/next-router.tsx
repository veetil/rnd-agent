import React from 'react';

// Mock Next.js router
const createMockRouter = (overrides = {}) => ({
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  back: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  ...overrides
});

// Mock useRouter hook
export const useRouter = jest.fn().mockImplementation(() => createMockRouter());

// Mock usePathname hook
export const usePathname = jest.fn().mockImplementation(() => '/');

// Mock RouterContext
export const RouterContext = React.createContext(createMockRouter());

export default {
  useRouter,
  usePathname,
  RouterContext
};