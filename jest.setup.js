// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Helper method to trigger intersections
  triggerIntersection(entries) {
    this.callback(entries, this);
  }
}

// Set up mocks before tests
beforeAll(() => {
  // Mock localStorage
  const localStorageMock = new LocalStorageMock();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: false
  });
  
  // Mock IntersectionObserver
  global.IntersectionObserver = IntersectionObserverMock;
  
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock scrollTo
  window.scrollTo = jest.fn();
  // Mock framer-motion
  jest.mock('framer-motion', () => require('../src/__tests__/mocks/framer-motion.tsx'));
  
  // Mock next/router
  jest.mock('next/router', () => require('../src/__tests__/mocks/next-router.tsx'));
  
  // Mock next/navigation
  jest.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn()
    })
  }));
});

// Clean up after each test
afterEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});