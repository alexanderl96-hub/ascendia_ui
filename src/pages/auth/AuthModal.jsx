import React, { useState, useId } from "react";
import "./auth-modal.css";
import LoginModal from "../modals/login_user/loginModal";
import SignupModal from "../modals/create_account/create_account";

/**
 * AuthModal
 * - Tabs: Login | Create account
 * - Props:
 *   - open: boolean
 *   - onClose: () => void
 *   - onLogin: ({username, password, remember}) => Promise|void
 *   - onSignup: ({username, fullName, email, phone, password}) => Promise|void
 */

// export default function AuthModal({   open,
//   onClose,
//   onLogin,
//   onSignup,
//   tab = "login",
//   onTabChange = () => {},
//   loading = false,
//   error = ""}) {
//   // const [tab, setTab] = useState("login"); // 'login' | 'signup'
//   const usernameId = useId();
//   const passwordId = useId();
//   const fullNameId = useId();
//   const emailId = useId();
//   const phoneId = useId();

//   if (!open) return null;

//   const stop = (e) => e.stopPropagation();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     const payload = {
//       username: (fd.get("username") || "").toString().trim(),
//       password: (fd.get("password") || "").toString(),
//       remember: fd.get("remember") === "on",
//     };
//     await onLogin?.(payload);
//   };


//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     const payload = {
//       fullName: (fd.get("fullName") || "").toString().trim(),
//       username: (fd.get("username") || "").toString().trim(),
//       email: (fd.get("email") || "").toString().trim(),
//       phone: (fd.get("phone") || "").toString().trim(),
//       password: (fd.get("password") || "").toString(),
//     };
//     if (onSignup) await onSignup(payload);
//   };

//   console.log(tab === "login" ? "Login in" : "signup in")
//   console.log(usernameId)

//   return (
//     <div className="am-overlay" onClick={onClose} role="dialog" aria-modal="true">
//       <div className="am-modal" onClick={stop}>
//         {/* Header / Brand */}
//         <div className="am-brand">
//           <div className="am-logo">A</div>
//           <div className="am-name">ASCENDIA</div>
//         </div>

//         {/* Tabs */}
//         <div className="am-tabs" role="tablist">
//           <button
//             role="tab"
//             aria-selected={tab === "login"}
//             className={`am-tab ${tab === "login" ? "is-active" : ""}`}
//             onClick={() => onTabChange("login")}
//             type="button"
//           >
//             Login
//           </button>
//           <button
//             role="tab"
//             aria-selected={tab === "signup"}
//             className={`am-tab ${tab === "signup" ? "is-active" : ""}`}
//             onClick={() => onTabChange("signup")}
//             type="button"
//           >
//             Create account
//           </button>
//         </div>

//         <div className="am-divider" />

//         {/* LOGIN FORM */}
//         {tab === "login" && (
//           <form className="am-form" onSubmit={handleLogin} noValidate>
//             <label className="am-field" htmlFor={usernameId}>
//               <span>Username</span>
//               <input
//                 id={usernameId}
//                 name="username"
//                 type="text"
//                 placeholder="Your username"
//                 required
//                 autoComplete="username"
//               />
//             </label>

//             <label className="am-field" htmlFor={passwordId}>
//               <span>Password</span>
//               <input
//                 id={passwordId}
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 required
//                 autoComplete="current-password"
//               />
//             </label>

//             <div className="am-row">
//               <label className="am-check">
//                 <input type="checkbox" name="remember" />
//                 <span>Remember me</span>
//               </label>

//               <a
//                 className="am-link"
//                 href="/forgot"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   // navigate to your forgot flow if you have one
//                 }}
//               >
//                 Forgot password?
//               </a>
//             </div>

//              {error ? <div className="am-error" role="alert">{error}</div> : null}
//                <button className="am-btn am-btn--primary" type="submit" disabled={loading}>
//                    {loading ? "Signing in..." : "Login"}
//                </button>
//           </form>
//         )}

//         {/* SIGNUP FORM */}
//         {tab === "signup" && (
//           <form className="am-form" onSubmit={handleSignup} noValidate>
//             <label className="am-field" htmlFor={fullNameId}>
//               <span>Full name</span>
//               <input id={fullNameId} name="fullName" type="text" placeholder="Jane Doe" required />
//             </label>

//             <label className="am-field" htmlFor={`${usernameId}-s`}>
//               <span>Username</span>
//               <input id={`${usernameId}-s`} name="username" type="text" placeholder="janedoe" required />
//             </label>

//             <label className="am-field" htmlFor={emailId}>
//               <span>Email</span>
//               <input id={emailId} name="email" type="email" placeholder="you@example.com" required />
//             </label>

//             <label className="am-field" htmlFor={phoneId}>
//               <span>Phone</span>
//               <input id={phoneId} name="phone" type="tel" placeholder="+1 (555) 555-1234" required />
//             </label>

//             <label className="am-field" htmlFor={`${passwordId}-s`}>
//               <span>Password</span>
//               <input
//                 id={`${passwordId}-s`}
//                 name="password"
//                 type="password"
//                 placeholder="Create a password"
//                 required
//                 minLength={8}
//               />
//             </label>

//            {error ? <div className="am-error" role="alert">{error}</div> : null}
//                <button className="am-btn am-btn--primary" type="submit" disabled={loading}>
//             {loading ? "Creating account..." : "Create account"}
//           </button>
//           </form>
//         )}
//       </div>
//     </div>
    
//   );
// }



export default function AuthModal({
  open,
  onClose,
  onLogin,
  onSignup,
  tab = "login",
  onTabChange = () => {},
  loading = false,
  rolesType,
  error = "",
}) {
  // const usernameId = useId();
  // const passwordId = useId();
  // const fullNameId = useId();
  // const emailId = useId();
  // const phoneId = useId();

  if (!open) return null;

  // const stop = (e) => e.stopPropagation();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const fd = new FormData(e.currentTarget);
  //   const payload = {
  //     username: (fd.get("username") || "").toString().trim(),
  //     password: (fd.get("password") || "").toString(),
  //     remember: fd.get("remember") === "on",
  //   };
  //   await onLogin?.(payload);
  // };


  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   const fd = new FormData(e.currentTarget);
  //   const payload = {
  //     fullName: (fd.get("fullName") || "").toString().trim(),
  //     username: (fd.get("username") || "").toString().trim(),
  //     email: (fd.get("email") || "").toString().trim(),
  //     phone: (fd.get("phone") || "").toString().trim(),
  //     password: (fd.get("password") || "").toString(),
  //   };
  //   if (onSignup) await onSignup(payload);
  // };


  return (
    <>
      {tab === "login" && (
        <LoginModal
          open={open}
          onClose={onClose}
          onSubmit={onLogin}                 // ✅ this triggers login API
          loading={loading}
          error={error}
          onSignup={() => onTabChange("signup")} // ✅ this switches UI + URL
        />
      )}

      {tab === "signup" && (
        <SignupModal
          open={open}
          onClose={onClose}
          onSubmit={onSignup}                // ✅ this triggers signup API
          loading={loading}
          error={error}
          onSignIn={() => onTabChange("login")}  // ✅ switch back
          rolesType={rolesType}
        />
      )}
    </>
  );
}



