import React, { Component } from 'react';

class Test2 extends Component {
	render() {
		return	(
			<div>
				bonjour
				<span onClick={() => this.props.test()}>cliquer ici</span>
			</div>
		);
	}
};

export default Test2;
