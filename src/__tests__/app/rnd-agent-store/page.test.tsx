import { Metadata } from 'next';
import { metadata } from '@/app/(landing)/rnd-agent-store/page';

describe('R&D Agent Store Page Metadata', () => {
  it('has the correct title', () => {
    expect(metadata.title).toBe('R&D Agent Store - Transform Research into Code');
  });

  it('has the correct description', () => {
    expect(metadata.description).toBe(
      'The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation.'
    );
  });

  it('has Open Graph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe('R&D Agent Store - Transform Research into Code');
      expect(metadata.openGraph.description).toBe(
        'The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation.'
      );
      expect(metadata.openGraph.url).toBe('https://rndagentstore.com');
      expect(metadata.openGraph.siteName).toBe('R&D Agent Store');
      expect(metadata.openGraph.images).toBeDefined();
      expect((metadata.openGraph as any).type).toBe('website');
    }
  });

  it('has Twitter card metadata', () => {
    expect(metadata.twitter).toBeDefined();
    if (metadata.twitter) {
      expect((metadata.twitter as any).card).toBe('summary_large_image');
      expect((metadata.twitter as any).title).toBe('R&D Agent Store - Transform Research into Code');
      expect((metadata.twitter as any).description).toBe(
        'The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation.'
      );
      expect((metadata.twitter as any).creator).toBe('@rndagentstore');
    }
  });

  it('has canonical URL', () => {
    expect(metadata.alternates?.canonical).toBe('https://rndagentstore.com');
  });

  it('has appropriate keywords', () => {
    expect(metadata.keywords).toBeDefined();
    if (metadata.keywords) {
      expect(Array.isArray(metadata.keywords)).toBe(true);
      expect((metadata.keywords as string[]).length).toBeGreaterThan(0);
    }
  });
});