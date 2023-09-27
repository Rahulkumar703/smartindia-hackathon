'use client'

import UserContext from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyCertificates = (props) => {
    const { user } = useContext(UserContext);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchMyCertificates = async () => {
    //         try {
    //             const res = await fetch(`/api/mycertificates/${uder.id}`);
    //             const data = await res.json();
    //             if(data.success)
    //             {

    //             }
    //         } catch (error) {
    //             toast.error(error.messasge)
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchMyCertificates();
    // }, [])

    return (
        <section className="flex flex-col">

            <div className="w-full max-w-6xl mx-auto grid place-items-center h-full">
                Under Construction
            </div>
        </section>
    )
}

export default MyCertificates