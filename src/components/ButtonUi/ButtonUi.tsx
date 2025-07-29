import clsx from "clsx"
import type { ReactNode } from "react"

type PropsButtonUi = {
    text?: string
    element?: 'button' | 'div'
    icon?: ReactNode
    variant?: 'primary' | 'secondary'
    className?: string
    onClick?: () => void
    translate?: boolean
};


function ButtonUi({
    variant = 'primary',
    element = 'button',
    translate,
    className,
    onClick,
    text,
    icon,
}: PropsButtonUi) {

    if (element == 'button') {
        return (
            <button
                className={clsx(`${className} flex justify-center items-center gap-1 cursor-pointer rounded-xl text-sm md:text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform`, {
                    'bg-gradient-to-r  text-white from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700': variant == 'primary',
                    '': variant == 'secondary',
                    'hover:-translate-y-1': translate
                })}
                onClick={() => {
                    if (onClick) {
                        onClick()
                    }
                }}
            >
                {text}
            </button>
        )
    } else if (element == 'div') {
        return (
            <div
                className={clsx(`${className} flex justify-center items-center gap-1 cursor-pointer rounded-xl text-sm md:text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform`, {
                    'bg-gradient-to-r  text-white from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700': variant == 'primary',
                    '': variant == 'secondary',
                    'hover:-translate-y-1': translate
                })}
                onClick={() => {
                    if (onClick) {
                        onClick()
                    }
                }}
            >
                <>{icon}</>
                <span>{text}</span>
            </div>
        )
    }
}

export default ButtonUi