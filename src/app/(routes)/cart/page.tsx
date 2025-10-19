"use client";
import { useCart } from "@/store/useCart";

export default function CartPage() {
  const { items, subtotal, tax, total, updateQuantity, removeItem, clearCart } =
    useCart();

  if (items.length === 0)
    return <p className="p-8 text-center">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4 border-b pb-2"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
              className="border w-16 text-center rounded"
            />
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-right space-y-1">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST (5%): ₹{tax.toFixed(2)}</p>
        <p className="font-bold text-lg">Total: ₹{total.toFixed(2)}</p>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button onClick={clearCart} className="bg-gray-200 px-4 py-2 rounded">
          Clear Cart
        </button>
        <button
          onClick={() => alert("Proceeding to order...")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
