import React from 'react'

const Event = ({id} : {id:string}) => {
    return (
        <section className="min-h-screen px-6 md:px-4">
            <div className="w-full flex gap-8 flex-col md:flex-row">
                <div className="w-full grid grid-cols-12">
                    <div className='col-span-9 border border-red-500'>contest</div>
                    <div className='col-span-3 border border-green-600'>contest timer</div>
                </div>
            </div>
        </section>
    )
}

export default Event;