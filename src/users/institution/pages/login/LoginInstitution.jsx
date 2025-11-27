import React from 'react';
import BaseLoginPaper from '../../../../components/bases/login/BaseLoginPaper';
import HtmlHead from '../../../../components/HtmlHead';

const LoginInstitution = () => {
    return (
        <>
            <HtmlHead userType={'Institucional'} subTitle={'Login'}/>
            <BaseLoginPaper
                title={'Seja bem-vindo a Área da Instituição'}
                registerRoute={'../cadastro'}
                // forgotPasswordRoute={'../esqueci-minha-senha'}
            />
        </>
    );
};

export default LoginInstitution;
