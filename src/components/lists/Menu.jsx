import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const Menu = ({ data }) => {
    const navigate = useNavigate();

    return (
        <Box>
            {data.map((item)=>(
                <Box key={ item.title }>
                    <ListItemButton alignItems="flex-start" >
                        <b color={'#646464'}>{item.title}</b>
                    </ListItemButton>
                    {item.options.map((option) => (
                        <Box key={option.subTitle ? option.subTitle : option.label} sx={{ marginLeft: 2 }}>

                            {option.label &&
                                <ListItemButton key={option.label} onClick={() => { navigate(option.route); }}>
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={option.label}
                                        primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            }

                            {option.subTitle &&
                                <ListItemButton alignItems="flex-start">
                                    <b color={'#646464'}>{option.subTitle}</b>
                                </ListItemButton>
                            }

                            {option.subOptions && option.subOptions.map((subOption) => (
                                <ListItemButton sx={{ marginLeft: 3 }} key={subOption.label} onClick={() => { navigate(subOption.route); }}>
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        {subOption.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={subOption.label}
                                        primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            ))}


                        </Box>
                    ))}
                    <Divider/>
                </Box>
            ))}
        </Box>
    );
};

export default Menu;
