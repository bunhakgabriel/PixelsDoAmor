import type { ReactNode } from "react";

type BenefitsSectionProps = {
    icon: ReactNode
    title: string
    text: string
}

function BenefitsSection({ icon, title, text }: BenefitsSectionProps) {
    return (
        <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <h4 className="text-lg sm:text-xl font-semibold mb-2">{title}</h4>
            <p className="text-sm sm:text-base text-gray-600">{text}</p>
        </div>
    )
}

export default BenefitsSection;