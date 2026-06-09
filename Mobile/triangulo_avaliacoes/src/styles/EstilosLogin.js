import { StyleSheet } from 'react-native';
import {
    corPrincipal,
    corAzulEscuro,
    corPerigo,
    corBranco,
    corTextos,
    corFundo,
    corFundo2
} from './Estilos';

const corCard = corBranco;
const corTextoEscuro = corTextos;
const corBordaInput = 'rgba(0, 87, 168, 0.1)';
const corFundoInput = 'rgba(244, 247, 251, 0.8)';
const corIcone = corAzulEscuro;
const corPlaceholder = 'rgba(0, 87, 168, 0.5)';
export const coresLogin = {
    icone: corIcone,
    placeholder: corPlaceholder
};

export const EstilosLogin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: corFundo
    },
    gradiente: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: corFundo
    },
    containerTeclado: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    iconeLogo: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    nomeApp: {
        margin: 0,
        fontSize: 28,
        fontWeight: '700',
        color: corPerigo
    },
    subtituloApp: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: '400',
        color: corPerigo
    },
    conteudoPrincipal: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center'
    },
    formularioLogin: {
        backgroundColor: corCard,
        paddingVertical: 22,
        paddingHorizontal: 20,
        borderRadius: 14,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#031e42',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)'
    },
    titulo: {
        fontSize: 20,
        marginBottom: 16,
        color: corAzulEscuro,
        fontWeight: '700',
        textAlign: 'center'
    },
    grupoInput: {
        position: 'relative',
        width: '100%',
        marginBottom: 12,
        justifyContent: 'center',
        backgroundColor: corFundoInput,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: corBordaInput
    },
    iconeInput: {
        position: 'absolute',
        left: 12,
        color: corIcone,
        fontSize: 20
    },
    input: {
        width: '100%',
        paddingVertical: 12,
        paddingLeft: 40,
        paddingRight: 42,
        borderRadius: 10,
        fontSize: 15,
        color: corTextoEscuro
    },
    alternarVisibilidade: {
        position: 'absolute',
        right: 10,
        padding: 5
    },
    entreOpcoes: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rotuloCheckbox: {
        color: corTextos,
        fontSize: 14,
        marginLeft: 6
    },
    esqueceuSenha: {
        fontSize: 14,
        color: corPrincipal
    },
    mensagemFeedback: {
        width: '100%',
        minHeight: 22,
        marginTop: 12,
        color: corPerigo,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    botaoEntrar: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: corPrincipal,
        shadowColor: corPrincipal,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    textoBotaoEntrar: {
        color: corBranco,
        fontSize: 16,
        fontWeight: '700'
    }
});

export default EstilosLogin;
