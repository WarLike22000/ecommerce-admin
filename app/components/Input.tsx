import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: any;
    className?: string
    value?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    register,
    errors,
    type,
    disabled,
    required,
    placeholder,
    className,
    value,
}) => {
    return ( 
        <div>
            <label className="block text-gray-800 text-base font-sans mb-1" htmlFor={id}>
                {label}
            </label>
            <input 
                {...register(id, { required })}
                id={id}
                autoComplete={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full outline-none ring-1 ring-gray-400 rounded-md py-2 px-3 ${errors[id] && "focus:ring-rose-600"} ${disabled && "opacity-75 cursor-not-allowed"} focus:ring-indigo-600 focus:ring-2 focus:ring-offset-2 ${className}`}
                value={value}
            />
            <div className="w-full h-9 mt-2">
                {errors[id]?.message && (
                    <span className="mt-1 text-rose-600 text-xs block">
                        {errors[id]?.message as string}
                    </span>
                )}
            </div>
        </div>
     );
}
 
export default Input;