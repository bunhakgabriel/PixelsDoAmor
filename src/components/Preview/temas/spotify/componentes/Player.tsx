function Player() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center text-white py-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-xl w-full fixed z-50 bottom-0">
                <div className="flex items-center justify-between mb-4">
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1020 15V9l-3.245 3.245a8.00032 8.00032 0 00-.776-3.832" />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="text-black bg-green-500 hover:bg-green-600 transition-colors duration-200 p-3 rounded-full shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1020 15V9l-3.245 3.245a8.00032 8.00032 0 00-.776-3.832" />
                        </svg>
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold mb-1">25 anos de pura música</p>
                </div>
            </div>
        </div>
    )
}

export default Player