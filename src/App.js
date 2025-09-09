import React, { useState } from "react";
import QRCode from "react-qr-code";
import "./App.css";

export default function App() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [upiUrl, setUpiUrl] = useState("");

  const generateQr = () => {
    if (!upiId || !amount) {
      alert("Please enter both UPI ID and Amount");
      return;
    }

    if( upiId.indexOf('@') === -1 ) {
      alert("Please enter a valid UPI ID");
      return;
    }

    const url = `upi://pay?pa=${encodeURIComponent(
      upiId
    )}&pn=Merchant&am=${amount}&cu=INR`;
    setUpiUrl(url);
  };

  return (
    <div className="container">
      <h1>✨ UPI QR Generator</h1>

      <input
        type="text"
        placeholder="Enter UPI ID (e.g., username@bankname)"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Amount (e.g., 250)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={generateQr}>Generate QR</button>

      {upiUrl && (
        <div className="qr-box">
          <QRCode value={upiUrl} size={200} data-testid="qr-code" />
          <p>Scan with any UPI App to pay</p>
        </div>
      )}
    </div>
  );
}
