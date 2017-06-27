module.exports = function checkMQ() {
	// check if mobile or desktop device
	return window.getComputedStyle(document.querySelector('.cd-projects-wrapper'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
}