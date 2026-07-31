export const PAYSTACK_PUBLIC_KEY = 'pk_test_00000000000000000000000000000000placeholder';

export function payWithPaystack({ email, amountNaira, name, phone, reference, metadata, onSuccess, onClose }) {
  if (!window.PaystackPop) {
    onClose && onClose('Payment could not start. Please refresh and try again.');
    return;
  }

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: Math.round(amountNaira * 100),
    currency: 'NGN',
    ref: reference,
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'customer_name', value: name || '' },
        { display_name: 'Phone', variable_name: 'phone', value: phone || '' },
        ...(metadata || []),
      ],
    },
    callback(response) {
      onSuccess && onSuccess(response);
    },
    onClose() {
      onClose && onClose('Payment window closed.');
    },
  });

  handler.openIframe();
}
