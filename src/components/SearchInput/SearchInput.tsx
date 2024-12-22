import { AiOutlineClose } from "react-icons/ai";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    placeholder?: string;
};

export const SearchInput = ({ value, onChange, onClear, placeholder }: SearchInputProps) => (
    <div className="relative">
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Buscar..."}
            className="border p-2 w-full rounded pr-10"
        />
        {value && (
            <button
                onClick={onClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
            >
                <AiOutlineClose />
            </button>
        )}
    </div>
);
