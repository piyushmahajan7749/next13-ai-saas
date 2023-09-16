import * as React from "react";

import { cn } from "@/lib/utils";
import { TextArea } from "@radix-ui/themes";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextAreaInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <TextArea {...props} />;
  }
);
Input.displayName = "Input";

export { Input };
