import React, { useState, useEffect } from 'react';
import { useHeaderAnimation } from '../../Hooks/Hooks';

const Header: React.FC<{ ws: WebSocket }> = React.memo(({ ws }) => {
    const [userCount, setUserCount] = useState<number>(0); 
    const hRef = useHeaderAnimation();

    useEffect(() => {
        const updateUserCount = (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            if (data.type.trim() !== "count") return;
            setUserCount(data.count);
        };

        ws.addEventListener("message", updateUserCount);

        return () => {
            ws.removeEventListener("message", updateUserCount);
        };
    }, [ws]); 

    return (
        <header ref={hRef} className="bg-indigo-600 rounded-l rounded-br-none rounded-bl-none flex flex-col justify-self-start items-center w-full py-2 absolute top-0">
            <h2 className="text-white opacity-75 font-[poppins] semi-bold">Chat Room</h2>
            <span>{userCount} Online</span>
        </header>
    );
});

export default Header;
