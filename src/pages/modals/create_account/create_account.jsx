

// import { useEffect, useRef, useState } from "react";
// import "./signup-modal.css";

// export default function SignupModal({
//   open,
//   onClose,
//   onBackHome,
//   onGoogle,
//   onSignIn,
//   onSubmit,
//   loading = false,
//   rolesType,
//   error = "",
// }) {
//   const cardRef = useRef(null);
//   const [openRoles, setOpenRoles] = useState(false)

//   const [form, setForm] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     phone: "",              // ✅ added
//     password: "",
//     confirmPassword: "",
//     roles: rolesType,
//     agree: false,
//   });

//   // ESC + click outside
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
//     setForm((p) => ({
//       ...p,
//       [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
//     }));

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log({
//       fullName: form.fullName.trim(),
//       username: form.username.trim(),
//       email: form.email.trim(),
//       phone: form.phone.trim(),
//       password: form.password,
//       roles: form.roles,
//       agree: form.agree,
//     })

//     if(form.roles !== "" ){

//       // ✅ send the full payload including phone
//       onSubmit?.({
//         fullName: form.fullName.trim(),
//         username: form.username.trim(),
//         email: form.email.trim(),
//         phone: form.phone.trim(),
//         password: form.password,
//       //   confirmPassword: form.confirmPassword,
//         roles: form.roles,
//         agree: form.agree === "agree" ? true : false,
//       });

//     }else{
//       setOpenRoles(true);
//     }


//   };

//   const pwdMismatch =
//     form.password && form.confirmPassword && form.password !== form.confirmPassword;

//   // (optional) basic phone presence validation (you can make it stricter later)
//   const phoneOk = form.phone.trim().length >= 7;

//   const canSubmit =
//     form.fullName.trim().length > 0 &&
//     form.username.trim().length > 0 &&
//     form.email.trim().length > 0 &&
//     phoneOk &&                         // ✅ added
//     form.password.length >= 8 &&
//     !pwdMismatch &&
//     form.agree;

//   return (
//     <div className="sm__overlay" role="dialog" aria-modal="true" aria-label="Sign up">
//       <div className="sm__bg" />

//       <div className="sm__topbar">
//         <button type="button" className="sm__back" onClick={onBackHome}>
//           <span className="sm__backArrow">←</span> Back to home
//         </button>
//       </div>

//       <div className="sm__wrap">
//         <div className="sm__card" ref={cardRef}>
//           <div className="sm__logo">
//             <div className="sm__logoMark">
//               <span className="sm__logoStroke" />
//             </div>
//           </div>

//           <h2 className="sm__title">
//             Join <span className="sm__titleAccent">Ascendia</span>
//           </h2>
//           <p className="sm__subtitle">Start your automated trading journey</p>

//           <button type="button" className="sm__googleBtn" onClick={onGoogle}>
//             <span className="sm__gIcon">G</span>
//             Continue with Google
//           </button>

//           <div className="sm__divider">
//             <span className="sm__dividerLine" />
//             <span className="sm__dividerText">Or continue with email</span>
//             <span className="sm__dividerLine" />
//           </div>

//           <form onSubmit={handleSubmit} className="sm__form">
//             <label className="sm__label">Full Name</label>
//             <div className="sm__inputWrap">
//               <span className="sm__icon" aria-hidden="true">👤</span>
//               <input
//                 className="sm__input"
//                 type="text"
//                 placeholder="John Doe"
//                 value={form.fullName}
//                 onChange={setField("fullName")}
//                 autoComplete="name"
//                 required
//               />
//             </div>

//             <label className="sm__label">Username</label>
//             <div className="sm__inputWrap">
//               <span className="sm__icon" aria-hidden="true">@</span>
//               <input
//                 className="sm__input"
//                 type="text"
//                 placeholder="john.doe"
//                 value={form.username}
//                 onChange={setField("username")}
//                 autoComplete="username"
//                 required
//               />
//             </div>

//             <label className="sm__label sm__labelTop">Email</label>
//             <div className="sm__inputWrap">
//               <span className="sm__icon" aria-hidden="true">✉</span>
//               <input
//                 className="sm__input"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={form.email}
//                 onChange={setField("email")}
//                 autoComplete="email"
//                 required
//               />
//             </div>

//             {/* ✅ Phone */}
//             <label className="sm__label sm__labelTop">Phone Number</label>
//             <div className="sm__inputWrap">
//               <span className="sm__icon" aria-hidden="true">📞</span>
//               <input
//                 className="sm__input"
//                 type="tel"
//                 name="phone"                 // ✅ IMPORTANT
//                 placeholder="(555) 123-4567"
//                 value={form.phone}
//                 onChange={setField("phone")}
//                 autoComplete="tel"
//                 inputMode="tel"
//                 required
//               />
//             </div>
//             {!phoneOk && form.phone.length > 0 ? (
//               <div className="sm__hint">Please enter a valid phone number.</div>
//             ) : null}

//             <label className="sm__label sm__labelTop">Password</label>
//             <div className="sm__inputWrap">
//               <span className="sm__icon" aria-hidden="true">🔒</span>
//               <input
//                 className="sm__input"
//                 type="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={setField("password")}
//                 autoComplete="new-password"
//                 required
//               />
//             </div>
//             <div className="sm__hint">Minimum 8 characters</div>

//             <label className="sm__label sm__labelTop">Confirm Password</label>
//             <div className="sm__inputWrap">
//               <span className="sm__icon" aria-hidden="true">🔒</span>
//               <input
//                 className="sm__input"
//                 type="password"
//                 placeholder="••••••••"
//                 value={form.confirmPassword}
//                 onChange={setField("confirmPassword")}
//                 autoComplete="new-password"
//                 required
//               />
//             </div>

//                 {pwdMismatch ? <div className="sm__error">Passwords do not match.</div> : null}
//                 {error ? <div className="sm__error">{error}</div> : null}


//             <label className="sm__agree">
//               <input
//                 type="checkbox"
//                 checked={form.agree}
//                 onChange={setField("agree")}
//               />
//               <span>
//                 I agree to the{" "}
//                 <button type="button" className="sm__linkInline">
//                   Terms of Service
//                 </button>{" "}
//                 and{" "}
//                 <button type="button" className="sm__linkInline">
//                   Privacy Policy
//                 </button>
//               </span>
//             </label>

//             {/* ✅ Popover shows ABOVE button */}
//             <AccountTypeModal
//               open={openType}
//               setRoles={setRoles}
//               onClose={() => setOpenType(false)}
//               onPick={handlePick}
//             />

//             <button type="submit" className="sm__submit" disabled={!canSubmit || loading}>
//               {loading ? "Creating..." : "Create Account"}
//             </button>
//           </form>

//           <div className="sm__bottom">
//             <span className="sm__muted">Already have an account?</span>{" "}
//             <button type="button" className="sm__link" onClick={onSignIn}>
//               Sign in
//             </button>
//           </div>
//         </div>

//         <div className="sm__footerNote">
//           Start with a 14-day free trial • No credit card required
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AccountTypeModal from "../modal_account_type/account_type_modal";
import "./signup-modal.css";

export default function SignupModal({
  open,
  onClose,
  onBackHome,
  onGoogle,
  onSignIn,
  onSubmit,
  loading = false,
  rolesType,
  error = "",
  setRoles
}) {
  // const cardRef = useRef(null);
  // const navigate = useNavigate();
  // const location = useLocation();


  // // ✅ role picker open state
  // const [openRoles, setOpenRoles] = useState(false);

  // const [form, setForm] = useState({
  //   fullName: "",
  //   username: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   confirmPassword: "",
  //   roles: rolesType || "", // ✅ init from prop (fallback "")
  //   agree: false,           // ✅ boolean
  // });

  // // ✅ Keep roles in sync when rolesType changes (switch login -> signup, etc.)
  // useEffect(() => {
  //   if (!open) return;
  //   setForm((p) => ({ ...p, roles: rolesType || "" }));
  // }, [rolesType, open]);

  // // ✅ If signup opens and role isn't set, open role picker
  // useEffect(() => {
  //   if (!open) return;
  //   if (!rolesType) setOpenRoles(true);
  // }, [open, rolesType]);

  // // ESC + click outside
  // useEffect(() => {
  //   if (!open) return;

  //   const onKeyDown = (e) => {
  //     if (e.key === "Escape") onClose?.();
  //   };

  //   const onMouseDown = (e) => {
  //     if (!cardRef.current) return;
  //     if (!cardRef.current.contains(e.target)) onClose?.();
  //   };

  //   window.addEventListener("keydown", onKeyDown);
  //   document.addEventListener("mousedown", onMouseDown);
  //   return () => {
  //     window.removeEventListener("keydown", onKeyDown);
  //     document.removeEventListener("mousedown", onMouseDown);
  //   };
  // }, [open, onClose]);

  // useEffect(() => {
  //   if (!open) return;

  //   const h = (location.hash || "").replace("#", "").toLowerCase();

  //   const roleFromHash =
  //     h === "developer" ? "DEVELOPER"
  //     : h === "trading" ? "TRADING"
  //     : "";

  //   if (roleFromHash) {
  //     setForm((p) => ({ ...p, roles: roleFromHash }));
  //     setOpenRoles(false);
  //   }
  // }, [open, location.hash]);


  // const setHash = (hash) => {
  //   // navigate(
  //   //   { pathname: location.pathname, search: location.search, hash}, // hash WITHOUT '#'
  //   //   { replace: true } // don't spam browser history
  //   // );
  //    navigate(`/auth?next=/register${hash ? `#${hash}` : ""}`, { replace: true });
  // };

  // const roleFromHash = (hash) => {
  //   const h = (hash || "").replace("#", "").toLowerCase();
  //   if (h === "developer") return "DEVELOPER";
  //   if (h === "trading") return "TRADING";
  //   return "";
  // };


  // if (!open) return null;

  // const setField = (k) => (e) =>
  //   setForm((p) => ({
  //     ...p,
  //     [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
  //   }));

  // // const handlePickRole = (pickedRole) => {
  // //   setForm((p) => ({ ...p, roles: pickedRole }));
  // //   setOpenRoles(false);
  // // };
  // const handlePickRole = (pickedRole) => {
  //   setForm((p) => ({ ...p, roles: pickedRole }));
  //   setOpenRoles(false);
  //   setRoles?.(pickedRole);

  //   const hash =
  //     pickedRole === "DEVELOPER" ? "developer"
  //     : pickedRole === "TRADING" ? "trading"
  //     : "";

  //   setHash(hash);
  // };


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // ✅ enforce role selection
  //   if (!form.roles) {
  //     setOpenRoles(true);
  //     return;
  //   }

  //   // ✅ optional debug
  //   console.log({
  //     fullName: form.fullName.trim(),
  //     username: form.username.trim(),
  //     email: form.email.trim(),
  //     phone: form.phone.trim(),
  //     password: form.password,
  //     roles: form.roles,
  //     agree: form.agree,
  //   });

  //   onSubmit?.({
  //     fullName: form.fullName.trim(),
  //     username: form.username.trim(),
  //     email: form.email.trim(),
  //     phone: form.phone.trim(),
  //     password: form.password,
  //     roles: form.roles,
  //     agree: !!form.agree, // ✅ boolean
  //   });
  // };

  // const pwdMismatch =
  //   form.password && form.confirmPassword && form.password !== form.confirmPassword;

  // const phoneOk = form.phone.trim().length >= 7;

  // const canSubmit =
  //   form.fullName.trim().length > 0 &&
  //   form.username.trim().length > 0 &&
  //   form.email.trim().length > 0 &&
  //   phoneOk &&
  //   form.password.length >= 8 &&
  //   !pwdMismatch &&
  //   form.agree &&
  //   !!form.roles; // ✅ must have role too


   const cardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ role picker open state
  const [openRoles, setOpenRoles] = useState(false);

  // ✅ hash -> role
  const roleFromHash = (hash) => {
    const h = (hash || "").replace("#", "").toLowerCase();
    if (h === "developer") return "DEVELOPER";
    if (h === "trading") return "TRADING";
    return "";
  };

  // ✅ role -> hash
  const hashFromRole = (role) => {
    if (role === "DEVELOPER") return "developer";
    if (role === "TRADING") return "trading";
    return "";
  };

  // ✅ force URL to always be /auth?next=/register + optional hash
  const setHash = (hash) => {
    navigate(`/auth?next=/register${hash ? `#${hash}` : ""}`, { replace: true });
  };

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    roles: "", // ✅ resolved on open from rolesType OR hash
    agree: false,
  });

  /**
   * ✅ SINGLE source-of-truth sync (runs when modal opens)
   * - If rolesType exists (coming from home page), use it AND write hash immediately
   * - Else, if hash exists, use it
   * - Else open role picker
   */
  useEffect(() => {
    if (!open) return;

    const hashRole = roleFromHash(location.hash);
    const resolvedRole = rolesType || hashRole || "";
    const desiredHash = hashFromRole(resolvedRole);

    // keep state in sync
    setForm((p) => ({ ...p, roles: resolvedRole }));
    setRoles?.(resolvedRole);

    // open picker if no role at all
    setOpenRoles(!resolvedRole);

    // ✅ ensure URL shows hash immediately when landing on the modal
    const currentHash = (location.hash || "").replace("#", "");
    if (desiredHash && currentHash !== desiredHash) {
      setHash(desiredHash);
    }

    // Optional: if you want to clear hash when no role
    // if (!desiredHash && currentHash) setHash("");
  }, [open, rolesType, location.hash]); // eslint-disable-line react-hooks/exhaustive-deps

  // ESC + click outside
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

  const handlePickRole = (pickedRole) => {
    setForm((p) => ({ ...p, roles: pickedRole }));
    setOpenRoles(false);
    setRoles?.(pickedRole);

    const hash = hashFromRole(pickedRole);
    setHash(hash);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ enforce role selection
    if (!form.roles) {
      setOpenRoles(true);
      return;
    }

    onSubmit?.({
      fullName: form.fullName.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      roles: form.roles,
      agree: !!form.agree,
    });
  };

  const pwdMismatch =
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword;

  const phoneOk = form.phone.trim().length >= 7;

  const canSubmit =
    form.fullName.trim().length > 0 &&
    form.username.trim().length > 0 &&
    form.email.trim().length > 0 &&
    phoneOk &&
    form.password.length >= 8 &&
    !pwdMismatch &&
    form.agree &&
    !!form.roles;


  return (
    <div className="sm__overlay" role="dialog" aria-modal="true" aria-label="Sign up">
      <div className="sm__bg" />

      <div className="sm__topbar">
        <button type="button" className="sm__back" onClick={onBackHome}>
          <span className="sm__backArrow">←</span> Back to home
        </button>
      </div>

      <div className="sm__wrap">
        <div className="sm__card" ref={cardRef}>
          <div className="sm__logo">
            <div className="sm__logoMark">
              <span className="sm__logoStroke" />
            </div>
          </div>

          <h2 className="sm__title">
            Join <span className="sm__titleAccent">Ascendia</span>
          </h2>
          <p className="sm__subtitle">Start your automated trading journey</p>

          <button type="button" className="sm__googleBtn" onClick={onGoogle}>
            <span className="sm__gIcon">G</span>
            Continue with Google
          </button>

          <div className="sm__rolesAnchor">
            <AccountTypeModal
              open={openRoles}
              onClose={() => setOpenRoles(false)}
              onPick={handlePickRole}
              setRoles={setRoles}
            />
          </div>

          <div className="sm__divider">
            <span className="sm__dividerLine" />
            <span className="sm__dividerText">Or continue with email</span>
            <span className="sm__dividerLine" />
          </div>

          <form onSubmit={handleSubmit} className="sm__form">
            <label className="sm__label">Full Name</label>
            <div className="sm__inputWrap">
              <span className="sm__icon" aria-hidden="true">👤</span>
              <input
                className="sm__input"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={setField("fullName")}
                autoComplete="name"
                required
              />
            </div>

            <label className="sm__label">Username</label>
            <div className="sm__inputWrap">
              <span className="sm__icon" aria-hidden="true">@</span>
              <input
                className="sm__input"
                type="text"
                placeholder="john.doe"
                value={form.username}
                onChange={setField("username")}
                autoComplete="username"
                required
              />
            </div>

            <label className="sm__label sm__labelTop">Email</label>
            <div className="sm__inputWrap">
              <span className="sm__icon" aria-hidden="true">✉</span>
              <input
                className="sm__input"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={setField("email")}
                autoComplete="email"
                required
              />
            </div>

            <label className="sm__label sm__labelTop">Phone Number</label>
            <div className="sm__inputWrap">
              <span className="sm__icon" aria-hidden="true">📞</span>
              <input
                className="sm__input"
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={setField("phone")}
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>
            {!phoneOk && form.phone.length > 0 ? (
              <div className="sm__hint">Please enter a valid phone number.</div>
            ) : null}

            <label className="sm__label sm__labelTop">Password</label>
            <div className="sm__inputWrap">
              <span className="sm__icon" aria-hidden="true">🔒</span>
              <input
                className="sm__input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={setField("password")}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="sm__hint">Minimum 8 characters</div>

            <label className="sm__label sm__labelTop">Confirm Password</label>
            <div className="sm__inputWrap">
              <span className="sm__icon" aria-hidden="true">🔒</span>
              <input
                className="sm__input"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={setField("confirmPassword")}
                autoComplete="new-password"
                required
              />
            </div>

            {pwdMismatch ? <div className="sm__error">Passwords do not match.</div> : null}
            {error ? <div className="sm__error">{error}</div> : null}

            <label className="sm__agree">
              <input type="checkbox" checked={form.agree} onChange={setField("agree")} />
              <span>
                I agree to the{" "}
                <button type="button" className="sm__linkInline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="sm__linkInline">
                  Privacy Policy
                </button>
              </span>
            </label>

            <button type="submit" className="sm__submit" disabled={!canSubmit || loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="sm__bottom">
            <span className="sm__muted">Already have an account?</span>{" "}
            <button type="button" className="sm__link" onClick={onSignIn}>
              Sign in
            </button>
          </div>
        </div>

        <div className="sm__footerNote">
          Start with a 14-day free trial • No credit card required
        </div>
      </div>
    </div>
  );
}

