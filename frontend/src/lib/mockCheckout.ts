import type { MockPlanTarget } from '@/services/subscriptionApi';

export type MockPaymentInput = {
  cardNumber: string;
  expiry: string;
  cvc: string;
  holderName: string;
};

export type ParsedPaymentMethod = {
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex';
};

const MOCK_CHECKOUT_DELAY_MS = 1500;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function detectCardBrand(digits: string): ParsedPaymentMethod['brand'] {
  if (digits.startsWith('34') || digits.startsWith('37')) return 'amex';
  if (digits.startsWith('5')) return 'mastercard';
  return 'visa';
}

export function parsePaymentMethod(input: MockPaymentInput): ParsedPaymentMethod | null {
  const digits = input.cardNumber.replace(/\D/g, '');
  if (digits.length < 4) return null;
  return {
    last4: digits.slice(-4),
    brand: detectCardBrand(digits),
  };
}

export function validateMockPayment(input: MockPaymentInput): string | null {
  const digits = input.cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) {
    return 'Introduce un número de tarjeta válido (13–19 dígitos).';
  }
  if (!/^\d{2}\/\d{2}$/.test(input.expiry.trim())) {
    return 'La caducidad debe tener formato MM/AA.';
  }
  if (input.cvc.replace(/\D/g, '').length < 3) {
    return 'Introduce el código de seguridad (CVC).';
  }
  if (input.holderName.trim().length < 2) {
    return 'Introduce el nombre del titular.';
  }
  return null;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export { MOCK_CHECKOUT_DELAY_MS };

export type MockCheckoutPlan = MockPlanTarget;
