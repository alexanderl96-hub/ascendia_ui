import { useEffect, useRef } from "react";

export default function AccountTypeModal({ open, onClose, onPick, setRoles }) {
  const popoverRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Close when clicking outside popover
  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e) => {
      if (!popoverRef.current) return;
      if (!popoverRef.current.contains(e.target)) onClose();
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="false"
      aria-label="Choose account type"
      className="acct-popover"
    >
      <div className="acct-popover__header">
        <div className="acct-popover__title">Create your account</div>
        <button
          type="button"
          className="acct-popover__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="acct-popover__grid">
        <button
          type="button"
          className="acct-popover__card"
          onClick={() => {onPick("DEVELOPER"); setRoles("DEVELOPER")}}
        >
          <div className="acct-popover__card-title">Developer</div>
          <div className="acct-popover__card-text">
            Use API keys, docs, and webhooks to build on Ascendia.
          </div>
          <div className="acct-popover__card-cta">Continue →</div>
        </button>

        <button
          type="button"
          className="acct-popover__card"
          onClick={() => {onPick("TRADING"); setRoles("TRADING")}}
        >
          <div className="acct-popover__card-title">Trading</div>
          <div className="acct-popover__card-text">
            Invest using the platform and automate strategies.
          </div>
          <div className="acct-popover__card-cta">Continue →</div>
        </button>
      </div>
    </div>
  );
}
