"use client"

import UserContext from "@/contexts/UserContext";
import { useContext } from "react";
import useSWR from "swr";

const fetchCertificates = (url) => fetch(url).then((res) => res.json());

const GeneratedPage = () => {
    const { user } = useContext(UserContext);
    const { data, error: templateError } = useSWR(
        user.id ? `/api/certificate` : null,
        fetchCertificates
    );


    return (
        <section>
            {
                !data ?
                    <p>Loading...</p>
                    :
                    <p>data fetched</p>
            }
        </section>
    )
}
export default GeneratedPage