/**
 * Created by kurpav on 2/15/16.
 */
var TaskView = Backbone.View.extend({
	tagName: "tr",
	className: "task",
	template: _.template($("#task-template").html()),
	contentTemplate: _.template($("#content-template").html()),
	timeoutToDelete: null,
	showArchived: false,
	TIMEOUT_TO_DELETE: 10 * 1000,

	events: {
		"click .start": "start",
		"click .complete": "complete",
		"click .reopen": "reopen",
		"click .remove"   : "addProceedListener",
		"click .undo": "cancelDeleting",
		"click .edit": "edit",
		"click .toggle": "showContent"
	},
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, STM.Events.ARCHIVED, this.archive);
		this.listenTo(this.model, STM.Events.TOGGLE, this.toggle);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function () {
		var templateData = this.model.toJSON();
		templateData.createdAt = STM.utils.formatDate(new Date(templateData.createdAt));

		this.$el.html(this.template(templateData));
		this.clearStateClasses();
		this.$el.addClass(this.getStateClassName());

		if (this.$el.next().hasClass("task-content")) {
			this.$el.next().remove();
		}

		if (this.model.get("status") === STM.TaskStatuses.CLOSED
			&& !this.showArchived) {
			this.$el.hide();
		}

		return this;
	},
	clearStateClasses: function () {
		this.$el.removeClass("active warning success");
	},
	getStateClassName: function () {
		var result = "active";
		switch (this.model.get("status")) {
			case STM.TaskStatuses.PENDING:
				result = "warning";
				break;
			case STM.TaskStatuses.CLOSED:
				result = "success";
				break;
		}
		return result;
	},
	archive: function () {
		if (!this.showArchived) {
			this.$el.hide();
		}
	},
	toggle: function (isChecked) {
		this.showArchived = isChecked;
		if (this.model.get("status") === STM.TaskStatuses.CLOSED) {
			this.$el.toggle(isChecked);
		}
	},
	start: function () {
		this.model.start();
	},
	complete: function () {
		this.model.complete();
	},
	reopen: function () {
		this.model.reopen();
	},
	edit: function () {
		var modelJson = _.extend(this.model.toJSON(), {cid: this.model.cid}),
			selector = "";

		for (var key in modelJson) {
			selector = "#task-data *[name=" + key + "]";
			$(selector).val(modelJson[key]);
		}
		$('.selectpicker').selectpicker("val", modelJson.priority);
	},
	showContent: function () {
		if (this.$el.next().hasClass("task-content")) {
			this.$el.next().remove();
		} else {
			var content = this.contentTemplate({content: this.model.get("content")});
			this.$el.after(content);
		}
	},
	addProceedListener: function() {
		STM.eventDispatcher.on(STM.Events.PROCEED_REMOVING, this.aboutToDelete.bind(this));
	},
	aboutToDelete: function () {
		STM.eventDispatcher.off(STM.Events.PROCEED_REMOVING);
		this.$el.addClass("about-to-delete");
		this.timeoutToDelete = setTimeout(this.destroy.bind(this), this.TIMEOUT_TO_DELETE);
	},
	cancelDeleting: function () {
		clearTimeout(this.timeoutToDelete);
		this.$el.removeClass("about-to-delete");
	},
	destroy: function () {
		this.model.destroy();
	}
});