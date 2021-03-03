const FormataDataHora = (valorDateTime, type) => {
    let retorno = ''
    if (type == 'time') {
        let auxHora, auxMinuto
        let hora, minuto
        auxHora = valorDateTime.getHours()
        auxMinuto = valorDateTime.getMinutes()
        auxHora < 10 ? hora = `0${auxHora}` : hora = auxHora
        auxMinuto < 10 ? minuto = `0${auxMinuto}` : minuto = auxMinuto
        retorno = `${hora} : ${minuto}`
    } else {
        let auxDia, auxMes
        let dia, mes, ano
        auxDia = valorDateTime.getDate()
        auxMes = valorDateTime.getMonth() + 1
        auxDia < 10 ? dia = `0${auxDia}` : dia = auxDia
        auxMes < 10 ? mes = `0${auxMes}` : mes = auxMes
        ano = valorDateTime.getYear() + 1900
        retorno = `${dia} / ${mes} / ${ano}`
    }
    return retorno
}

export default FormataDataHora