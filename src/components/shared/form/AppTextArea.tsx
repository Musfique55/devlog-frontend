
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";


interface AppTextAreaProps {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
  className?: string;
  rows?: number;
}

const AppTextArea = ({
  label,
  placeholder,
  field,
  className,
  rows = 6,
}: AppTextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name} className="text-sm font-medium text-gray-300">
        {label}
      </Label>
      <div className="relative">
        <Textarea
        
          rows={rows}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          className={cn(
            className,
            "text-gray-200",
          )}
        />
      </div>
    </div>
  );
};

export default AppTextArea;
