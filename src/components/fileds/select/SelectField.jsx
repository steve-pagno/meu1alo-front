import React from 'react';
import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import useSelectController from './useSelectController';
import useSelectStyles from './useSelectStyles';

const SelectField = ({ multiple, nameOfDescription = 'name', onChange, register, title, values, ...other }) => {
    const styles = useSelectStyles();
    const { configValueManipulation } = useSelectController(register, multiple, onChange, other);
    const createRenderMultiple = (selected) => {
        if (multiple && Array.isArray(selected)) {
            return selected.map((selectedElement) => {
                const found = values.find(v => String(v.id) === String(selectedElement));
                return found ? (
                    <Chip key={'chip-select-'+selectedElement} sx={styles.chipElement} label={found[nameOfDescription]} />
                ) : null;
            });
        }

        const found = values.find(v => String(v.id) === String(selected));
        return found ? found[nameOfDescription] : '';
    };

    const currentValue = configValueManipulation().value;

    return (
        <FormControl sx={styles.select} size={'small'} {...other} {...configValueManipulation()} >
            <InputLabel> {title} </InputLabel>
            <Select
                {...configValueManipulation()}
                MenuProps={{
                    PaperProps: {
                        style: styles.OpenedOptionsContainer,
                    },
                }}
                input={<OutlinedInput label={title} />}
                multiple={multiple}
                renderValue={(selected) => (
                    <Box sx={styles.multipleChipContainer}>
                        {createRenderMultiple(selected)}
                    </Box>
                )}
            >
                {values.map((element, index) => (
                    <MenuItem key={element.id+'_'+index} value={String(element.id)} {...register}>
                        {multiple &&  <Checkbox checked={Array.isArray(currentValue) ? currentValue.some(val => String(val) === String(element.id)) : false} sx={{ pointerEvents: 'none' }} />}

                        {element[nameOfDescription]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectField;
