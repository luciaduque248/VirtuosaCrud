import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colores = {
	borde: "#aa95c7",
	error: "#bb2929",
	exito: "#f29778"
}

const Formulario = styled.form`
    background: #f7f3f1;
    padding: clamp(32px, 5vw, 64px);
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 24px 20px;
	@media (max-width: 800px){
		grid-template-columns: 1fr;
	}
`;

const Label = styled.label`
	display: block;
	font-weight: 700;
	color: #3b343c;
	padding: 0 2px 9px;
	min-height: 0;
    font-size: 11px;
    letter-spacing: .4px;
	cursor: pointer;
	${props => props.valido === 'false' && css`
		color: ${colores.error};
	`}
`;



const GrupoInput = styled.div`
	position: relative;
	z-index: 90;
`;

const Input = styled.input`
	width: 100%;
	background: #fff;
	border-radius: 12px;
	height: 54px;
	line-height: 54px;
	padding: 0 44px 0 16px;
	transition: .3s ease all;
	border: none;
	border: 1px solid #d4cad2;
	&:focus {
		border: 1px solid ${colores.borde};
		outline: none;
		box-shadow: 0 0 0 4px rgba(170,149,199,.14);
	}
	${props => props.valido === 'true' && css`
		border: 1px solid #d4cad2;
	`}
	${props => props.valido === 'false' && css`
		border: 1px solid ${colores.error} !important;
	`}
`;

const LeyendaError = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: ${colores.error};
	display: none;
	${props => props.valido === 'true' && css`
		display: none;
	`}
	${props => props.valido === 'false' && css`
		display: block;
	`}
`;

const IconoValidacion = styled(FontAwesomeIcon)`
	position: absolute;
	right: 10px;
	bottom: 14px;
	z-index: 100;
	font-size: 16px;
	opacity: 0;
	${props => props.valido === 'false' && css`
		opacity: 1;
		color: ${colores.error};
	`}
	${props => props.valido === 'true' && css`
		opacity: 1;
		color: ${colores.exito};
	`}
`;

const ContenedorTerminos = styled.div`
	grid-column: span 2;
	input {
		margin-right: 10px;
	}
	@media (max-width: 800px){
		grid-column: span 1;
	}
`;

const ContenedorBotonCentrado = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	grid-column: span 2;
	@media (max-width: 800px){
		grid-column: span 1;
	}
`;

const Boton = styled.button`
	height: 56px;
	line-height: 56px;
	width: min(100%, 320px);
	background: #332d35;
	color: #fff;
	font-weight: bold;
	border: none;
	border-radius: 999px;
    font-family: inherit;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
	cursor: pointer;
	transition: .1s ease all;
	&:hover {
		background: #725b77;
		box-shadow: 0 12px 30px rgba(51,45,53,.18);
	}
`;

const MensajeExito = styled.p`
	font-size: 14px;
	color: ${colores.exito};
`;

const MensajeError = styled.div`
	height: 45px;
	line-height: 45px;
	background: #f29778;
	padding: 0px 15px;
	border-radius: 3px;
	grid-column: span 2;
	p {
		margin: 0;
	} 
	b {
		margin-left: 10px;
	}
`;

export {
	Formulario,
	Label,
	GrupoInput,
	Input,
	LeyendaError,
	IconoValidacion,
	ContenedorTerminos,
	ContenedorBotonCentrado,
	Boton,
	MensajeExito,
	MensajeError
};
