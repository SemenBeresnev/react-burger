import {useRef} from "react";

export const useCustomInput = () => {
    const ref = useRef();
    const handleBlur = (e) => {
        e.preventDefault();
        let input = ref.current;
        input.setAttribute('disabled', true);
        input.classList.add('input__textfield-disabled');
    }
    const handleIconClick = (e) => {
        e.preventDefault();
        let input = ref.current;
        input.removeAttribute('disabled');
        input.classList.remove('input__textfield-disabled')
        input.focus();
    }
    return {
        ref,
        handleBlur,
        handleIconClick
    }
}