import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cartItems }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        {
          method: "POST",
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vbmE0QGdtYWlsLmNvbSIsInVzZXJJZCI6IjcyMzBkMmMyLTU0ZjEtNDZhNS04ZTQ4LWQ2YjQ3ZGEyN2M4NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3NDQ5Njc2fQ.SZlMq8VYrBkWDAGQF2FeWagqpMJ4QohLtFgm5_hon3w",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activities: cartItems.map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
            paymentMethodId: selectedPaymentMethod.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create transaction!");
      }

      const data = await response.json();
      alert("Transaction successful!");
      navigate("/transactions"); // Arahkan ke halaman transaksi
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {/* Payment Method Selection */}
      <PaymentMethod onSelect={setSelectedPaymentMethod} />
      <button
        className="px-6 py-3 mt-4 text-white bg-green-500 rounded-lg"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};
