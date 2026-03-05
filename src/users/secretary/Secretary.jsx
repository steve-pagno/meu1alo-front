import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import BaseUserRoute from '../../components/bases/userRoute/BaseUserRoute';
import { RequireAuth } from '../../providers/auth/Auth';
import MetaLinkMenu from './MetaLinkMenu';
import EditSecretary from './pages/edit/EditSecretary';
import EditZones from './pages/edit/EditZones';
import RegisterSecretaryUser from './pages/register/RegisterSecretaryUser';
import useSecretaryService from './useSecretaryService';

const Secretary = () => {
    const service = useSecretaryService();
    
    // 1. Criamos estados para forçar o React a atualizar a tela automaticamente
    const [isState, setIsState] = useState(false);
    const [userId, setUserId] = useState(null);

    // 2. O useEffect garante que vamos verificar quem é o usuário logo após a tela montar
    useEffect(() => {
        const checkUser = async () => {
            const user = service.getUser()?.user;
            
            if (user) {
                setUserId(user.id);
                
                // Verifica rapidamente pelo tipo salvo no navegador
                if (user.type === 'STATE') {
                    setIsState(true);
                } else {
                    // Como prevenção (logo após o login), consulta o backend para ter 100% de certeza
                    try {
                        const response = await service.isStateSecretary();
                        // Se o backend confirmar que é estadual, libera o menu
                        if (response && response.body) {
                            setIsState(true);
                        }
                    } catch (error) {
                        // Ignora erro silenciamente caso seja municipal
                    }
                }
            }
        };

        checkUser();
    }, [service]);

    return (
        <BaseUserRoute
            baseRoute={'/secretaria'}
            userTypeTitle={'Secretaria'}
            userTypeTitleWithConjunction={'da Secretaria'}
            userType="secretary"
            service={service}
            // 3. Passamos os nossos estados reativos para o menu
            metaRoutesLink={MetaLinkMenu(isState, userId)}
            withDashboard={true}
            withNotifications={true}
            hasRegisterRoute={false}
        >
            {/* Mantemos as rotas protegidas que arrumamos antes */}
            <Route path={'/novo-cadastro'} element={<RequireAuth> <RegisterSecretaryUser/> </RequireAuth>} />
            <Route path={'/minha-conta/:id'} element={<RequireAuth> <EditSecretary/> </RequireAuth>} />
            <Route path={'/gerenciar-regioes'} element={<RequireAuth> <EditZones/> </RequireAuth>} />
        </BaseUserRoute>
    );
};

export default Secretary;