"use client"

const Input = (props) => {
    const { name, type, disabled = false, label, autocomplete, autofocus, className = '' } = props;
    return (
        <div className={`w-full flex flex-col-reverse gap-1`}>
            <input
                id={name}
                type={type}
                disabled={disabled}
                name={name}
                autoComplete={autocomplete}
                autoFocus={autofocus}
                className={`peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border ${className}`}
            />
            <label htmlFor={name} className='text-text-300 peer-focus:text-primary-500'>
                {label}
            </label>
        </div>
    )
}

export default Input