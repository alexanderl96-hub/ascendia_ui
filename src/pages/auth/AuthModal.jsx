import React from "react";
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
  setRoles
}) {
 
  if (!open) return null;

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
          setRoles={setRoles}
        />
      )}
    </>
  );
}



