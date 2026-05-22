const IRDA2_KEYWORDS = [
    'utin',
    'uti neonatal',
    'permanência em utin',
    'peso ao nascimento menor de 1.500 gramas',
    'hiperbilirrubinemia com exsanguineotransfusão',
    'ecmo',
    'oxigenação por membrana extracorpórea',
    'ventilação mecânica por mais de 5 dias',
    'anóxia grave',
    'encefalopatia hipóxico-isquêmica',
    'hemorragia peri-ventricular',
    'distúrbios neurodegenerativos'
];

function normalizeText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function classifyIndicatorName(name) {
    const normalized = normalizeText(name);
    const isIrda2 = IRDA2_KEYWORDS.some((keyword) =>
        normalized.includes(normalizeText(keyword))
    );
    return isIrda2 ? 'IRDA2' : 'IRDA1';
}

export function resolveRiskCategory(selectedIds = [], indicators = []) {
    const idsArray = Array.isArray(selectedIds) ? selectedIds : (selectedIds ? [selectedIds] : []);
    if (idsArray.length === 0) { return 'NONE_OR_IRDA1'; }

    const selected = indicators.filter((item) =>
        idsArray.map(Number).includes(Number(item.id))
    );

    const hasIrda2 = selected.some((item) => classifyIndicatorName(item.name) === 'IRDA2');
    return hasIrda2 ? 'IRDA2' : 'NONE_OR_IRDA1';
}

export function shouldUsePeateA(riskCategory) {
    return riskCategory === 'IRDA2';
}

function allTrue(values) {
    return values.every((value) => value === true);
}

export function buildConductPreview({
    eoaLeftEar,
    eoaRightEar,
    peateaLeftEar,
    peateaRightEar,
    riskCategory,
    testType,
}) {
    if (riskCategory === 'IRDA2') {
        const eoaPassed = allTrue([eoaLeftEar, eoaRightEar]);
        const peateaPassed = allTrue([peateaLeftEar, peateaRightEar]);

        const finalLeftEar = Boolean(eoaLeftEar) && Boolean(peateaLeftEar);
        const finalRightEar = Boolean(eoaRightEar) && Boolean(peateaRightEar);

        if (Number(testType) === 1) {
            if (eoaPassed && peateaPassed) {
                return {
                    finalLeftEar,
                    finalRightEar,
                    name: 'Passa EOA + PEATE-A. Encaminhamento para monitoramento em serviços especializados ou CER.',
                    type: 'PEATEA',
                };
            }

            return {
                finalLeftEar,
                finalRightEar,
                name: 'Falha no teste. Realizar reteste em até 15 dias com exame que apresentou falha.',
                type: 'PEATEA',
            };
        }

        if (eoaPassed && peateaPassed) {
            return {
                finalLeftEar,
                finalRightEar,
                name: 'Passa EOA + PEATE-A. Encaminhamento para monitoramento em serviços especializados ou CER.',
                type: 'PEATEA',
            };
        }

        return {
            finalLeftEar,
            finalRightEar,
            name: 'Falha no reteste. Encaminhamento para diagnóstico em serviço especializado ou CER.',
            type: 'PEATEA',
        };
    }

    const passed = Boolean(eoaLeftEar) && Boolean(eoaRightEar);

    if (Number(testType) === 1) {
        if (passed) {
            return {
                finalLeftEar: true,
                finalRightEar: true,
                name: 'Passa no teste. Encaminhamento para APS para acompanhamento.',
                type: 'EOET',
            };
        }

        return {
            finalLeftEar: Boolean(eoaLeftEar),
            finalRightEar: Boolean(eoaRightEar),
            name: 'Falha no teste. Realizar reteste em até 15 dias com EOA.',
            type: 'EOET',
        };
    }

    if (passed) {
        return {
            finalLeftEar: true,
            finalRightEar: true,
            name: 'Passa no reteste. Encaminhamento para APS para acompanhamento.',
            type: 'EOET',
        };
    }

    return {
        finalLeftEar: Boolean(eoaLeftEar),
        finalRightEar: Boolean(eoaRightEar),
        name: 'Falha no reteste. Encaminhamento para diagnóstico em serviço especializado ou CER.',
        type: 'EOET',
    };
}