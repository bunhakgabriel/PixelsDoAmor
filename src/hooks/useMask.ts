function useMask() {
    function apenasLetras(valor: string): string {
        return valor.replace(/[^\p{L}\s]/gu, '')
    }

    function apenasNumeros(valor: string, max?: number): string {
        if (max && valor.length >= max) {
            return valor.substring(0, max)
        }
        return valor.replace(/[^\d]/g, '');
    }

    function telefoneMask(value: string): string {
        if (value.length > 15) return value.substring(0, 15)
        if (value.length == 0) return ''
        // Remove tudo que não for número
        const digits = value.replace(/\D/g, '');

        // Aplica a máscara
        if (digits.length <= 2) {
            return `(${digits}`;
        } else if (digits.length <= 7) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        } else if (digits.length <= 11) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
        } else {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
        }
    }

    function dateMask(value: string): string {
        if (value.length > 10) return value.substring(0, 10)

        // Remove tudo que não for número
        let digits = value.replace(/\D/g, '');

        // Aplica a máscara
        if (digits.length > 2 && digits.length <= 4) {
            digits = digits.slice(0, 2) + '/' + digits.slice(2);
        } else if (digits.length > 4) {
            digits = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8);
        }

        return digits
    }

    function cpfMask(value: string): string {
        const digits = value.replace(/\D/g, '').slice(0, 11)
        let out = ''
        if (digits.length > 0) out = digits.slice(0, 3)
        if (digits.length >= 4) out = `${digits.slice(0,3)}.${digits.slice(3,6)}`
        if (digits.length >= 7) out = `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}`
        if (digits.length >= 10) out = `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}-${digits.slice(9,11)}`
        return out
    }

    function cnpjMask(value: string): string {
        const digits = value.replace(/\D/g, '').slice(0, 14)
        let out = ''
        if (digits.length > 0) out = digits.slice(0, 2)
        if (digits.length >= 3) out = `${digits.slice(0,2)}.${digits.slice(2,5)}`
        if (digits.length >= 6) out = `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}`
        if (digits.length >= 9) out = `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8,12)}`
        if (digits.length >= 13) out = `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8,12)}-${digits.slice(12,14)}`
        return out
    }

    function emailMask(value: string): string {
        // Remove espaços, força minúsculas e impede múltiplos espaços acidentais
        return value.replace(/\s+/g, '').toLowerCase()
    }

    function mask(value: string, mask: tipoMask): string {
        switch (mask) {
            case 'apenasLetras':
                return apenasLetras(value)
            case 'telefone':
                return telefoneMask(value)
            case 'date':
                return dateMask(value)
            case 'cpf':
                return cpfMask(value)
            case 'cnpj':
                return cnpjMask(value)
            case 'email':
                return emailMask(value)
            default:
                return ''
        }
    }

    return {
        mask,
        apenasNumeros
    }
}

type tipoMask =
    'apenasLetras' |
    'telefone' |
    'date' |
    'cpf' |
    'cnpj' |
    'email' 

export default useMask;