import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";

export const formatEuro = function(number: number | string) {
  if (number === 0) return number;
  if (typeof number === "string") number = parseFloat(number);
  return formatThousands(number.toFixed(2));
};

export const formatThousands = function(number: number | string) {
  if (number === 0) return number;
  if (number === null) return 0;
  var parts = number.toString().split(".");
  if (parts.length === 2) {
    parts[1] = parts[1].substring(0, 2);
  }
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
};

export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

interface ITextField {
  key: string;
  label: string;
  value: any;
  required?: boolean;
  autoFocus?: boolean;
  type?: string;
  handleChange?: (e: any) => void;
  disabled?: boolean;
}

export const createTextField = (options: ITextField) => {
  let extra: any = {
    required: options.required,
    autoFocus: options.autoFocus,
    type: options.type
  };

  if (options.type === "EURO") {
    extra.type = "number";
    extra.startAdornment = <InputAdornment position="start">€</InputAdornment>;
  }

  if (options.disabled) {
    extra.disabled = true;
  }

  return (
    <TextField
      variant="outlined"
      margin="normal"
      id={options.key}
      label={options.label}
      name={options.key}
      value={options.value}
      onChange={options.handleChange}
      fullWidth
      {...extra}
    />
  );
};
