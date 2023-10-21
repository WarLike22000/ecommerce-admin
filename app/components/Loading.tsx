"use client"

import { TailSpin } from "react-loader-spinner";

const Loading = () => {
    return ( 
        <div className="w-full h-[100vh] flex items-center justify-center">
            <TailSpin
                height="60"
                width="60"
                color="#222426"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
     );
}
 
export default Loading;