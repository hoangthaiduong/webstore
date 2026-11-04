export type Pricing = 'free' | 'freemium' | 'paid' | 'usage-based' | 'commercial';
export type VerificationStatus = 'verified' | 'unchecked' | 'broken';
export interface Website {
  id: string; name: string; url: string; domain: string; description: string;
  category: string; subcategory: string; tags: string[]; pricing: Pricing;
  platform: string; featured: boolean; status: VerificationStatus; addedOrder: number; verifiedAt?: string;
}
export interface Collection { id: string; name: string; items: string[]; }
export interface LibraryState {
  favorites: string[]; saved: string[]; recent: { id: string; at: number }[]; compare: string[];
  collections: Collection[]; verification: Record<string, { status: VerificationStatus; verifiedAt?: string }>; theme: 'light' | 'dark' | 'system';
  sort: 'featured' | 'az' | 'za' | 'recent'; density: 'comfortable' | 'compact'; historyOn: boolean;
}
