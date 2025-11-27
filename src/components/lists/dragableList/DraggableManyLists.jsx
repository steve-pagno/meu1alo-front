import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableList from './draggableList/DraggableList';

const DraggableManyLists = ({ onDeleteValue, onDropSubValue, onEditValue, values, ...props }) =>  {
    const [markedValue, setMarkedValue] = useState(null);
    const [markedSubValues, setMarkedSubValues] = useState([]);
    const [hasSomeDrag, setHasSomeDrag] = useState(false);

    const handleOnDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let [subValueSourceId, subValueSourceIndex] = result.draggableId.split('-');
        const valueSourceIndex = Number(result.source.droppableId.split('-')[1]);
        const destinationValueIndex = Number(result.destination.droppableId.split('-')[1]);

        subValueSourceId = Number(subValueSourceId);
        subValueSourceIndex = Number(subValueSourceIndex);

        const subValueIds = [];

        if(markedValue === valueSourceIndex){
            markedSubValues.forEach((subValueIndex) => {
                subValueIds.splice(subValueIndex, 0, values[markedValue].values[subValueIndex].id);
            });
        }

        if(!subValueIds.includes(subValueSourceId)) {
            subValueIds.splice(subValueSourceIndex, 0, subValueSourceId);
        }

        onDropSubValue({
            destination: {
                subValueIndex: result.destination.index,
                valueIndex: destinationValueIndex,
            },
            sourceValueIndex: valueSourceIndex,
            subValueIds: subValueIds
        });

        setHasSomeDrag(false);
        onMark(null);
    };

    const handleOnDragStart = (result) => {
        const valueSourceIndex = Number(result.source.droppableId.split('-')[1]);
        if(markedValue !== null && valueSourceIndex !== markedValue){
            onMark(null);
        }
        setHasSomeDrag(true);
    };

    const onMark = (index, subValues) => {
        setMarkedValue(index);
        setMarkedSubValues(subValues || []);
    };

    useEffect(() => {
        window.addEventListener('click', (event) => {
            if(event.defaultPrevented){
                return;
            }

            onMark(null);
        });
    }, []);

    return (
        <Grid container spacing={2} {...props} justifyContent={'center'}>
            <DragDropContext onDragEnd={handleOnDragEnd} onBeforeDragStart={handleOnDragStart}>
                {values.map((value, index) => (
                    <Grid item key={value.id}>
                        <DraggableList
                            isMarked={markedValue === index}
                            hasSomeDrag={hasSomeDrag}
                            valueIndex={index} value={value}
                            onDeleteValue={onDeleteValue} onEditValue={onEditValue} onMark={onMark}
                        />
                    </Grid>
                ))}
            </DragDropContext>
        </Grid>
    );
};

export default DraggableManyLists;
