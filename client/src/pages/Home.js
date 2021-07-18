import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Headers from "./Headers";
import UserTable from "./UserTable";
import "./Home.css";


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
            <h1 className="message" data-qa="message">
                    {message}
                </h1>

                {/* <table>
                    <th><td>count</td></th>
                    <tr><td>{message}</td></tr>
                </table> */}
                <Headers name={"Jim"} cohort={"London-8"} />
                </div>
                <UserTable
                    userInfo={{ month: "July", posts: 1, reactions: 0, calls: 0 }}
                />
                <Link to="/about/this/site">About</Link>
        </main>
    );
}
export default Home;
