import Axios from 'axios'

export const returnFromApiAction = response => ({ type: 'DO_AFTER_CALL_ACTION', success: response.success, token: response.token });
export const doCallbackAction = cred => (dispatch) => {
	console.log('doCallbackAction');
	Axios.post('/authenticate', {
		email: cred.email,
		password: cred.password,
	})
	.then((response) => {
		console.log(response);
		dispatch(returnFromApiAction(response.body));
	})
	.catch((err) => {
		console.log(err);
	});
};