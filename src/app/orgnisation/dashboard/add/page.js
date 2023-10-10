"use client"
import { renderCertificateTemplate } from "@/lib/certificates"
import { useState } from "react"
import { BiCloudUpload, BiTrash } from "react-icons/bi"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AddTemplatePage = () => {

    const [url, setUrl] = useState(null);
    const [templateState, setTemplateState] = useState({
        name: '',
        pdfFile: '',
        fields: [
            {
                name: 'Name',
                value: 'Participant Name',
                size: 38,
                x: 0,
                y: 0,
                centerX: false,
                centerY: false,
            }
        ]
    })

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    const handleTemplateUpload = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setTemplateState(prev => ({
            ...prev,
            pdfFile: selectedFile
        }))
    }

    const addFields = () => {
        setTemplateState(prev => ({
            ...prev,
            fields: [
                ...prev.fields,
                {
                    name: 'Untitled Field',
                    value: 'Unknow Value',
                    size: 38,
                    x: 0,
                    y: 0,
                    centerX: false,
                    centerY: false,
                }
            ]
        }))
    }
    const deleteField = (index) => {
        setTemplateState((prev) => {
            const newState = { ...prev };
            const newFields = [...newState.fields];

            newFields.splice(index, 1);

            newState.fields = newFields;
            return newState;
        });
    }

    const handleChange = async (e, index) => {
        const { name, value, checked } = e.target;
        console.log(name, value, checked);

        setTemplateState((prev) => {
            const newState = { ...prev };
            newState.fields[index][name] = name === 'centerX' || name === 'centerY' ? checked : value;
            return newState;
        });

        if (name !== 'name') {
            const url = await renderCertificateTemplate(templateState);
            setUrl(url);
        }

    }

    return (
        <section className="p-1 flex flex-col pl-2">
            <label htmlFor="doc" className="flex flex-col px-8 py-12 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer">
                <BiCloudUpload size={60} className="fill-primary opacity-50" />
                <input className="block w-3/4 text-sm file:hidden text-center border-0 text-gray-900 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="doc" type="file" onChange={handleTemplateUpload} />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Only PDF Format</p>
            </label>
            {
                templateState?.pdfFile ?
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-4 py-4">
                            {
                                templateState?.fields.map((field, index) => {
                                    return (
                                        <Tweaks key={index} index={index} field={field} handleChange={handleChange} deleteField={deleteField} />
                                    )
                                })
                            }
                        </div>
                        <button className="border border-secondary p-2 rounded-md text-secondary hover:bg-secondary hover:text-white transition-all" onClick={addFields}>Add More Fileds</button>
                        <button className=" p-2 rounded-md bg-primary text-white transition-all hover:shadow-md">Save Template and Upload</button>
                    </div>
                    :
                    <div className="flex items-center justify-center p-4">
                        <h1 className="text-lg font-medium">Please Upload a template to tweak</h1>
                    </div>
            }
            {
                url && templateState.fields.length ?
                    <div className="w-full overflow-auto p-4">
                        <iframe src={url} className="w-full min-h-[630px] bg-background" frameborder="0"></iframe>
                    </div>
                    :
                    null
            }
        </section>
    )
}


const Tweaks = ({ field, index, deleteField, handleChange }) => {
    return (
        <div className="flex gap-4 w-full" >
            <div className="flex flex-col gap-1 w-full">
                <input type="text" name="name" className="border-0 focus:outline-0 font-bold focus-within:underline" autoComplete="off" autoSave="off" value={field.name} onChange={(e) => handleChange(e, index)} />
                <div className="flex items-center gap-2">
                    <input type="text" className="p-2 rounded-md" autoComplete="name" name="value" value={field.value} onChange={(e) => handleChange(e, index)} />
                    <button className="bg-danger p-2 rounded-md text-white" onClick={() => { deleteField(index) }}>
                        <BiTrash size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap justify-between w-full flex-col mt-2">
                    <div className="flex flex-col items-start gap-1">
                        <label htmlFor="x" className="block text-sm font-medium text-gray-900 dark:text-white">X Position</label>
                        <div className="flex items-center w-full gap-2">
                            <input className="w-full h-2 flex-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" type="range" min={-100} max={1000} disabled={field.centerX} value={field.x} id="x" name="x" onChange={(e) => handleChange(e, index)} />
                            <div className="flex items-center">
                                <input id="centerX" type="checkbox" name="centerX" value={field.centerX} onChange={(e) => handleChange(e, index)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="centerX" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Center</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between w-full flex-col mt-2">
                        <div className="flex flex-col items-start gap-1">
                            <label htmlFor="y" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Y Position</label>
                            <div className="flex items-center w-full gap-2">
                                <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" type="range" min={-100} max={1000} disabled={field.centerY} value={field.y} id="y" name="y" onChange={(e) => handleChange(e, index)} />
                                <div className="flex items-center">
                                    <input id="centerY" type="checkbox" name="centerY" value={field.centerY} onChange={(e) => handleChange(e, index)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="centerY" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Center</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1 mt-2">
                        <label htmlFor="size">Text Size</label>
                        <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" type="range" min={0} max={100} value={field.size} id="size" name="size" onChange={(e) => handleChange(e, index)} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddTemplatePage