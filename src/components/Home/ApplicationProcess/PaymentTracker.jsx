import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { utils, writeFile } from "xlsx"; // For Excel Export
import "./PaymentTracker.css";
import defaultLogo from "../../../assets/cisd.jpg"; // Default Logo for the company

const PaymentTracker = ({ applicationId, application }) => {
  const [paymentData, setPaymentData] = useState({
    totalAmount: 85000, // Default value, will be updated from the backend
    payments: [], // Array of payments made
    currency: "PKR",
    companyLogo: defaultLogo, // Set default logo
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    description: "",
    method: "bank",
  });
  const printRef = useRef();

  // Fetch payment data and update totalAmount from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(
          `https://hungry-hopper.210-56-25-68.plesk.page/api/payments/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            setPaymentData((prevData) => ({
              ...prevData,
              payments: res.data, // Update payments data
            }));

            // Update totalAmount with value from response or fallback to application data
            const newTotalAmount =
              res.data[0]?.totalamount || application.totalAmount;

            setPaymentData((prevData) => ({
              ...prevData,
              totalAmount: newTotalAmount, // Update totalAmount
            }));
          } else {
            console.error("Unexpected data format:", res.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching payments:", err);
        });
    } else {
      alert("You must be logged in to view payment data");
    }
  }, [applicationId, application]);

  // Calculate total paid and remaining amount
  const totalPaid = paymentData.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const remainingAmount = paymentData.totalAmount - totalPaid;
  const progressPercentage =
    paymentData.totalAmount > 0
      ? (totalPaid / paymentData.totalAmount) * 100
      : 0;

  const handleAddPayment = () => {
    if (newPayment.amount && newPayment.date) {
      const totalAmount = Number(paymentData.totalAmount);
      if (isNaN(totalAmount)) {
        alert(
          "Total amount is not valid. Please check the total amount field."
        );
        return;
      }

      const payment = {
        applicationId,
        totalamount: totalAmount || 0,
        amount: Number(newPayment.amount),
        date: newPayment.date,
        method: newPayment.method,
        description: newPayment.description,
      };
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to make a payment");
        return;
      }

      axios
        .post(
          "https://hungry-hopper.210-56-25-68.plesk.page/api/payments",
          payment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setPaymentData((prev) => ({
            ...prev,
            payments: [...prev.payments, response.data.payment], // Add new payment to the state
          }));
          setShowPaymentModal(false);
        })
        .catch((error) => {
          console.error("Error adding payment:", error);
        });
    } else {
      alert("Please provide both amount and date for the payment.");
    }
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const latestPayment = paymentData.payments[paymentData.payments.length - 1];

    printWindow.document.write(`
<html>
  <head>
    <title>PAYMENT RECEIPT</title>
    <style>
      /* Import modern font */
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
      
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fa;
        color: #333;
      }

      .receipt-container {
        max-width: 700px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }

      .header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #f1f1f1;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }

      .logo {
        max-height: 150px;
      }

      .header div {
        font-weight: 600;
        font-size: 18px;
        color: #4f4f4f;
      }

      .receipt-title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        color: #4a52baff;
        text-transform: uppercase;
      }

      .receipt-details {
        margin-bottom: 20px;
        font-size: 16px;
        color: #4f4f4f;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      .detail-label {
        font-weight: 600;
        color: #4f4f4f;
      }

      .payment-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 16px;
        border: 1px solid #ddd; /* Add border to the table */
      }

      .payment-table th,
      .payment-table td {
        padding: 12px;
        text-align: left;
        color: #333;
        border: 1px solid #ddd; /* Add border to the table cells */
      }

      .payment-table th {
        background-color: #f7f7f7;
        font-weight: 600;
      }

      .payment-table td {
        background-color: #fafafa;
      }

      .summary-row {
        margin-top: 30px;
        font-size: 18px;
        font-weight: 600;
        text-align: right;
        color: #4f4f4f;
      }

      .footer {
        margin-top: 50px;
        text-align: center;
        font-size: 14px;
        color: #777;
      }

      .stamp-signature {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        font-size: 16px;
        border-top: 2px solid #333;
        padding-top: 10px;
      }

      .stamp-signature div {
        width: 48%;
        height: 80px; /* Added height to give space for stamp/signature */
        border: 1px solid #333;
        text-align: center;
        line-height: 70px; /* Center text vertically */
        font-weight: 600;
        color: #4f4f4f;
      }

      .btn {
        background-color: #6c63ff;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
        border: none;
        margin-top: 20px;
      }

      .btn:hover {
        background-color: #5a52e0;
      }

      @media print {
        body {
          background-color: #ffffff;
          padding: 0;
        }

        .receipt-container {
          border: none;
          box-shadow: none;
        }

        .no-print {
          display: none;
        }

        .header div {
          font-size: 16px;
        }

        .receipt-title {
          font-size: 22px;
        }

        .payment-table th,
        .payment-table td {
          padding: 10px;
          font-size: 14px;
        }

        .summary-row {
          font-size: 16px;
        }

        .footer {
          font-size: 12px;
        }

        .stamp-signature {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
        }

        .stamp-signature div {
          width: 48%;
          height: 80px; /* Ensure height is consistent */
          border: 1px solid #333;
          text-align: center;
          line-height: 70px; /* Center text vertically */
          font-weight: 600;
          color: #4f4f4f;
        }

        .btn {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="receipt-container">
      <div class="header">
        <img class="logo" src="${paymentData.companyLogo}" alt="Logo" />
        <div>
          <h3 class="receipt-title">COLLEGE OF INTERNATIONAL SKILL DEVELOPMENT</h3>
        </div>
      </div>

      <div class="receipt-details">
        <div class="detail-row">
          <div class="detail-label"><strong>Account Title:</strong></div>
          <div>COLLEGE OF INTERNATIONAL SKILL DEVELOPMENT</div>
        </div>
        <div class="detail-row">
          <div class="detail-label"><strong>IBAN Number:</strong></div>
          <div>PK65JSBL9557000001946835</div>
        </div>
      </div>
      <table class="payment-table">
          <thead>
          <tr>
           <th>Application No.</th>
            <th>Name</th>
            <th>CNIC/Passport No.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CISD${application._id.slice(-9)}</td>

            <td>${application.fullName}</td>
            <td>${application.passportNumber}</td>
          </tr>
        </tbody>
      </table>
      <table class="payment-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${convertToPST(latestPayment.date)}</td>
            <td>${latestPayment.amount}PKR</td>
            <td>${latestPayment.method}</td>
          </tr>
        </tbody>
      </table>

      <div class="summary-row">
        <div><strong>Total Paid:</strong> ${totalPaid}PKR</div>
        <div><strong>Remaining:</strong> ${remainingAmount}PKR</div>
      </div>

      <!-- Stamp and Signature Boxes -->
      <div class="stamp-signature">
        <div>Stamp</div>
        <div>Signature</div>
      </div>

   
    </div>
  </body>
</html>
`);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  function convertToPST(date) {
    const pstOffset = 5 * 60 * 60 * 1000; // Pakistan is UTC +5
    const dateObj = new Date(date);
    const pstDate = new Date(dateObj.getTime() + pstOffset);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return pstDate.toLocaleString("en-GB", options);
  }
  const handleDownloadReceipt = () => {
    // Ensure there are payments in the array
    if (paymentData.payments.length === 0) {
      alert("No payment records available for download.");
      return;
    }

    // Headers for the exported Excel file
    const headers = [
      "Full Name",
      "Application ID",
      "Payment Date",
      "Amount",
      "Description",
      "Method",
    ];

    // Map over all payments and create rows for the Excel sheet
    const rows = paymentData.payments.map((payment) => ({
      "Full Name": application.fullName, // Assuming this comes from the application object
      "Application ID": applicationId,
      "Payment Date": payment.date,
      Amount: payment.amount,
      Description: payment.description,
      Method: payment.method,
    }));

    // Create a worksheet from the rows
    const ws = utils.json_to_sheet(rows, { header: headers });
    const wb = utils.book_new();

    // Append the worksheet to the workbook
    utils.book_append_sheet(wb, ws, "Payment Receipts");

    // Write the file to the user's browser as an Excel file
    writeFile(wb, "payment_receipt_all.xlsx");
  };

  return (
    <div className="payment-tracker">
      <div className="payment-header">
        <h3>
          <i className="fas fa-money-bill-wave"></i> Payment Tracker
        </h3>
        <div className="header-actions">
          <button
            className="btn primary"
            onClick={() => setShowPaymentModal(true)}
          >
            <i className="fas fa-plus"></i> Add Payment
          </button>
          <button
            className="btn secondary"
            onClick={handlePrint}
            disabled={paymentData.payments.length === 0}
          >
            <i className="fas fa-print"></i> Print Receipt
          </button>
          <button
            className="btn secondary"
            onClick={handleDownloadReceipt}
            disabled={paymentData.payments.length === 0}
          >
            <i className="fas fa-download"></i> Download Receipt
          </button>
        </div>
      </div>

      <div className="payment-summary">
        <div className="payment-total">
          <label>Total Amount ({paymentData.currency}):</label>
          <input
            type="number"
            value={paymentData.totalAmount || ""}
            onChange={(e) =>
              setPaymentData((prev) => ({
                ...prev,
                totalAmount: e.target.value,
              }))
            }
            placeholder="Enter total amount"
          />
        </div>

        <div className="payment-stats">
          <div className="stat-box paid">
            <span className="stat-label">Paid</span>
            <span className="stat-amount">
              {paymentData.currency} {totalPaid.toLocaleString()}
            </span>
          </div>

          <div className="stat-box remaining">
            <span className="stat-label">Remaining</span>
            <span className="stat-amount">
              {paymentData.currency} {remainingAmount.toLocaleString()}
            </span>
          </div>

          <div className="stat-box progress">
            <span className="stat-label">Progress</span>
            <span className="stat-amount">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
      </div>

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
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Amount ({paymentData.currency}):</label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                  placeholder="Enter amount"
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  value={newPayment.description}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      description: e.target.value,
                    })
                  }
                  placeholder="Payment description"
                />
              </div>

              <div className="form-group">
                <label>Payment Method:</label>
                <select
                  value={newPayment.method}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, method: e.target.value })
                  }
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
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

      {/* Display payments in rows */}
      <div className="payment-history">
        <h4>Payment History</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>{payment.amount}</td>
                <td>{payment.description}</td>
                <td>{payment.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTracker;
