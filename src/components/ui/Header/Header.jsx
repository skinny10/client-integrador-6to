import React from "react";
import "./header.css";

export default function Header({ title, paragraph }) {
  return (
    <header className="content-header">
      <h1 className="">{title}</h1>
      <h4>{paragraph}</h4>
    </header>
  );
}
