import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  multiline?: boolean;
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, type, multiline, rows = 3, ...props }, ref) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.target.style.height = 'inherit'; // Reset the height
      // Adjust the height based on scroll height
      event.target.style.height = `${event.target.scrollHeight}px`;
      if (props.onChange) props.onChange(event);
    };

    if (multiline) {
      return (
        <textarea
          rows={rows}
          className={cn(
            'flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-b focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden',
            className
          )}
          onChange={handleOnChange}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          {...props}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-b focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
