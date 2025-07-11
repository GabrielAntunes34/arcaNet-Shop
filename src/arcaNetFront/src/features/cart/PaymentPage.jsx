import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import { useCart } from '../../context/useCart';
import Button from '../../components/Button/Button.jsx';

const PaymentForm = () => {
  const { cartItems, clearCart } = useCart(); // Get items from context
  const navigate = useNavigate(); // Hook for navigation

  const precoTotal = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    : 0;

  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvc: '',
    expirationDate: '',
    cardType: 'Credit',
  });

  const [errors, setErrors] = useState({});

  // --- Formatting Functions ---
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s+/g, '').replace(/\D/g, '');
    const truncated = cleaned.substring(0, 16);
    const parts = [];
    for (let i = 0; i < truncated.length; i += 4) {
      parts.push(truncated.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpirationDate = (value) => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length === 0) {
      return '';
    }
    if (cleaned.length <= 2) {
      return cleaned;
    }
    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  };
  // --- End of Formatting Functions ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = formatCardNumber(value);
    } else if (name === 'expirationDate') {
      processedValue = formatExpirationDate(value);
    }

    setFormData({ ...formData, [name]: processedValue });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on the card is required.';

    const rawCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!rawCardNumber) {
      newErrors.cardNumber = 'Card Number is required.';
    } else if (!/^\d{13,19}$/.test(rawCardNumber)) {
      newErrors.cardNumber = 'Card Number must be between 13 and 19 digits.';
    }

    if (!formData.cvc.trim()) {
      newErrors.cvc = 'CVC is required.';
    } else if (!/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = 'CVC must be 3 or 4 digits.';
    }

    if (!formData.expirationDate.trim()) {
      newErrors.expirationDate = 'Expiration Date is required.';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expirationDate)) {
      newErrors.expirationDate = 'Expiration Date must be in MM/YY format.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
      };
      console.log('Form Data Submitted:', submissionData, 'Total Paid:', precoTotal.toFixed(2));
      alert('Payment data submitted! Check the console.');
      
      // Format cart items for sending to the server
      const payload = cartItems.map(item => ({
        _id: item._id,
        quantityToAdd: item.quantity
      }));

      // Send updated product quantities to backend via POST /payment
      fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Payment processed successfully:', data);
          alert('Payment processed successfully!');

          // Clear cart after successful payment
          clearCart();

          // Redirect to homepage
          navigate('/');
        })
        .catch(error => {
          console.error('Error processing payment:', error);
          alert('There was an error processing your payment. Please try again.');
        });
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="payment-page-container">
      <div className="payment-layout">
        <div className="payment-form-card">
          <div className="form-header">
            <h1>Payment Method</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nameOnCard"> Name on the card *</label>
              <input type="text" id="nameOnCard" name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} className={errors.nameOnCard ? 'input-error' : ''} />
              {errors.nameOnCard && <p className="error-text">{errors.nameOnCard}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
                className={errors.cardNumber ? 'input-error' : ''}
              />
              {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
            </div>

            <div className="form-row">
              <div className="form-group-inline">
                <label htmlFor="cvc">CVC *</label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  maxLength="4"
                  className={errors.cvc ? 'input-error' : ''}
                />
                {errors.cvc && <p className="error-text">{errors.cvc}</p>}
              </div>

              <div className="form-group-inline">
                <label htmlFor="expirationDate">Expiration Date *</label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expirationDate ? 'input-error' : ''}
                />
                {errors.expirationDate && <p className="error-text">{errors.expirationDate}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardType">Credit/Debit *</label>
              <select id="cardType" name="cardType" value={formData.cardType} onChange={handleChange}>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>

            <div className="form-footer">
              <Button type="submit" className="finish-button">
                Finish
              </Button>
            </div>
          </form>
        </div>

        <div className="order-summary-sidebar">
          <h2>Order Summary</h2>
          <div className="summary-details">
            {cartItems.map(item => (
              <div className="summary-item" key={item._id}>
                <span>{item.name} (x{item.quantity})</span>
                <span>$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {cartItems.length === 0 && (
              <p>Your summary is empty.</p>
            )}
          </div>
          <div className="summary-total">
            <span>Total to Pay</span>
            <span>$ {precoTotal.toFixed(2)}</span>
          </div>
          <p className="secure-payment-info">
            Your payment is 100% secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
