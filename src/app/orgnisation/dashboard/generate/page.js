"use client"
import RenderPDF from '@/components/client/RenderPDF';
import UserContext from '@/contexts/UserContext';
import Link from 'next/link';
import { useContext } from 'react';
import useSWR from 'swr';

const GeneratePage = () => {
    const { user } = useContext(UserContext);

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(`/api/certificate/templates/${user.id}`, fetcher);


    return (
        <section className="p-1 flex flex-col pl-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl py-2 font-bold">Choose from Your Certificate Templates</h1>
                <Link href={'add'} className="ml-auto">
                    <button className="bg-primary text-white px-4 py-2 rounded-md">Add Template</button>
                </Link>
            </div>
            <div className="grid grid-cols-2 mt-2 gap-3">
                {error && <h1>Error loading templates: {error.message}</h1>}
                {!data && <h1>Loading...</h1>}
                {data && data.templates.length === 0 && <h1>You don&apos;t have any templates, please add one</h1>}
                {data && data.templates.length > 0 && (
                    data.templates.map((template, index) => {
                        return (
                            <Link href={`generate/${template._id}`} key={index} className="flex flex-wrap justify-center items-center gap-4 p-2 py-4 rounded-md shadow-lg hover:bg-primary hover:text-white transition-all">
                                <RenderPDF className="w-40 rounded max-h-60" url={template.url} />
                                <div className="flex flex-col items-center">
                                    <h1 className="font-semibold text-3xl">{template.name}</h1>
                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {template.fields.map((field, index) => {
                                            return (
                                                <span key={index} className="p-1 text-white px-2 rounded-md shadow-sm flex items-center justify-center text-sm bg-secondary">{field.name}</span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default GeneratePage
