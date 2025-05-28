import React, { useState } from 'react';
import './PaymentPage.css'; // Seu arquivo CSS
import { useCart } from '../../context/useCart'; // Ajuste o caminho se necessário
import Button from '../../components/Button/Button.jsx'; // Ajuste o caminho se necessário

const PaymentForm = () => {
  const { cartItems } = useCart(); // Obtém os itens do seu contexto

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

  // --- Funções de Formatação ---
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
    // 1. Remove qualquer caractere que não seja um dígito.
    const cleaned = value.replace(/\D/g, '');

    // 2. Se não houver dígitos, retorna string vazia.
    if (cleaned.length === 0) {
      return '';
    }
    // 3. Se houver 1 ou 2 dígitos, retorna os dígitos (permitindo MM).
    if (cleaned.length <= 2) {
      return cleaned;
    }
    // 4. Se houver mais de 2 dígitos, forma MM/YY.
    //    Pega os dois primeiros dígitos para o mês e os próximos até dois para o ano.
    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  };
  // --- Fim das Funções de Formatação ---

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
      // Considere limpar o carrinho aqui se o pagamento for bem-sucedido:
      // if (clearCart) clearCart();
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
                maxLength="19" // 16 dígitos + 3 espaços
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
                  maxLength="5" // MM/YY (Ex: 12/25)
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
              <div className="summary-item" key={item.id}>
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