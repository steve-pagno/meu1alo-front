import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FixedSizeList } from 'react-window';
import DraggableListAccordion from '../accordion/DraggableListAccordion';
import DraggableListSubListItem from './subListItem/DraggableListSubListItem';
import useDraggableListController from './useDraggableListController';
import useDraggableListStyles from './useDraggableListStyles';

const DraggableList = ({ hasSomeDrag, isMarked, onDeleteValue, onEditValue, onMark, value, valueIndex  }) => {
    const styles = useDraggableListStyles();
    const { getMarkedNames, isMarkedIndex, onClickMark } = useDraggableListController(isMarked, onMark, value, valueIndex);

    return (
        <Droppable droppableId={`${value.id}-${valueIndex}`} type={'DRAGGABLE_MANY_LISTS'}
            renderClone={(provided, snapshot, rubric) => (
                <DraggableListSubListItem
                    names={getMarkedNames(rubric.source.index)}
                    provided={provided}
                    snapshot={snapshot}
                    isMarked={snapshot.isDragging}
                />
            )}
        >
            {(provided) => (
                <DraggableListAccordion provided={provided} value={value} valueIndex={valueIndex} onEditValue={onEditValue} onDeleteValue={onDeleteValue}>
                    <FixedSizeList
                        itemCount={value.values.length}
                        height={styles.getSubItemHeight()}
                        itemSize={45}
                        outerRef={provided.innerRef}
                        itemData={value.values}
                    >
                        {({ data, index, style }) => (
                            <Draggable key={`${data[index].id}`} draggableId={`${data[index].id}-${index}`} index={index}>
                                {(provided, snapshot) => (
                                    <DraggableListSubListItem
                                        names={[data[index].name]}
                                        provided={provided}
                                        snapshot={snapshot}
                                        sx={style}
                                        onClickMark={(event) => onClickMark(event, index)}
                                        hiddenOnMarked={hasSomeDrag}
                                        isMarked={isMarked && isMarkedIndex(index)}
                                    />
                                )}
                            </Draggable>
                        )}
                    </FixedSizeList>
                </DraggableListAccordion>
            )}
        </Droppable>
    );
};

export default DraggableList;
