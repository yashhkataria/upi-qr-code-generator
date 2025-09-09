import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("UPI QR Generator", () => {
  test("renders title and input fields", () => {
    render(<App />);

    expect(screen.getByText(/UPI QR Generator/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter UPI ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Amount/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Generate QR/i })).toBeInTheDocument();
  });

  test("shows alert if fields are empty", () => {
    window.alert = jest.fn();
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Generate QR/i }));

    expect(window.alert).toHaveBeenCalledWith("Please enter both UPI ID and Amount");
  });

  test("generates QR code when valid inputs are given", () => {
    render(<App />);

    const upiInput = screen.getByPlaceholderText(/Enter UPI ID/i);
    const amountInput = screen.getByPlaceholderText(/Enter Amount/i);
    const generateButton = screen.getByRole("button", { name: /Generate QR/i });

    fireEvent.change(upiInput, { target: { value: "username@bankname" } });
    fireEvent.change(amountInput, { target: { value: "250" } });
    fireEvent.click(generateButton);

    // Check if QR code rendered (by testid since QRCode renders as svg)
    const qrCode = screen.getByTestId("qr-code");
    expect(qrCode).toBeInTheDocument();
  });
});
