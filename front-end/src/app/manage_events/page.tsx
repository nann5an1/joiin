

export default function ManageEventsPage(){
    return (
        /*Side bar */
        <div>
            {/* <aside className="fixed top-0 left-0 h-full w-46 bg-gray-300 text-white p-4"> */}{/* maybe delete this one and just make the below div as floating sidebar*/}
                <div className="grid grid-rows-5 w-16 h-96 row-gap-4 justify-center rounded-xl bg-gray-200 mt-16">{/*panel feature */}
                    <div className="w-12 h-12 row-start-1 bg-gray-200 rounded-xl justify-center p-2">{/*button-like feature still implemented in each img*/}
                        <img className="w-full" src="hiking.svg" alt="" />
                    </div>
                    <div className="w-12 h-12 row-start-2 bg-gray-200 rounded-xl justify-center p-2">
                        <img className="w-full" src="pool.svg" alt="" />
                    </div>
                    <div className="w-12 h-12 row-start-3 bg-gray-200 rounded-xl justify-center p-2">
                        <img className="w-full" src="bike.svg" alt="" />
                    </div>
                    <div className="w-12 h-12 row-start-4 bg-gray-200 rounded-xl justify-center p-2">
                        <img className="w-full" src="badminton.svg" alt="" />
                    </div>
                    <div className="w-12 h-12 row-start-5 bg-gray-200 rounded-xl justify-center p-2">
                        <img className="w-full" src="scuba_diving.svg" alt="" />
                    </div>
                </div>
            {/* </aside> */}

        <main className="ml-64 p-6">
         Main content
        </main>

        </div>
    )
}