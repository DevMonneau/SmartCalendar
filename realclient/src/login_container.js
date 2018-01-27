import { connect } from 'react-redux'
import Login from './login'

import {
	doCallbackAction,
} from './action'

// Variable renvoyée par redux
const mapStateToProps = state => ({
	return: state.login.return,
	token: state.login.token,
});

// Fonction utilisée pour appeler le back avec redux
// Ou changer l'état général du site
const mapDispatchToProps = dispatch => ({
	doBackCall: (cred) => { dispatch(doCallbackAction(cred)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);