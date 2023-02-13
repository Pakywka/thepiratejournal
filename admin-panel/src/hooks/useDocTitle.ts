import { useEffect, useState } from 'react';

export const useDocTitle = (title: any) => {
    const [doctitle, setDocTitle] = useState(title);

    useEffect(() => {
        document.title = doctitle ? doctitle + ' - ' + 'The Pirate Journal' : 'The Pirate Journal';
    }, [doctitle]);

    return [doctitle, setDocTitle];
};