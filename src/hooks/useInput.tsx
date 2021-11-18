import {useRef} from "react";

export const useCustomInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const handleBlur = () => {
        let input = ref.current;
        if (input) {
            input.setAttribute('disabled', 'true');
            input.classList.add('input__textfield-disabled');
        }
    }
    const handleIconClick = () => {
        let input = ref.current;
        if (input) {
            input.removeAttribute('disabled');
            input.classList.remove('input__textfield-disabled')
            input.focus();
        }
    }
    return {
        ref,
        handleBlur,
        handleIconClick
    }
}