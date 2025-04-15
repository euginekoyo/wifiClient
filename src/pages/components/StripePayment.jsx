import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, Typography, CircularProgress, Alert, Paper, Divider } from "@mui/material";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '12px',
    },
    invalid: {
      color: '#dc2626',
      iconColor: '#dc2626',
    },
  },
};

const StripePaymentForm = ({ packageDetails, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again later.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      console.log("Making payment request for amount:", packageDetails.price);
      
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId: packageDetails.id,
          amount: packageDetails.price,
        }),
      });

      const data = await response.json();
      console.log("Payment intent response:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onSuccess?.();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || 'Payment failed');
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{
      p: 3,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}>
      <Typography variant="h6" gutterBottom sx={{ 
        fontWeight: 600,
        color: 'text.primary',
        mb: 3 
      }}>
        Payment Details
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 1,
            '& .MuiAlert-message': { fontSize: '0.925rem' }
          }}
        >
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ mb: 1, color: 'text.secondary' }}
        >
          Package Summary
        </Typography>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'action.hover',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Typography variant="body2">{packageDetails?.time}</Typography>
          <Typography variant="body2" fontWeight="600">
            {packageDetails?.price}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ mb: 2, color: 'text.secondary' }}
        >
          Card Information
        </Typography>
        <Box sx={{
          p: 2,
          border: '1px solid',
          borderColor: error ? 'error.main' : 'divider',
          borderRadius: 1,
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 2px rgba(0,0,0,0.05)'
          }
        }}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handlePayment}
        disabled={loading || !packageDetails || !stripe}
        sx={{
          py: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' },
          borderRadius: 1.5,
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <Typography>Pay {packageDetails?.price || "0"}</Typography>
        )}
      </Button>
    </Paper>
  );
};

const StripeWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <StripePaymentForm {...props} />
  </Elements>
);

export default StripeWrapper;
