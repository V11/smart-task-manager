/**
 * Created by kurpav on 2/18/16.
 */
var STM = STM || {};
STM.utils = {
	formatDate: function (date) {
		return date.getFullYear() + "-" +
				this.formatNumber(date.getMonth()) + "-" +
				this.formatNumber(date.getDate()) + " " +
				this.formatNumber(date.getHours()) + ":" +
				this.formatNumber(date.getMinutes());
	},
	formatNumber: function (val) {
		return val < 10 ? "0" + val : val.toString();
	}
};