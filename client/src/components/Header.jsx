import React from "react";

const Header = () => {
  const navbarStyle = {
    backgroundColor: "rgba(1, 1, 26, 0.3)",
    color: "white",
    padding: "15px",
  };

  const linkStyle = {
    color: "white",
    marginLeft: "10px",
  };
  const item = {
    color: "white",
    marginLeft: "30%",
    fontSize: "25px",
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
        <span style={item}>
          MERN <span style={{ color: "orange" }}>Todo</span> List
        </span>
      </div>
    </div>
  );
};

export default Header;
