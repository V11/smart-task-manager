/**
 * Created by kurpav on 2/14/16.
 */
var Task = Backbone.Model.extend({
	defaults: function() {
		return {
			title: "",
			content: "",
			priority: STM.TaskPriorities.MEDIUM,
			status: STM.TaskStatuses.OPENED,
			createdAt: Date.now(),
			deadline: 0
		};
	}
});