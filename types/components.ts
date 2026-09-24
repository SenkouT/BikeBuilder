export type Category =
  | 'cadre'
  | 'fourche'
  | 'roues'
  | 'pneus'
  | 'transmission'
  | 'freinage'
  | 'cockpit'
  | 'selle'
  | 'pedales'
  | 'accessoires';

export type Component = {
  id: string;
  category: Category;
  name: string;
  brand: string;
  price: number | null;
  weight?: number;
  specs: Record<string, string | number>;
  demo?: boolean;
};

export type Offer = {
  seller: string;
  price: number;
  shipping: number;
  available: boolean;
  delivery?: string;
  url: string;
};

export type CompatibilityStatus = 'compatible' | 'warning' | 'incompatible';

export type CompatibilityResult = {
  status: CompatibilityStatus;
  message: string;
  related?: string[];
};
