import { Minus, Plus } from "lucide-react";

export default function QuantityControl({ quantity, onChange, name }) {
  return (
    <div className="quantity-control">
      <button
        aria-label={`Decrease quantity of ${name}`}
        disabled={quantity <= 1}
        onClick={() => onChange(quantity - 1)}
      >
        <Minus size={16} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        aria-label={`Increase quantity of ${name}`}
        disabled={quantity >= 99}
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
