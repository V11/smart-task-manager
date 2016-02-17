/**
 * Created by kurpav on 2/14/16.
 */
var STM = {};

STM.init = function () {
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	$("#datetimepicker").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
	$("#task-data").on("submit", function (e) {
		e.preventDefault();
		var data = decodeURIComponent($(this).serialize()),
			taskObj = {},
			tmp, key, value;
		data.split("&").forEach(function (el) {
			tmp = el.split("=");
			key = tmp[0];
			value = tmp[1];
			taskObj[key] = value;
		});

		return false;
	})
};

window.onload = STM.init();