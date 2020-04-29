import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../style.css'


export default function Customers(props) {
    const [customerdata, setdata] = useState([])
    const [displaydata, setdisplaydata] = useState([])
    const [btnarr, setbtndata] = useState([])
    const [dataloaded, setload] = useState(false)
    const [perpage, setperpage] = useState(10)


    useEffect(() => {
        getdata()
    }, [])

     function getdata() {
         axios('./db.json')
            .then((res) => {
                let pagesarr = []
                let len = res.data.customers.length
                let pages = Math.ceil(len / perpage)
                for (let i = 0; i < pages; i++) {
                    pagesarr.push(i + 1)
                }
                setdata(res.data.customers)
                setbtndata(pagesarr)
                setdisplaydata(res.data.customers.slice(0, perpage))
                setload(true)
            })
            .catch((err) => alert('try again'))
    }
    function pageNum(num) {
        let start = (num - 1) * perpage
        let end = start + perpage
        setdisplaydata(customerdata.slice(start, end))
    }
    if (dataloaded) {
        return (
            <>
                <div className="container-fluid p-5">
                    <div className="tableHolder text-center">
                        <table className="table table-striped border">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Customer ID</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>Created On</th>
                                    <th>No.of Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displaydata.map((ele) => <tr key={ele.id}><td>{ele.id}</td><td>{ele.firstName}</td>
                                    <td>{ele.lastName}</td><td>{ele.email}</td><td>{ele.created}</td><td>{ele.orders}</td></tr>)}
                            </tbody>
                        </table>
                        <div className="text-center">
                            {btnarr.map((ele) => <button className="btn btn-dark m-2" onClick={() => pageNum(ele)} key={ele}>{ele}</button>)}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="text-center">
                <h1>Loading....</h1>
            </div>
        )
    }
}