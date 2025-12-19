import React, { useMemo, useRef, useState, useEffect } from "react";
import { useAuth } from "../../pages/auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./settings-developer.css";

function initialsFromName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function Switch({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      className={`sw ${checked ? "sw--on" : ""}`}
      aria-label={ariaLabel}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="sw__knob" />
    </button>
  );
}

function Icon({ name }) {
  if (name === "sun")
    return (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="#ffff009f">
        <path
          d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );

  if (name === "moon")
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path
          d="M21 13.1A8 8 0 0 1 10.9 3 7 7 0 1 0 21 13.1Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          transform="translate(9 15) scale(1.3) translate(-12 -12)"
        />
      </svg>
    );

  if (name === "monitor")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 5h16v11H4V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 16v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );

  if (name === "sparkle")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.2 5.1L18 9l-4.8 1.9L12 16l-1.2-5.1L6 9l4.8-1.9L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          transform="translate(12 12) scale(1.2) translate(-12 -10)"
        />
      </svg>
    );

  if (name === "user")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );

  if (name === "bell")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );

  if (name === "shield")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2 20 6v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );

  return null;
}

export default function SettingsDeveloper({ setOpenSetting, setOpenDash }) {
  const { userEmail, fullName, modeTheme, setModeTheme } = useAuth();
  const nav = useNavigate();
  const initials = useMemo(() => initialsFromName(fullName || ""), [fullName]);

  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);


  const handelTransition = () => {
    setOpenSetting(false);
    setOpenDash(true);
    nav("/developer_home");
  };

  return (
    <div className="sp">
      <main className="page_setting">
        <div className="container_setting">
          <Link className="back_setting" to="/developer_home" onClick={handelTransition}>
            ← <span>Back to Dashboard</span>
          </Link>

          <h1 className="title_setting">Settings</h1>
          <p className="subtitle_setting">Manage your account preferences and application settings</p>

          <div className="grid_setting">
            <aside className="left">
              <div className="card-st userCard_setting">
                <div className="userAvatar_setting">{initials}</div>
                <div className="userName_setting">{fullName}</div>
                <div className="userEmail_setting">{userEmail}</div>
              </div>

              <div className="card-st sideNav_setting">
                <button className="sideItem_setting sideItem--active">
                  <span className="sideIcon"><Icon name="sparkle" /></span>
                  Appearance
                </button>
                <button className="sideItem_setting">
                  <span className="sideIcon"><Icon name="user" /></span>
                  Account
                </button>
                <button className="sideItem_setting">
                  <span className="sideIcon"><Icon name="bell" /></span>
                  Notifications
                </button>
                <button className="sideItem_setting">
                  <span className="sideIcon"><Icon name="shield" /></span>
                  Security
                </button>
              </div>
            </aside>

            <section className="right">
              <div className="card-st mainCard_setting">
                <div className="cardHead">
                  <div className="cardHead__titleRow">
                    <span className="cardHead__badge_setting"><Icon name="sparkle" /></span>
                    <div>
                      <div className="cardHead__title">Appearance</div>
                      <div className="cardHead__sub">Customize how Ascendia looks on your device</div>
                    </div>
                  </div>
                </div>

                <div className="block">
                  <div className="blockTitle">Theme</div>

                  <label className={`themeRow ${modeTheme === "light" ? "themeRow--on" : ""}`}>
                    <input
                      type="radio"
                      name="theme"
                      checked={modeTheme === "light"}
                      onChange={() => setModeTheme("light")}
                    />
                    <span className="themeIcon sun_light"><Icon name="sun" /></span>
                    <span className="themeText">
                      <span className="themeName">Light</span>
                      <span className="themeDesc">Bright and clean interface</span>
                    </span>
                  </label>

                  <label className={`themeRow ${modeTheme === "dark" ? "themeRow--on" : ""}`}>
                    <input
                      type="radio"
                      name="theme"
                      checked={modeTheme === "dark"}
                      onChange={() => setModeTheme("dark")}
                    />
                    <span className="themeIcon moon_light"><Icon name="moon" /></span>
                    <span className="themeText">
                      <span className="themeName">Dark</span>
                      <span className="themeDesc">Cosmic purple interface</span>
                    </span>
                  </label>

                  <label className={`themeRow ${modeTheme === "system" ? "themeRow--on" : ""}`}>
                    <input
                      type="radio"
                      name="theme"
                      checked={modeTheme === "system"}
                      onChange={() => setModeTheme("system")}
                    />
                    <span className="themeIcon divice_light"><Icon name="monitor" /></span>
                    <span className="themeText">
                      <span className="themeName">System</span>
                      <span className="themeDesc">Use device settings</span>
                    </span>
                  </label>
                </div>

                <div className="block">
                  <div className="blockTitle">Display Options</div>

                  <div className="optionRow">
                    <div>
                      <div className="optionName">Compact Mode</div>
                      <div className="optionDesc">Reduce spacing between elements</div>
                    </div>
                    <Switch checked={compactMode} onChange={setCompactMode} ariaLabel="Toggle compact mode" />
                  </div>

                  <div className="optionRow">
                    <div>
                      <div className="optionName">Animations</div>
                      <div className="optionDesc">Enable smooth transitions</div>
                    </div>
                    <Switch checked={animations} onChange={setAnimations} ariaLabel="Toggle animations" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
