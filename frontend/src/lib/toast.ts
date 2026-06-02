import { toast as sonnerToast, type ExternalToast } from 'sonner';

export const toast = {
  success: (message: string, data?: ExternalToast) => sonnerToast.success(message, data),
  error: (message: string, data?: ExternalToast) => sonnerToast.error(message, data),
  info: (message: string, data?: ExternalToast) => sonnerToast.info(message, data),
  loading: (message: string, data?: ExternalToast) => sonnerToast.loading(message, data),
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
};
