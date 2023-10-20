"use client";

import { Button as Btn } from "primereact/button";
import { ButtonHTMLAttributes } from "react";
import { SeverityType } from "../../../types/severity.type";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: string;
  tooltip?: string;
  severity?: SeverityType;
}

export default function Button({
  label,
  tooltip,
  icon,
  severity,
  ...props
}: ButtonProps) {
  return (
    <Btn
      label={label}
      icon={icon}
      tooltip={tooltip}
      severity={severity}
      {...props}
    />
  );
}
