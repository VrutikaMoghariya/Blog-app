import React , { useEffect , useState} from 'react';

function Admindashboard() {

    const [token, setToken] = useState("");
    useEffect(() => {
        const getToken = localStorage.getItem("Admin-token");
        setToken(getToken);
        console.log(getToken);
    },[])

    if (token) {
        return (
            <>
              <h1> This is admin dashboard</h1>
            </>
        )
    }
}

export default Admindashboard