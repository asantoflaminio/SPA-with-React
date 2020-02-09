import axios from 'axios';

const CancelTokenService = (function() {
	const CancelToken = axios.CancelToken;
	let source = CancelToken.source();

	function _getSource() {
		return source;
	}

	function _refreshToken() {
		source = CancelToken.source();
	}

	function _isCancel(thrown) {
		return axios.isCancel(thrown);
	}

	return {
		getSource: _getSource,
		refreshToken: _refreshToken,
		isCancel: _isCancel,
	};
})();

export default CancelTokenService;
