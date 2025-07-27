interface TitleSectionProps {
    title: string;
    classe?: string;
}

function TitleSection({ title, classe }: TitleSectionProps ){
    return <h1 className={`${classe} font-bold text-md sm:text-xl md:text-2xl lg:text-3xl`}>{title}</h1>
}

export default TitleSection;