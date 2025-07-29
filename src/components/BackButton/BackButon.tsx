import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type PropsBackButton = {
    text: string
    color: 'gray' | 'blue'
    href?: string
    onClick?: () => void
}

function BackButton(props: PropsBackButton) {
    const navigate = useNavigate()
    const { text, color, href, onClick } = props

    function click(){
        if(href){
            navigate(href)
        } else if (onClick) {
            onClick()
        }
    }

    return (
        <button
            className={`
                ${color == 'gray' ? 'text-[#6b7280] hover:text-gray-700' : ''}
                ${color == 'blue' ? 'text-[#2563EB] hover:text-blue-800' : ''}
                flex items-center gap-2 cursor-pointer hover:text-black active:text-black
            `}
            onClick={() => click()}
        >
            <MdOutlineArrowBack />
            <span>{text}</span>
        </button>
    )
}

export default BackButton