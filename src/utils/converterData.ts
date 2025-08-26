export const converterData = (value: string): string => {

    const [dia, mes, ano] = value.split('/').map(Number)
    const objetoDate = new Date(ano, mes - 1, dia)
    const hoje = new Date()

    let anos = hoje.getFullYear() - objetoDate.getFullYear()
    let meses = hoje.getMonth() - objetoDate.getMonth()
    let dias = hoje.getDate() - objetoDate.getDate()

    if (dias < 0) {
        meses -= 1
        const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate()
        dias += mesAnterior
    }
    if (meses < 0) {
        anos -= 1
        meses += 12
    }

    if (anos < 0) return ''

    if (value.length === 10) {
        if (anos > 0) {
            const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
            const textoMeses = meses > 0 ? ` e ${meses} ${meses === 1 ? 'mês' : 'meses'}` : '';
            return textoAnos + textoMeses;
        }

        if (anos === 0 && meses > 0) {
            const textoMeses = `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
            const textoDias = dias > 0 ? ` e ${dias} ${dias === 1 ? 'dia' : 'dias'}` : '';
            return textoMeses + textoDias;
        }

        if (meses === 0 && dias >= 0) {
            return dias === 0 ? '1 dia' : `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
        }
    }

    return ''
}