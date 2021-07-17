import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./cyf_brand.png";
export function Home() {
    const [message, setMessage] = useState("Loading...");
const [statistics,setStatistics] = useState([]);
    useEffect(() => {
        fetch("/api/user/U027NPENH9T?time=month")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then((body) => {
                setMessage(body.userName);
                setStatistics(body.statistics);
                console.log (body);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
console.log(statistics[0]);
    return (
        <main role="main">
            <div>
                <img
                    className="logo"
                    data-qa="logo"
                    src={logo}
                    alt="Just the React logo"
                />
                <h1 className="message" data-qa="message">
                    {message}
                </h1>
                <table>
                    <th><td>count</td></th>
                    <tr><td>{message}</td></tr>
                </table>
                <Link to="/about/this/site">About</Link>
            </div>
        </main>
    );
}
export default Home;
