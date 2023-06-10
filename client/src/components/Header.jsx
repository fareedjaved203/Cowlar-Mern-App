import React from "react";

const Header = () => {
  const navbarStyle = {
    backgroundColor: "rgba(1, 1, 26, 0.3)",
    color: "white",
    padding: "20px",
  };

  const linkStyle = {
    color: "white",
    marginLeft: "10px",
  };

  return (
    <div style={navbarStyle}>
      <div style={linkStyle}>
        <img src="../src/assets/images/cowlar.png" width={170} height={35} />
      </div>
    </div>
  );
};

export default Header;
