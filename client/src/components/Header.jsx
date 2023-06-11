import React from "react";

const Header = () => {
  const navbarStyle = {
    backgroundColor: "rgba(1, 1, 26, 0.3)",
    color: "white",
    padding: "15px",
  };

  const linkStyle = {
    color: "white",
    marginLeft: "1%",
  };

  return (
    <div style={navbarStyle}>
      <div style={linkStyle}>
        <img
          src="../src/assets/images/cowlar.png"
          width={170}
          height={35}
          alt="Logo"
        />
        <span className="header-text">
          MERN <span style={{ color: "orange" }}>Todo</span> List
        </span>
      </div>
    </div>
  );
};

export default Header;
