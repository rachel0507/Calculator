import React from "react";
import "./header.css";
export interface HeaderProps {}

export interface HeaderState {}

export function Header() {
  return (
    <header>
      <div className="row">
        <h1 className="title">Calculator</h1>
        <div className="author">Rachel Kantor</div>
      </div>
    </header>
  );
}
export default Header;
