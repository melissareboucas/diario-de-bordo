interface TopPageProps {
    title: string;
    img_url: string
}

export default async function TopPage({ title, img_url }: TopPageProps) {
    return (
        <>
            <div className="flex items-center justify-center mr-16 ml-16">
                <h1 className="flex-grow text-4xl text-custom-dark-blue font-semibold">{title}</h1>
                <img  className="flex-grow" src={img_url}/>
            </div>
        </>
    )


}