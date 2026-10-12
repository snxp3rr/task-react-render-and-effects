import { useState, useEffect } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    // Храним последнее сообщение. По умолчанию '-1', как требуется в задании
    const [lastMessage, setLastMessage] = useState<string | number>('-1');

    useEffect(() => {
        setLastMessage('-1');

        const handleMessage = (message: string | number) => {
            setLastMessage(message);
        };

        subscribe(props.sourceId, handleMessage);

        return () => {
            unsubscribe(props.sourceId, handleMessage);
        };
    }, [props.sourceId]); // Зависимость: эффект перезапускается только при изменении sourceId

    return (
        <div>
            {props.sourceId}: {lastMessage}
        </div>
    );
}