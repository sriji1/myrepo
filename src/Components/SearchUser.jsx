import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'


const SearchUser = () => {

    const [userdata, setUserdata] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(()=>{
       axios.get('/users').then(res=> {
        setUserdata(res.data);
        setRecords(res.data);
    }).catch(err=>console.log(err.message))
    },[])

    const searchfilter = (e) => {
   setRecords(userdata.filter( val => val.name.toLowerCase().includes(e.target.value)))
    }

return (
<div className="p-5 bg-light">
    <div>
    <input type="text" className="form-control mb-4 w-50" placeholder="Search User" onChange={searchfilter}/>
    </div>
<div className="bg-white shadow border">
    <table className="table">
        <thead >
           <tr className="text-center fs-5">
           <th className="">id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
           </tr>
        </thead>
        <tbody>
            {records && records.map((d,i) =>(
      <tr key={i} className="text-center">
         <td>{d.id}</td>
         <td>{d.name}</td>
         <td>{d.username}</td>
         <td>{d.email}</td>
         <td>{d.phone}</td>
      </tr>
))}
        </tbody>
    </table>
</div>
</div>
);
}
export default SearchUser;