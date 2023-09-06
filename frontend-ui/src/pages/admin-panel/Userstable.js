import React from 'react'


function Userstable({ userData }) {
    return (
        <>
            <div className="container-fluid p-4 " >
                <h3 className='m-3'><i className="bi bi-people"></i> Users</h3>
                <div className='rounded-3 p-3 bg-white w-50 shadow '>
                    <table className="table " >
                        <thead className='bg-white '>
                            <tr>
                                <th className='fs-6 ps-4'>No.</th>
                                <th className='fs-6 ps-4'>User-Name</th>
                                <th className='fs-6 ps-4'>Email</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                userData.map((data, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='ps-4'>{index + 1}</td>
                                                <td className='ps-4'>{data.name}</td>
                                                <td className='ps-4'>{data.email}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Userstable