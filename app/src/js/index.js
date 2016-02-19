/**
 * Created by kurpav on 2/14/16.
 */
var STM = STM || {};

STM.eventDispatcher = {};

_.extend(STM.eventDispatcher, Backbone.Events);

STM.init = function () {
	var taskListView = new TaskListView({model: new TaskList({})});
};

window.onload = STM.init();