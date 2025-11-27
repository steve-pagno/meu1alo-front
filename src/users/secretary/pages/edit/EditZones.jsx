import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import DraggableManyLists from '../../../../components/lists/dragableList/DraggableManyLists';
import useEditZonesController from './useEditZonesController';
import useEditZonesStyles from './useEditZonesStyles';

const EditZones = () => {
    const styles = useEditZonesStyles();
    const { onDeleteZone, onDropCity, onEditZone, onNewZone, zones } = useEditZonesController();

    return (
        <Grid container spacing={2} sx={styles.container}>
            <Grid item xs={12}>
                <Typography variant='h4'>
                    Gerenciar regiões
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={styles.grid}>
                    <Typography variant='p'>
                        Arraste as cidades para modificar a sua região
                    </Typography>
                    <Typography variant='p'>
                        Clique no lapis no titulo da região para edita-la
                    </Typography>
                    <Typography variant='p'>
                        Clique na lixeira no titulo da região para exclui-la
                    </Typography>
                    <Typography variant='p'>
                        Clique no botão adicionar região para criar uma nova região
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant='contained' color='secondary'
                    sx={styles.saveButton} onClick={onNewZone}>
                    Adicionar uma nova região
                </Button>
            </Grid>
            <Grid item xs={12}>
                {!zones? <CircularProgress/> : <DraggableManyLists values={zones} onDropSubValue={onDropCity} onDeleteValue={onDeleteZone} onEditValue={onEditZone}/>}
            </Grid>
        </Grid>
    );
};

export default EditZones;
