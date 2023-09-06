import React from 'react';

function Blogstable({blogData}) {
    return (
        <>
            <div className="container-fluid p-4 " >
                <h3 className='m-3'><i className="bi bi-book"></i> Blog-Posts</h3>
                <div className='rounded-3 p-3 bg-white shadow '>
                    <table className="table " >
                        <thead className='bg-white '>
                            <tr>
                                <th className='fs-6 ps-4'>No.</th>
                                <th className='fs-6 ps-4'>Title</th>
                                <th className='fs-6 ps-4'>Description</th>
                                <th className='fs-6 ps-4'>Category</th>
                                <th className='fs-6 ps-4'>User</th>
                                <th className='fs-6 ps-4'>Image</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                blogData.map((data, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className='ps-4'>{index + 1}</td>
                                                <td className='ps-4'>{data.title}</td>
                                                <td className='ps-4'>{data.description}</td> 
                                                <td className='ps-4'>{data.category.name}</td>
                                                <td className='ps-4'>{data.user.name}</td>
                                                <td><img src={"http://localhost:3001/images/"+data.img} className='w-25' alt={data.title}/></td>
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

export default Blogstable;