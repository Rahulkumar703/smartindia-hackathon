import Link from "next/link";

const getTemplates = async () => {
    try {
        const res = await fetch(`${process.env.URL}/api/certificate/templates`, { cache: "no-cache" })
        return res.json();

    } catch (error) {
        console.log(error.message);
    }
}


const GeneratePage = async () => {

    const res = await getTemplates();

    return (
        <section className="p-1 flex flex-col pl-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl py-2 font-bold">Choose from Your Certificate Templates</h1>
                <Link href={'add'} className="ml-auto ">
                    <button className="bg-primary text-white px-4 py-2 rounded-md">Add Template</button>
                </Link>
            </div>
            <div className="grid grid-cols-2">
                {
                    res?.templates.map((template, index) => {
                        return (
                            <h1 key={index}>{template.name}</h1>
                        )
                    })
                }
            </div>
        </section>
    )
}
export default GeneratePage