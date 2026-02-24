import React from 'react';
import { 
    Box, Button, CircularProgress, Grid, Typography, 
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert 
} from '@mui/material';
import DraggableManyLists from '../../../../components/lists/dragableList/DraggableManyLists';
import useEditZonesController from './useEditZonesController';
import useEditZonesStyles from './useEditZonesStyles';

const EditZones = () => {
    const styles = useEditZonesStyles();
    const { 
        onDeleteZone, onDropCity, onEditZone, zones,
        isDialogOpen, handleOpenDialog, handleCloseDialog, newZoneName, setNewZoneName, submitNewZone,
        isMaster
    } = useEditZonesController();

    return (
        <Grid container spacing={2} sx={styles.container}>
            <Grid item xs={12}>
                <Typography variant='h4'>
                    {isMaster ? 'Gerenciar regiões' : 'Visualizar regiões e municípios'}
                </Typography>
            </Grid>
            
            <Grid item xs={12}>
                {isMaster ? (
                    <Box sx={styles.grid}>
                        <Typography variant='body1'>
                            Arraste as cidades para modificar a sua região
                        </Typography>
                        <Typography variant='body1'>
                            Clique no lápis no título da região para editá-la
                        </Typography>
                        <Typography variant='body1'>
                            Clique na lixeira no título da região para excluí-la
                        </Typography>
                        <Typography variant='body1'>
                            Clique no botão adicionar região para criar uma nova região
                        </Typography>
                    </Box>
                ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        Modo Leitura: Apenas a Secretaria Estadual pode criar, editar ou mover os municípios entre as regiões.
                    </Alert>
                )}
            </Grid>

            {/* O botão de adicionar só renderiza se for o usuário Master */}
            {isMaster && (
                <Grid item xs={12}>
                    <Button
                        variant='contained' color='secondary'
                        sx={styles.saveButton} onClick={handleOpenDialog}>
                        Adicionar uma nova região
                    </Button>
                </Grid>
            )}

            <Grid item xs={12}>
                {!zones ? <CircularProgress/> : (
                    <DraggableManyLists 
                        values={zones} 
                        onDropSubValue={onDropCity} 
                        // Se não for master, não envia as funções para o componente filho (escondendo os botões se ele suportar)
                        onDeleteValue={isMaster ? onDeleteZone : undefined} 
                        onEditValue={isMaster ? onEditZone : undefined}
                    />
                )}
            </Grid>

            {/* MODAL DE CRIAÇÃO SÓ RENDERIZA SE FOR O USUÁRIO MASTER */}
            {isMaster && (
                <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                    <DialogTitle>Criar Nova Região</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome da Região"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newZoneName}
                            onChange={(e) => setNewZoneName(e.target.value)}
                            placeholder="Ex: Região Norte"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="inherit">
                            Cancelar
                        </Button>
                        <Button 
                            onClick={submitNewZone} 
                            color="primary" 
                            variant="contained" 
                            disabled={!newZoneName || newZoneName.trim() === ''}
                        >
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Grid>
    );
};

export default EditZones;