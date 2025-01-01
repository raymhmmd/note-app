import React from "react";

function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="footer">
      <p className="footer_text">Copyright Muhammad Raihan &copy; {year}</p>
    </div>
  );
}

export default Footer;
