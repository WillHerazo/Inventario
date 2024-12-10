import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Product, Supplier, InventoryMovement } from '@/lib/types';

interface InventoryState {
  products: Product[];
  suppliers: Supplier[];
  movements: InventoryMovement[];
  loading: boolean;
  error: string | null;
  filters: {
    product: {
      search: string;
      category: string;
      supplier: string;
    };
    supplier: {
      search: string;
    };
  };
}

type InventoryAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_SUPPLIERS'; payload: Supplier[] }
  | { type: 'ADD_SUPPLIER'; payload: Supplier }
  | { type: 'UPDATE_SUPPLIER'; payload: Supplier }
  | { type: 'DELETE_SUPPLIER'; payload: string }
  | { type: 'SET_MOVEMENTS'; payload: InventoryMovement[] }
  | { type: 'ADD_MOVEMENT'; payload: InventoryMovement }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_PRODUCT_FILTERS'; payload: { search?: string; category?: string; supplier?: string } }
  | { type: 'SET_SUPPLIER_FILTERS'; payload: { search?: string } };

const initialState: InventoryState = {
  products: [],
  suppliers: [],
  movements: [],
  loading: false,
  error: null,
  filters: {
    product: {
      search: '',
      category: '',
      supplier: '',
    },
    supplier: {
      search: '',
    },
  },
};

const InventoryContext = createContext<{
  state: InventoryState;
  dispatch: React.Dispatch<InventoryAction>;
} | null>(null);

function inventoryReducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'SET_SUPPLIERS':
      return { ...state, suppliers: action.payload };
    case 'ADD_SUPPLIER':
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter((s) => s.id !== action.payload),
      };
    case 'SET_MOVEMENTS':
      return { ...state, movements: action.payload };
    case 'ADD_MOVEMENT':
      return { ...state, movements: [action.payload, ...state.movements] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PRODUCT_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          product: { ...state.filters.product, ...action.payload },
        },
      };
    case 'SET_SUPPLIER_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          supplier: { ...state.filters.supplier, ...action.payload },
        },
      };
    default:
      return state;
  }
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}