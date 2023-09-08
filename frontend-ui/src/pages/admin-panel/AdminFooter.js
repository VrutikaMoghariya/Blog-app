import React from 'react';

function AdminFooter() {
    return (
        <>
            <div className='bg-white w-100' style={{height:"60px" , position:'fixed', bottom:'0'}}>
                <div className=' border-top pt-4 ps-5 text-muted'>
                        © 2023 Neon. All rights reserved. This admin panel is restricted to authorized personnel only.
                </div>
            </div>
        </>
    )
}

export default AdminFooter