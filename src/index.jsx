import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes as RoutesRouter } from 'react-router-dom';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import HtmlHead from './components/HtmlHead';
import TopBar from './components/TopBar';
import { LoggerProvider } from './providers/genericLogger/GenericLogger';
import { getMuiTheme } from './Theme';
import Institution from './users/institution/Institution';
import Parents from './users/parents/Parents';
import Secretary from './users/secretary/Secretary';
import PageNotFound from './users/site/pages/PageNotFound';
import Site from './users/site/Site';
import Therapist from './users/therapist/Therapist';

let theme = getMuiTheme();
theme = createTheme(theme);
theme = responsiveFontSizes(theme);

const App = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <HelmetProvider>
                    <LoggerProvider>
                        <CssBaseline/>
                        <HtmlHead/>
                        <BrowserRouter>
                            <RoutesRouter>
                                <Route exact path={'/'} element={<Site/>} />
                                <Route path={'/pais/*'} element={<Parents/>} />
                                <Route path={'/secretaria/*'} element={<Secretary/>} />
                                <Route path={'/institucional/*'} element={<Institution/>} />
                                <Route path={'/fono/*'} element={<Therapist/>} />
                                <Route path={'*'} element={
                                    <TopBar baseRoute={'/'}>
                                        <PageNotFound/>
                                    </TopBar>
                                } />
                            </RoutesRouter>
                        </BrowserRouter>
                    </LoggerProvider>
                </HelmetProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
