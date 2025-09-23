import { IoIosPlay } from "react-icons/io"
import { IoPauseSharp } from "react-icons/io5"
import { useEffect, useState } from "react"
import { useConfigStoreSpotify } from "../../../../../store/useConfigStoreSpotify";

function Player() {
    const playingSong = useConfigStoreSpotify((state) => state.playingSong);
    const setplayingSong = useConfigStoreSpotify((state) => state.setplayingSong);

    const [heights, setHeights] = useState([8, 16, 12, 20, 10]);

    useEffect(() => {
        if (!playingSong) return;

        const interval = setInterval(() => {
            setHeights(heights.map(() => Math.floor(Math.random() * 25 + 4)));
        }, 300); // muda a cada 300ms

        return () => clearInterval(interval);
    }, [playingSong, heights]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center text-white py-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-xl w-full">
                <div className="flex items-center justify-between mb-4">
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div className="flex items-end gap-1 h-10">
                            {heights.map((h, i) => (
                                <div
                                    key={i}
                                    className={`bg-green-500 w-2 rounded`}
                                    style={{ height: `${h}px` }}
                                ></div>
                            ))}
                        </div>
                        <button
                            onClick={() => setplayingSong(!playingSong)}
                            className="mt-2 cursor-pointer text-black bg-green-500 hover:bg-green-600 transition-colors duration-200 p-3 rounded-full shadow-lg"
                        >
                            {playingSong ? <IoPauseSharp className="h-8 w-8" /> : <IoIosPlay className="h-8 w-8" />}
                        </button>
                        <div className="flex items-end gap-1 h-10">
                            {heights.map((h, i) => (
                                <div
                                    key={i}
                                    className={`bg-green-500 w-2 rounded`}
                                    style={{ height: `${h}px` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Player