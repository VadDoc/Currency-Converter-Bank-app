import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './Button.module.scss'

const Button: React.FC<ButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? styles.red : styles.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default Button

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
}