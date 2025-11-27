export const getGraphicColors = (alpha) => {
    let colors = [
        'rgba(232, 50, 104)',
        'rgba(45, 183, 188)',
        'rgba(251, 188, 67)',
        'rgba(93, 48, 122)',
        'rgba(45, 200, 88)',
        'rgba(236, 113, 217)',
        'rgba(243, 131, 33)',
        'rgba(0, 134, 248)',
    ];
    colors = colors.map((color) => {
        return color.replace(')', `, ${alpha})`);
    });
    return colors;
};

export const getMuiTheme = () => ({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '100%'
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontWeight: 'bold',
                },
                h2: {
                    fontWeight: 'bold',
                },
                h3: {
                    fontWeight: 'bold',
                },
                h4: {
                    fontWeight: 'bold',
                },
                h5: {
                    fontWeight: 'bold',
                },
                h6: {
                    fontWeight: 'bold',
                },
                root: {
                    color: '#646464',
                },
                subtitle1: {
                    fontWeight: 'bold',
                },
                subtitle2: {
                    fontWeight: 'bold',
                },
            }
        },
    },
    palette: {
        background: {
            default: '#f1f0f0'
        },
        primary: {
            main: '#5D307A'
        },
        secondary: {
            main: '#E83268'
        },
        secondaryBlue: {
            main: '#2db7bc'
        },
        tertiary: {
            main: '#fbbc43'
        },
    },
});
