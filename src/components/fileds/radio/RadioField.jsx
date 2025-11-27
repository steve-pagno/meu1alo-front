import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import useRadioStyles from './useRadioStyles';

const RadioField = ({ register, title, values, ...props }) => {
    const styles = useRadioStyles();
    return (
        <React.Fragment>
            {title && <Typography variant={'h6'}>
                {title}
            </Typography>
            }
            <FormControl
                sx={styles.select}
                size={'small'}
                {...props}
            >
                {values.length > 0 &&
                    <RadioGroup
                        defaultValue={values[0].id}
                        {...register}
                    >
                        {values.map((element, index) => (
                            <FormControlLabel
                                key={element.id + '_' + index}
                                value={element.id}
                                control={<Radio/>}
                                label={element.name}
                                {...register}
                            />
                        ))}
                    </RadioGroup>
                }
            </FormControl>
        </React.Fragment>
    );
};

export default RadioField;
