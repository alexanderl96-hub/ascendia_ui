import React, { useMemo,  useRef, useState, useEffect} from "react";
import "./how-it-works.css";
import { useAuth } from "../../pages/auth/authContext";
import { useLocation, useNavigate , Link} from "react-router-dom";
import SettingsDeveloper from "../settingsDeveloper/settingsDeveloper";

export default function HowItWorksPage() {
   const nav = useNavigate();
  const { userId , username, accountNumber, safeFetch, buyingPower, equity,  userEmail, fullName, cashBalance, totalEquity, logout } = useAuth() 
  const initials = useMemo(() => initialsFromName(fullName), [fullName]);

  const steps = [
    {
      num: "01",
      title: "Set Your Preferences",
      desc:
        "Choose your risk level, investment goals, and trading capital. Select from pre-built strategies or customize your own rules.",
      badgeClass: "badge--purple",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
          <path
            fill="currentColor"
            d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.12.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 7.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.41 1.05.72 1.63.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.22 1.12-.53 1.63-.94l2.39.96c.21.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"
          />
        </svg>
      ),
    },
    {
      num: "02",
      title: "AI Analyzes Markets",
      desc:
        "Our machine learning algorithms monitor thousands of data points in real-time, identifying optimal trading opportunities 24/7.",
      badgeClass: "badge--blue",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
          <path
            fill="currentColor"
            d="M9 2a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v7a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-1V4a2 2 0 0 0-2-2H9Zm0 4V4h6v2H9Zm-3 9h2v-2H6v2Zm0-4h2V9H6v2Zm10 4h2v-2h-2v2Zm0-4h2V9h-2v2Zm-5 6a4 4 0 0 1-4-4h2a2 2 0 0 0 4 0h2a4 4 0 0 1-4 4Z"
          />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Trades Execute Automatically",
      desc:
        "When conditions match your strategy, trades are executed instantly with optimal timing. Stop-losses protect your capital.",
      badgeClass: "badge--teal",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
          <path
            fill="currentColor"
            d="M4 19a2 2 0 0 0 2 2h14v-2H6V5H4v14Zm4-2h12a2 2 0 0 0 2-2V3H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Zm2-9 2.5 2.5L16 7l4 4-1.4 1.4-2.6-2.6-3.5 3.5L8.6 9.4 10 8Z"
          />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Track & Optimize",
      desc:
        "Monitor performance in real-time with detailed analytics. Adjust strategies based on what's working best for your goals.",
      badgeClass: "badge--gradient",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm4.2 7.3-4.9 6.3a1 1 0 0 1-1.5.1l-2.3-2.3 1.4-1.4 1.5 1.5 4.2-5.4 1.6 1.2Z"
          />
        </svg>
      ),
    },
  ];

//   const getInitials = (fullName = "") => {
//     const parts = fullName?.trim().split(/\s+/).filter(Boolean);
//     const first = parts[0]?.[0]?.toUpperCase() || "";
//     const second = (parts[1]?.[0] || parts[0]?.[1] || "")?.toUpperCase() || "";

//     return `${first}${second}`;
//   };

  function initialsFromName(name = "") {
    const parts = name?.trim().split(/\s+/).filter(Boolean);
    if (parts?.length === 0) return "U";
    if (parts?.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

    const [theme, setTheme] = useState("light"); // light | dark | system
    const [compactMode, setCompactMode] = useState(false);
    const [animations, setAnimations] = useState(true);


    const [menuOpen, setMenuOpen] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [openDash, setOpenDash] = useState(true)
    const menuRef = useRef(null);

 const handelTransition = (type) => {
  setMenuOpen(false); // close menu
  if (type === "Dashboard") {
    setOpenSetting(false);
    setOpenDash(true);
    nav("/developer_home");
  } else if (type === "Settings") {
    setOpenSetting(true);
    setOpenDash(false);
  }
};


  return (
    <div className="page">
      {/* Header */}
      <header className="topbar_dev">
        <div className="topbar_dev__inner">
          <div className="brand_dev">
            <div className="brand_dev__mark" aria-hidden="true">A</div>
            <div className="brand_dev__name">Ascendia</div>
          </div>

          <nav className="nav">
            {/* <Link className="nav__link" to="/developer_home" >
               <a className="nav__link" href="#features">Features</a>
            </Link> */}
            <Link className="nav__link" 
                  to="/developer_home#features"  
                  onClick={() => handelTransition("Dashboard")}>
               Features
            </Link>
            <Link className="nav__link" 
                  to="/developer_home#how_it_works"  
                  onClick={() => handelTransition("Dashboard")}>
               How It Works
            </Link>
            <Link className="nav__link" 
                  to="/developer_home#integrations"  
                  onClick={() => handelTransition("Dashboard")}>
               Integrations
            </Link>
            <Link className="nav__link" 
                  to="/developer_home#pricing"  
                  onClick={() => handelTransition("Dashboard")}>
               Pricing
            </Link>
            {/* <a className="nav__link" href="#how">How It Works</a>
            <a className="nav__link" href="#integrations">Integrations</a>
            <a className="nav__link" href="#pricing">Pricing</a> */}
          </nav>

          <div className="user">
            <div  className="topbar__right"  ref={menuRef}>
                <button
                    className="avatarBtn_dev"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Open user menu"
                    >
                    <span className="avatar">{initials}</span>
                </button>
            </div>
            <div className="user__name">{fullName}</div>
            {menuOpen && (
                    <div className="menu">
                        <div className="menu__head">
                        <span className="avatar avatar--sm">{initials}</span>
                        <div className="menu__meta">
                            <div className="menu__name">{fullName}</div>
                            <div className="menu__email">{userEmail}</div>
                        </div>
                        </div>

                        <button className="menu__item"  onClick={() => handelTransition("Dashboard")}>
                            <span className="menu__icon"><Icon name="user" /></span>
                            Dashboard
                        </button>
                        <button className="menu__item menu__item--active" 
                                onClick={() => {window.location.hash = "settings"; handelTransition("Settings"); }} >
                            <span className="menu__icon"><Icon name="gear" /></span>
                            Settings
                        </button>
                        <button className="menu__item menu__item--danger"
                             onClick={()=> {
                                 logout();
                                nav("/auth?tab=login")
                         }}
                        >
                             
                            <span className="menu__icon"><Icon name="logout" /></span>
                            Sign Out
                        </button>
                    </div>
                    )}
          </div>
        </div>
      </header>

      {/* How It Works */}
      {openDash && 
        <main className="how" id="how">
            <div className="how__inner">
            <div className="pill">How It Works</div>

            <h1 className="how__title">
                From Setup to Profit in <br />
                <span className="how__titleAccent">Four Simple Steps</span>
            </h1>

            <p className="how__sub">
                Ascendia handles the complexity of trading while you maintain full control.
                Our automated system works for you around the clock.
            </p>

            <div className="steps">
                {steps.map((s) => (
                <article key={s.num} className="step">
                    <div className="step__top">
                    <div className={`step__badge ${s.badgeClass}`}>{s.icon}</div>
                    <div className="step__num" aria-hidden="true">{s.num}</div>
                    </div>

                    <h3 className="step__title">{s.title}</h3>
                    <p className="step__desc">{s.desc}</p>
                </article>
                ))}
            </div>

            <section className="cta" aria-label="Call to action">
                <h2 className="cta__title">Ready to let AI handle your trading?</h2>
                <p className="cta__sub">
                Join thousands of traders who've automated their way to consistent returns.
                Start building your strategy today.
                </p>
            </section>
            </div>
        </main>
      }
      {openSetting && 
        <SettingsDeveloper 
           setMenuOpen={setMenuOpen} 
           setOpenSetting={setOpenSetting} 
           setOpenDash={setOpenDash} />
      }
    </div>
  );
}

function Icon({ name }) {
  // Tiny inline icons so you don’t need lucide/etc.
  if (name === "sun")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 13.1A8 8 0 0 1 10.9 3 7 7 0 1 0 21 13.1Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "monitor")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 5h16v11H4V5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 21h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 16v5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
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
        />
      </svg>
    );
  if (name === "user")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 21a8 8 0 1 0-16 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
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
        <path
          d="M13.7 21a2 2 0 0 1-3.4 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
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
  if (name === "gear")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M19.4 15a7.7 7.7 0 0 0 .1-2l2-1.2-2-3.5-2.3.6a7.6 7.6 0 0 0-1.7-1L15.2 5H8.8L8.5 7.9a7.6 7.6 0 0 0-1.7 1L4.5 8.3l-2 3.5L4.5 13a7.7 7.7 0 0 0 .1 2l-2 1.2 2 3.5 2.3-.6a7.6 7.6 0 0 0 1.7 1l.3 2.9h6.4l.3-2.9a7.6 7.6 0 0 0 1.7-1l2.3.6 2-3.5-2-1.2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "logout")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 17l5-5-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 12H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 3v18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  return null;
}

// import React, { useMemo, useRef, useState, useEffect } from "react";
// import "./how-it-works.css";
// import { useAuth } from "../../pages/auth/authContext";
// import { useNavigate, Link } from "react-router-dom";
// import SettingsDeveloper from "../settingsDeveloper/settingsDeveloper";

// export default function HowItWorksPage() {
//   const nav = useNavigate();
//   const { userEmail, fullName, logout } = useAuth();

//   const initials = useMemo(() => initialsFromName(fullName), [fullName]);

//   const steps = [
//     {
//       num: "01",
//       title: "Set Your Preferences",
//       desc:
//         "Choose your risk level, investment goals, and trading capital. Select from pre-built strategies or customize your own rules.",
//       badgeClass: "badge--purple",
//       icon: (
//         <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
//           <path
//             fill="currentColor"
//             d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 1h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.12.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 7.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.41 1.05.72 1.63.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.22 1.12-.53 1.63-.94l2.39.96c.21.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"
//           />
//         </svg>
//       ),
//     },
//     {
//       num: "02",
//       title: "AI Analyzes Markets",
//       desc:
//         "Our machine learning algorithms monitor thousands of data points in real-time, identifying optimal trading opportunities 24/7.",
//       badgeClass: "badge--blue",
//       icon: (
//         <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
//           <path
//             fill="currentColor"
//             d="M9 2a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v7a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-1V4a2 2 0 0 0-2-2H9Zm0 4V4h6v2H9Zm-3 9h2v-2H6v2Zm0-4h2V9H6v2Zm10 4h2v-2h-2v2Zm0-4h2V9h-2v2Zm-5 6a4 4 0 0 1-4-4h2a2 2 0 0 0 4 0h2a4 4 0 0 1-4 4Z"
//           />
//         </svg>
//       ),
//     },
//     {
//       num: "03",
//       title: "Trades Execute Automatically",
//       desc:
//         "When conditions match your strategy, trades are executed instantly with optimal timing. Stop-losses protect your capital.",
//       badgeClass: "badge--teal",
//       icon: (
//         <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
//           <path
//             fill="currentColor"
//             d="M4 19a2 2 0 0 0 2 2h14v-2H6V5H4v14Zm4-2h12a2 2 0 0 0 2-2V3H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Zm2-9 2.5 2.5L16 7l4 4-1.4 1.4-2.6-2.6-3.5 3.5L8.6 9.4 10 8Z"
//           />
//         </svg>
//       ),
//     },
//     {
//       num: "04",
//       title: "Track & Optimize",
//       desc:
//         "Monitor performance in real-time with detailed analytics. Adjust strategies based on what's working best for your goals.",
//       badgeClass: "badge--gradient",
//       icon: (
//         <svg viewBox="0 0 24 24" aria-hidden="true" className="step__icon">
//           <path
//             fill="currentColor"
//             d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm4.2 7.3-4.9 6.3a1 1 0 0 1-1.5.1l-2.3-2.3 1.4-1.4 1.5 1.5 4.2-5.4 1.6 1.2Z"
//           />
//         </svg>
//       ),
//     },
//   ];

//   function initialsFromName(name = "") {
//     const parts = name?.trim().split(/\s+/).filter(Boolean);
//     if (parts?.length === 0) return "U";
//     if (parts?.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   }

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openSetting, setOpenSetting] = useState(false);
//   const [openDash, setOpenDash] = useState(true);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (!menuRef.current) return;
//       if (!menuRef.current.contains(e.target)) setMenuOpen(false);
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

// //   const handelTransition = (type) => {
// //     setMenuOpen(false);
// //     if (type === "Dashboard") {
// //       setOpenSetting(false);
// //       setOpenDash(true);
// //       nav("/developer_home");
// //     } else if (type === "Settings") {
// //       setOpenSetting(true);
// //       setOpenDash(false);
// //     }
// //   };

//    const handelTransition = (type) => {
//     setMenuOpen(false); // close menu
//     if (type === "Dashboard") {
//         setOpenSetting(false);
//         setOpenDash(true);
//         nav("/developer_home");
//     } else if (type === "Settings") {
//         setOpenSetting(true);
//         setOpenDash(false);
//     }
//     };

//   return (
//     <div className="page">
//       <header className="topbar_dev">
//         <div className="topbar_dev__inner">
//           <div className="brand_dev">
//             <div className="brand_dev__mark" aria-hidden="true">A</div>
//             <div className="brand_dev__name">Ascendia</div>
//           </div>

//           <nav className="nav">
//             <Link className="nav__link" to="/developer_home#features" onClick={() => handelTransition("Dashboard")}>
//               Features
//             </Link>
//             <Link className="nav__link" to="/developer_home#how_it_works" onClick={() => handelTransition("Dashboard")}>
//               How It Works
//             </Link>
//             <Link className="nav__link" to="/developer_home#integrations" onClick={() => handelTransition("Dashboard")}>
//               Integrations
//             </Link>
//             <Link className="nav__link" to="/developer_home#pricing" onClick={() => handelTransition("Dashboard")}>
//               Pricing
//             </Link>
//           </nav>

//           <div className="user">
//             <div className="topbar__right" ref={menuRef}>
//               <button
//                 className="avatarBtn_dev"
//                 onClick={() => setMenuOpen((v) => !v)}
//                 aria-label="Open user menu"
//               >
//                 <span className="avatar">{initials}</span>
//               </button>
//             </div>

//             <div className="user__name">{fullName}</div>

//             {menuOpen && (
//               <div className="menu">
//                 <div className="menu__head">
//                   <span className="avatar avatar--sm">{initials}</span>
//                   <div className="menu__meta">
//                     <div className="menu__name">{fullName}</div>
//                     <div className="menu__email">{userEmail}</div>
//                   </div>
//                 </div>

//                 <button className="menu__item" onClick={() => handelTransition("Dashboard")}>
//                   <span className="menu__icon"><Icon name="user" /></span>
//                   Dashboard
//                 </button>

//                 <button
//                   className="menu__item menu__item--active"
//                   onClick={() => {
//                     window.location.hash = "settings";
//                     handelTransition("Settings");
//                   }}
//                 >
//                   <span className="menu__icon"><Icon name="gear" /></span>
//                   Settings
//                 </button>

//                 <button
//                   className="menu__item menu__item--danger"
//                   onClick={() => {
//                     logout();
//                     nav("/auth?tab=login");
//                   }}
//                 >
//                   <span className="menu__icon"><Icon name="logout" /></span>
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {openDash && (
//         <main className="how" id="how">
//           <div className="how__inner">
//             <div className="pill">How It Works</div>

//             <h1 className="how__title">
//               From Setup to Profit in <br />
//               <span className="how__titleAccent">Four Simple Steps</span>
//             </h1>

//             <p className="how__sub">
//               Ascendia handles the complexity of trading while you maintain full control.
//               Our automated system works for you around the clock.
//             </p>

//             <div className="steps">
//               {steps.map((s) => (
//                 <article key={s.num} className="step">
//                   <div className="step__top">
//                     <div className={`step__badge ${s.badgeClass}`}>{s.icon}</div>
//                     <div className="step__num" aria-hidden="true">{s.num}</div>
//                   </div>

//                   <h3 className="step__title">{s.title}</h3>
//                   <p className="step__desc">{s.desc}</p>
//                 </article>
//               ))}
//             </div>

//             <section className="cta" aria-label="Call to action">
//               <h2 className="cta__title">Ready to let AI handle your trading?</h2>
//               <p className="cta__sub">
//                 Join thousands of traders who've automated their way to consistent returns.
//                 Start building your strategy today.
//               </p>
//             </section>
//           </div>
//         </main>
//       )}

//       {openSetting && (
//         <SettingsDeveloper
//           setOpenSetting={setOpenSetting}
//           setOpenDash={setOpenDash}
//         />
//       )}
//     </div>
//   );
// }

// function Icon({ name }) {
//   if (name === "user") return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
//   if (name === "gear") return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2" />
//       <path
//         d="M19.4 15a7.7 7.7 0 0 0 .1-2l2-1.2-2-3.5-2.3.6a7.6 7.6 0 0 0-1.7-1L15.2 5H8.8L8.5 7.9a7.6 7.6 0 0 0-1.7 1L4.5 8.3l-2 3.5L4.5 13a7.7 7.7 0 0 0 .1 2l-2 1.2 2 3.5 2.3-.6a7.6 7.6 0 0 0 1.7 1l.3 2.9h6.4l.3-2.9a7.6 7.6 0 0 0 1.7-1l2.3.6 2-3.5-2-1.2Z"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
//   if (name === "logout") return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//       <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="M21 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
//   return null;
// }
