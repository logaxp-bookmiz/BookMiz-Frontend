import React from "react";
import { SelectedPage } from "./types";

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
  className?: string;
};

const ActionButton = ({ children, setSelectedPage, className = "" }: Props) => {
  return (
    <a
      className={`rounded-lg bg-primary-500 px-10 py-2 hover:bg-secondary-500 hover:text-white ${className}`}
      onClick={() => setSelectedPage(SelectedPage.Contact)}
      href="/register-type-selection"
    >
      {children}
    </a>
  );
};

export default ActionButton;
