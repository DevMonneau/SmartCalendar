const loginInitState = {
	return: false,
	token: "",
};

export default function (state = loginInitState, action) {
	if (action.type === 'DO_AFTER_CALL_ACTION') {
		console.log('Reçu token: ' + action.token);
		return {
			...state,
			token: action.token,
			return: action.success,
		};
	}

	return state;
}