// src/features/cart/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import { useCart } from '../../context/useCart';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Button from '../../components/Button/Button';

const PaymentForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();                // garante login
  const { cartItems, clearCart } = useCart();

  // Se não estiver logado, deixa ProtectedRoutes cuidar (mas segurança extra):
  if (!user) return <p>Please log in to access this page.</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // --- estado do formulário ---
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvc: '',
    expirationDate: '',
    cardType: 'Credit',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // formatação dos campos...
  const formatCardNumber = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
  const formatExpirationDate = (val) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(?=\d)/, '$1/');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processed =
      name === 'cardNumber'
        ? formatCardNumber(value)
        : name === 'expirationDate'
        ? formatExpirationDate(value)
        : value;
    setFormData((p) => ({ ...p, [name]: processed }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {
    const newErr = {};
    if (!formData.nameOnCard.trim()) newErr.nameOnCard = 'Required';
    const rawCard = formData.cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(rawCard)) newErr.cardNumber = 'Invalid card number';
    if (!/^\d{3,4}$/.test(formData.cvc)) newErr.cvc = 'Invalid CVC';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate))
      newErr.expirationDate = 'Use MM/YY';
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await api.post('/orders', {
        items: cartItems.map((item) => ({
          productId: item.id || item._id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      alert('Purchase successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          'Something went wrong processing your order.'
      );
    } finally {
      setLoading(false);
    }
  };

  // --- JSX ---
  return (
    <div className="payment-page-container">
      <div className="payment-layout">
        {/* formulario */}
        <div className="payment-form-card">
          <div className="form-header">
            <h1>Payment Method</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Name on the card *</label>
              <input
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                className={errors.nameOnCard ? 'input-error' : ''}
              />
              {errors.nameOnCard && (
                <p className="error-text">{errors.nameOnCard}</p>
              )}
            </div>

            <div className="form-group">
              <label>Card Number *</label>
              <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
                className={errors.cardNumber ? 'input-error' : ''}
              />
              {errors.cardNumber && (
                <p className="error-text">{errors.cardNumber}</p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group-inline">
                <label>CVC *</label>
                <input
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  maxLength="4"
                  className={errors.cvc ? 'input-error' : ''}
                />
                {errors.cvc && <p className="error-text">{errors.cvc}</p>}
              </div>

              <div className="form-group-inline">
                <label>Expiration (MM/YY) *</label>
                <input
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expirationDate ? 'input-error' : ''}
                />
                {errors.expirationDate && (
                  <p className="error-text">{errors.expirationDate}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Credit/Debit *</label>
              <select
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
              >
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>

            <div className="form-footer">
              <Button type="submit" disabled={loading} className="finish-button">
                {loading ? 'Processing…' : 'Finish'}
              </Button>
            </div>
          </form>
        </div>

        {/* resumo */}
        <div className="order-summary-sidebar">
          <h2>Order Summary</h2>
          <div className="summary-details">
            {cartItems.map((i) => (
              <div className="summary-item" key={i.id || i._id}>
                <span>
                  {i.name} (x{i.quantity})
                </span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total to Pay</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
