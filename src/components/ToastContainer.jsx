import { useShop } from '../context/ShopContext';

export default function ToastContainer() {
  const { toasts } = useShop();

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span className="toast-icon">{toast.type === 'success' ? '✅' : '💔'}</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
