/**
 * Created by kurpav on 2/14/16.
 */
var STM = {};

STM.init = function () {
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};


};

window.onload = STM.init();