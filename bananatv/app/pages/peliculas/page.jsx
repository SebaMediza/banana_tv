'use client'
import { useEffect, useState } from "react"

import '../../../public/assets/css/Card.css'
import Card from "@/components/Card"

const page = ({isLogged}) => {
    const api = 'http://localhost:7071/peliculas'
    const getPelis = async () => {
        const res = await fetch(api);
        const data = await res.json();
        console.log(data.data);
        setData(data.data);
        setLoading(false);
    }

    useEffect(() => {
        getPelis();
    }, []);

    const [data, setData] = useState([]); //useState([]) es el estado inicial, que es un array vacio
    const [loading, setLoading] = useState(true); //useState(false) es el estado inicial, que es un booleano en false
    const [error, setError] = useState(null); //useState(null) es el estado inicial, que es un null


    return (
        <>
            {loading ? (<p>Cargando...</p>) : (
                <div>
                    <div className="title">
                        <h1>Peliculas</h1>
                    </div>
                        <Card producciones={data} />
                </div>
            )}
        </>
    )
}

export default page