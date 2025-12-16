// import { useEffect, useRef, useState } from "react";
// import { Link, useNavigate, NavLink } from "react-router-dom";
// import "./login-modal.css";

// export default function LoginModal({
//   open,
//   onClose,
//   onBackHome,
//   onGoogle,
//   onForgotPassword,
//   onSignup,
//   onSubmit,
//   loading = false,
//   error = "",
// }) {
//   const cardRef = useRef(null);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     remember: true,
//   });


//   // Close on ESC + click outside
//   useEffect(() => {
//     if (!open) return;

//     const onKeyDown = (e) => {
//       if (e.key === "Escape") onClose?.();
//     };

//     const onMouseDown = (e) => {
//       if (!cardRef.current) return;
//       if (!cardRef.current.contains(e.target)) onClose?.();
//     };

//     window.addEventListener("keydown", onKeyDown);
//     document.addEventListener("mousedown", onMouseDown);
//     return () => {
//       window.removeEventListener("keydown", onKeyDown);
//       document.removeEventListener("mousedown", onMouseDown);
//     };
//   }, [open, onClose]);

//   if (!open) return null;

//   const setField = (k) => (e) =>
//     setForm((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   onSubmit?.(form);
//   // };

//     const handleSubmit = (e) => {
//     e.preventDefault();

//     // ✅ Backend expects "username". You collect email in the UI, so map it.
//     onSubmit?.({
//       username: form.email.trim(),
//       password: form.password,
//       remember: form.remember,
//     });
//   };


//   return (
//     <div className="lm__overlay" role="dialog" aria-modal="true" aria-label="Login">
//       <div className="lm__bg" />

//       <div className="lm__topbar">
//         <button type="button" className="lm__back" onClick={onBackHome}>
//           <span className="lm__backArrow">←</span> Back to home
//         </button>
//       </div>

//       <div className="lm__wrap">
//         <div className="lm__card" ref={cardRef}>
//           <div className="lm__logo">
//             <div className="lm__logoMark">
//               <span className="lm__logoStroke" />
//             </div>
//           </div>

//           <h2 className="lm__title">
//             Welcome <span className="lm__titleAccent">Back</span>
//           </h2>
//           <p className="lm__subtitle">Sign in to continue your trading journey</p>

//           <button type="button" className="lm__googleBtn" onClick={onGoogle}>
//             <span className="lm__gIcon">G</span>
//             Continue with Google
//           </button>

//           <div className="lm__divider">
//             <span className="lm__dividerLine" />
//             <span className="lm__dividerText">Or continue with email</span>
//             <span className="lm__dividerLine" />
//           </div>

//           <form onSubmit={handleSubmit} className="lm__form">
//             <label className="lm__label">Email</label>
//             <div className="lm__inputWrap">
//               <span className="lm__icon" aria-hidden="true">✉</span>
//               <input
//                 className="lm__input"
//                 type="email"
//                 name=""
//                 placeholder="your@email.com"
//                 value={form.email}
//                 onChange={setField("email")}
//                 autoComplete="email"
//                 required
//               />
//             </div>

//             <label className="lm__label lm__labelTop">Password</label>
//             <div className="lm__inputWrap">
//               <span className="lm__icon" aria-hidden="true">🔒</span>
//               <input
//                 className="lm__input"
//                 type="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={setField("password")}
//                 autoComplete="current-password"
//                 required
//               />
//             </div>

//             <div className="lm__row">
//               <label className="lm__remember">
//                 <input
//                   type="checkbox"
//                   checked={form.remember}
//                   onChange={setField("remember")}
//                 />
//                 <span>Remember me</span>
//               </label>

//               <button
//                 type="button"
//                 className="lm__link"
//                 onClick={onForgotPassword}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {error ? <div className="lm__error">{error}</div> : null}

//             <button type="submit" className="lm__submit" disabled={loading}>
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           <div className="lm__bottom">
//             <span className="lm__muted">Don&apos;t have an account?</span>{" "}

//             <button type="button" className="lm__link lm__linkStrong" onClick={onSignup}>
//               Sign up
//             </button>
//           </div>
//         </div>

//         <div className="lm__security">
//           <div className="lm__securityTitle">Protected by industry-standard encryption</div>
//           <div className="lm__securityRow">
//             <span className="lm__pill">🔒 SSL Secure</span>
//             <span className="lm__dot">•</span>
//             <span className="lm__pill">256-bit Encryption</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import "./login-modal.css";

export default function LoginModal({
  open,
  onClose,
  onBackHome,
  onGoogle,
  onForgotPassword,
  onSignup,
  onSubmit,
  loading = false,
  error = "",
}) {
  const cardRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  // Close on ESC + click outside
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    const onMouseDown = (e) => {
      if (!cardRef.current) return;
      if (!cardRef.current.contains(e.target)) onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const setField = (k) => (e) =>
    setForm((p) => ({
      ...p,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Backend expects "username". You collect email in the UI, so map it.
    onSubmit?.({
      // username: form.email.trim(),
      username: form.username.trim(),
      password: form.password,
      remember: form.remember,
    });
  };

  return (
    <div className="lm__overlay" role="dialog" aria-modal="true" aria-label="Login">
      <div className="lm__bg" />

      <div className="lm__topbar">
        <button type="button" className="lm__back" onClick={onBackHome}>
          <span className="lm__backArrow">←</span> Back to home
        </button>
      </div>

      <div className="lm__wrap">
        <div className="lm__card" ref={cardRef}>
          <div className="lm__logo">
            <div className="lm__logoMark">
              <span className="lm__logoStroke" />
            </div>
          </div>

          <h2 className="lm__title">
            Welcome <span className="lm__titleAccent">Back</span>
          </h2>
          <p className="lm__subtitle">Sign in to continue your trading journey</p>

          <button type="button" className="lm__googleBtn" onClick={onGoogle}>
            <span className="lm__gIcon">G</span>
            Continue with Google
          </button>

          <div className="lm__divider">
            <span className="lm__dividerLine" />
            <span className="lm__dividerText">Or continue with email</span>
            <span className="lm__dividerLine" />
          </div>

          <form onSubmit={handleSubmit} className="lm__form">

            <label className="lm__label">Username</label>
            <div className="lm__inputWrap">
              <span className="lm__icon" aria-hidden="true">✉</span>
              <input
                className="lm__input"
                type="text"
                placeholder="username"
                value={form.username}
                onChange={setField("username")}
                autoComplete="username"
                required
              />
            </div>

            <label className="lm__label lm__labelTop">Password</label>
            <div className="lm__inputWrap">
              <span className="lm__icon" aria-hidden="true">🔒</span>
              <input
                className="lm__input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={setField("password")}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="lm__row">
              <label className="lm__remember">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={setField("remember")}
                />
                <span>Remember me</span>
              </label>

              <button type="button" className="lm__link" onClick={onForgotPassword}>
                Forgot password?
              </button>
            </div>

            {error ? <div className="lm__error">{error}</div> : null}

            <button type="submit" className="lm__submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="lm__bottom">
            <span className="lm__muted">Don&apos;t have an account?</span>{" "}
            <button type="button" className="lm__link lm__linkStrong" onClick={onSignup}>
              Sign up
            </button>
          </div>
        </div>

        <div className="lm__security">
          <div className="lm__securityTitle">Protected by industry-standard encryption</div>
          <div className="lm__securityRow">
            <span className="lm__pill">🔒 SSL Secure</span>
            <span className="lm__dot">•</span>
            <span className="lm__pill">256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
