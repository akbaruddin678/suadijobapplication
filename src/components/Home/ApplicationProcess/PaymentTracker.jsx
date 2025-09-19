// PaymentTracker.jsx
import React, { useState, useRef } from 'react';
import './PaymentTracker.css';

// Import default logo
import defaultLogo from '../../../assets/cisd.jpg'; // Make sure to add a default logo image to your project

const PaymentTracker = ({ applicationId, application }) => {
  const [paymentData, setPaymentData] = useState({
    totalAmount: 85000,
    payments: [
    
    ],
    currency: "PKR",
    companyLogo: defaultLogo // Set default logo
  });
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [newPayment, setNewPayment] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: "",
    description: "",
    method: "bank"
  });

  const printRef = useRef();

  // Calculate total paid and remaining amount
  const totalPaid = paymentData.payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const remainingAmount = paymentData.totalAmount - totalPaid;
  const progressPercentage = paymentData.totalAmount > 0 ? (totalPaid / paymentData.totalAmount) * 100 : 0;

  const handleAddPayment = () => {
    if (newPayment.amount && newPayment.date) {
      const updatedPayments = [
        ...paymentData.payments,
        {
          ...newPayment,
          amount: Number(newPayment.amount),
          id: Date.now(), // unique ID for each payment
          printed: false
        }
      ];
      
      setPaymentData(prev => ({
        ...prev,
        payments: updatedPayments
      }));
      
      setNewPayment({
        date: new Date().toISOString().split('T')[0],
        amount: "",
        description: "",
        method: "bank"
      });
      
      setShowPaymentModal(false);
    }
  };

  const handleRemovePayment = (paymentId) => {
    setPaymentData(prev => ({
      ...prev,
      payments: prev.payments.filter(payment => payment.id !== paymentId)
    }));
  };

  const handleTotalAmountChange = (e) => {
    const value = e.target.value;
    setPaymentData(prev => ({
      ...prev,
      totalAmount: value ? Number(value) : 0
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPaymentData(prev => ({
          ...prev,
          companyLogo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'bank': return 'fa-building-columns';
      case 'jazzcash': return 'fa-mobile-alt';
      case 'easypaisa': return 'fa-money-bill-wave';
      case 'cash': return 'fa-money-bill-1';
      default: return 'fa-credit-card';
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch(method) {
      case 'bank': return 'Bank Transfer';
      case 'jazzcash': return 'JazzCash';
      case 'easypaisa': return 'EasyPaisa';
      case 'cash': return 'Cash';
      default: return method;
    }
  };

  const handlePrintPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPrintPreview(true);
  };

  const handlePrintAllPayments = () => {
    setSelectedPayment(null);
    setShowPrintPreview(true);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            .receipt-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 15px; }
            .logo { max-height: 80px; }
            .receipt-title { text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; }
            .receipt-details { margin: 20px 0; }
            .detail-row { display: flex; margin-bottom: 10px; }
            .detail-label { font-weight: bold; width: 150px; }
            .stamp-section { margin-top: 80px; display: flex; justify-content: space-between; }
            .stamp-box { text-align: center; width: 45%; }
            .stamp-image { max-height: 100px; margin-bottom: 10px; }
            .stamp-placeholder, .signature-placeholder { min-height: 120px; display: flex; align-items: center; justify-content: center; border: 1px dashed #ddd; padding: 10px; border-radius: 4px; margin-top: 20px; }
            .footer { margin-top: 50px; text-align: center; font-size: 14px; color: #666; }
            .payment-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .payment-table th, .payment-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .payment-table th { background-color: #f5f5f5; }
            .summary-row { font-weight: bold; background-color: #f9f9f9; }
            @media print {
              body { padding: 0; }
              .receipt-container { border: none; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for images to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      
      // Mark all payments as printed if printing all
      if (!selectedPayment) {
        setPaymentData(prev => ({
          ...prev,
          payments: prev.payments.map(p => ({...p, printed: true}))
        }));
      } else {
        // Mark single payment as printed
        setPaymentData(prev => ({
          ...prev,
          payments: prev.payments.map(p => 
            p.id === selectedPayment.id ? {...p, printed: true} : p
          )
        }));
      }
    }, 500);
  };

  return (
    <div className="payment-tracker">
      <div className="payment-header">
        <h3><i className="fas fa-money-bill-wave"></i> Payment Tracker</h3>
        <div className="header-actions">
          <button 
            className="btn primary"
            onClick={() => setShowPaymentModal(true)}
          >
            <i className="fas fa-plus"></i> Add Payment
          </button>
          <button 
            className="btn secondary"
            onClick={handlePrintAllPayments}
            disabled={paymentData.payments.length === 0}
          >
            <i className="fas fa-print"></i> Print All Payments
          </button>
          <div className="upload-buttons">
            <label className="btn secondary">
              <i className="fas fa-image"></i> Change Logo
              <input type="file" accept="image/*" onChange={handleLogoUpload} style={{display: 'none'}} />
            </label>
          </div>
        </div>
      </div>
      
      <div className="payment-summary">
        <div className="payment-total">
          <label>Total Amount ({paymentData.currency}):</label>
          <input
            type="number"
            value={paymentData.totalAmount || ""}
            onChange={handleTotalAmountChange}
            placeholder="Enter total amount"
          />
        </div>
        
        <div className="payment-stats">
          <div className="stat-box paid">
            <span className="stat-label">Paid</span>
            <span className="stat-amount">{paymentData.currency} {totalPaid.toLocaleString()}</span>
          </div>
          
          <div className="stat-box remaining">
            <span className="stat-label">Remaining</span>
            <span className="stat-amount">{paymentData.currency} {remainingAmount.toLocaleString()}</span>
          </div>
          
          <div className="stat-box progress">
            <span className="stat-label">Progress</span>
            <span className="stat-amount">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="payment-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {paymentData.payments.length > 0 && (
        <div className="payment-history">
          <h4>Payment History</h4>
          <div className="payment-list">
            {paymentData.payments
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((payment) => (
                <div key={payment.id} className="payment-item">
                  <div className="payment-details">
                    <div className="payment-method">
                      <i className={`fas ${getPaymentMethodIcon(payment.method)}`}></i>
                      {getPaymentMethodLabel(payment.method)}
                    </div>
                    <span className="payment-date">
                      {new Date(payment.date).toLocaleDateString()}
                    </span>
                    <span className="payment-description">
                      {payment.description || "Payment"}
                    </span>
                    {payment.printed && (
                      <span className="printed-badge">
                        <i className="fas fa-print"></i> Printed
                      </span>
                    )}
                  </div>
                  <div className="payment-actions">
                    <div className="payment-amount">
                      {paymentData.currency} {payment.amount.toLocaleString()}
                    </div>
                    <button 
                      className="btn print-btn"
                      onClick={() => handlePrintPayment(payment)}
                    >
                      <i className="fas fa-print"></i> Print
                    </button>
                    <button 
                      className="payment-remove"
                      onClick={() => handleRemovePayment(payment.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Payment</h3>
              <button 
                className="modal-close"
                onClick={() => setShowPaymentModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Amount ({paymentData.currency}):</label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                  placeholder="Enter amount"
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                  placeholder="Payment description"
                />
              </div>
              
              <div className="form-group">
                <label>Payment Method:</label>
                <select
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn secondary"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleAddPayment}
                disabled={!newPayment.amount || !newPayment.date}
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <div className="modal-overlay">
          <div className="modal-content print-modal">
            <div className="modal-header">
              <h3>{selectedPayment ? 'Print Payment Receipt' : 'Print All Payments'}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowPrintPreview(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div ref={printRef} className="receipt-container">
                <div className="header">
                  <div className="company-info">
                    {paymentData.companyLogo && (
                      <img src={paymentData.companyLogo} alt="Company Logo" className="logo" />
                    )}
                    <h2>College Of Skill Development</h2>
                    <p>48 Main Margalla Rd, F-7/2, Islamabad, Pakistan</p>
                    <p>Phone: +92 322 0547996 | Email: hr@cisd.edu.pk</p>
                  </div>
                  <div className="receipt-date">
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    {selectedPayment && <p>Receipt #: {selectedPayment.id}</p>}
                  </div>
                </div>
                
                <div className="receipt-title">
                  {selectedPayment ? 'PAYMENT RECEIPT' : 'PAYMENT SUMMARY'}
                </div>
                
                <div className="receipt-details">
                  <div className="detail-row">
                    <span className="detail-label">Candidate Name:</span>
                    <span>{application?.fullName || "Abdullah Abbasi"}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Passport Number:</span>
                    <span>{application?.passportNumber || "R1754207"}</span>
                  </div>
                  
                  {selectedPayment ? (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">Payment Date:</span>
                        <span>{new Date(selectedPayment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Payment Method:</span>
                        <span>{getPaymentMethodLabel(selectedPayment.method)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Description:</span>
                        <span>{selectedPayment.description}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Amount:</span>
                        <span className="amount">{paymentData.currency} {selectedPayment.amount.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Amount in Words:</span>
                        <span>{numberToWords(selectedPayment.amount)} {paymentData.currency} only</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">Total Amount:</span>
                        <span className="amount">{paymentData.currency} {paymentData.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Total Paid:</span>
                        <span className="amount">{paymentData.currency} {totalPaid.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Remaining Balance:</span>
                        <span className="amount">{paymentData.currency} {remainingAmount.toLocaleString()}</span>
                      </div>
                      
                      {paymentData.payments.length > 0 && (
                        <table className="payment-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Method</th>
                              <th>Amount ({paymentData.currency})</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentData.payments
                              .sort((a, b) => new Date(a.date) - new Date(b.date))
                              .map((payment, index) => (
                                <tr key={payment.id}>
                                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                                  <td>{payment.description || "Payment"}</td>
                                  <td>{getPaymentMethodLabel(payment.method)}</td>
                                  <td>{payment.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                            <tr className="summary-row">
                              <td colSpan="3" style={{textAlign: 'right'}}>Total Paid:</td>
                              <td>{totalPaid.toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </>
                  )}
                </div>
                
                <div className="stamp-section">
                  <div className="stamp-box">
                    <div className="stamp-placeholder">Official Stamp</div>
                  </div>
                  <div className="stamp-box">
                    <div className="signature-placeholder">Authorized Signature</div>
                  </div>
                </div>
                
                <div className="footer">
                  <p>Thank you for your payment. This is a computer generated receipt and does not require a physical signature.</p>
                  <p>For any queries, please contact our office at +92 322 0547996</p>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn secondary"
                onClick={() => setShowPrintPreview(false)}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handlePrint}
              >
                <i className="fas fa-print"></i> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to convert numbers to words
function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  
  let words = '';
  
  if (num >= 1000000) {
    words += numberToWords(Math.floor(num / 1000000)) + ' Million ';
    num %= 1000000;
  }
  
  if (num >= 1000) {
    words += numberToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }
  
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  } else if (num >= 10) {
    words += teens[num - 10] + ' ';
    num = 0;
  }
  
  if (num > 0) {
    words += ones[num] + ' ';
  }
  
  return words.trim();
}

export default PaymentTracker;