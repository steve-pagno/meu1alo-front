import React, { useEffect, useState } from 'react';

const useDraggableListController = (isMarked, onMark, value, valueIndex) => {
    const [marked, setMarked] = useState([]);

    const getMarkedNames = (index) => {
        const markedCopy = [...marked];

        if(!marked.includes(index)) {
            markedCopy.push(index);
        }

        return markedCopy.map((markedValue) => value.values[markedValue].name);
    };

    const onClickMark = (event, index) => {
        event.preventDefault();

        const markedCopy = [...marked, index];
        setMarked(markedCopy);
        onMark(valueIndex, markedCopy);
    };

    const isMarkedIndex = (index) => {
        return marked.includes(index);
    };

    useEffect(() => {
        if(!isMarked) {
            setMarked([]);
        }
    }, [isMarked]);

    return { getMarkedNames, isMarkedIndex, onClickMark };
};

export default useDraggableListController;
