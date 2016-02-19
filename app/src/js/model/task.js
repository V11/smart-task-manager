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
			createdAt: new Date(),
			deadline: 0
		};
	},
	start: function () {
		this.save({status: STM.TaskStatuses.PENDING});
	},
	complete: function () {
		this.save({status: STM.TaskStatuses.CLOSED});
		this.trigger(STM.Events.ARCHIVED);
	},
	reopen: function () {
		this.save({status: STM.TaskStatuses.OPENED});
	},
	toggle: function(isChecked) {
		this.trigger(STM.Events.TOGGLE, isChecked);
	}
});