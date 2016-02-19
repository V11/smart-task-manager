/**
 * Created by kurpav on 2/14/16.
 */
var TaskListView = Backbone.View.extend({
	el: $("#stm"),
	model: TaskList,
	events: {
		"change #archived-tasks": "toggleCompleted",
		"submit #task-data": "processTask",
		"show.bs.modal #task": "onTaskDialogOpened",
		"hidden.bs.modal #remove-task": "onRemoveDialogClosed",
		"click #proceed-removing": "proceedRemoving"
	},
	initialize: function () {
		this.initView();

		this.listenTo(this.model, 'add', this.addOne);

		this.model.fetch();
	},
	initView: function () {
		$("#datetimepicker").datetimepicker({
			format: 'yyyy-mm-dd hh:ii',
			todayHighlight: true,
			autoclose: true
		});

		var removeErrClass = function () {
			$(this).parent().removeClass("has-error");
		};

		$("input[name=title]").focus(removeErrClass);
		$("textarea[name=content]").focus(removeErrClass);
	},
	addOne: function (todo) {
		var view = new TaskView({model: todo});
		this.$("#task-list").append(view.render().el);
		todo.save();
	},
	processTask: function (e) {
		e.preventDefault();

		var data = $(e.currentTarget).serializeArray(),
			taskObj = {},
			task = null;
		data.forEach(function (el) {
			taskObj[el.name] = el.value;
		});

		if (!this.validateForm(taskObj.title, taskObj.content)) {
			return false;
		}

		if (taskObj.cid !== "") {
			task = this.model.get({cid: taskObj.cid});
			task.save(taskObj);
		} else {
			task = new Task(taskObj);
			this.model.add(task);
		}

		this.resetForm();
		$("#task").modal("hide");

		return false;
	},
	validateForm: function (title, content) {
		var titleElParent = $("input[name=title]").parent(),
			contentElParent = $("textarea[name=content]").parent(),
			result = true;

		if (title === "") {
			titleElParent.addClass("has-error");
			result = false;
		} else {
			titleElParent.removeClass("has-error");
		}

		if (content === "") {
			contentElParent.addClass("has-error");
			result = false;
		} else {
			contentElParent.removeClass("has-error");
		}
		return result;
	},
	onTaskDialogOpened: function (e) {
		var titleSelector = "#task .modal-title",
			action = $(e.relatedTarget).data("action");
		if (action === STM.TaskActions.CREATE) {
			$(titleSelector).text("New task");
			this.resetForm();
		} else {
			$(titleSelector).text("Edit task");
		}
	},
	resetForm: function () {
		$("#task-data")[0].reset();
		$("#task-data input[name=cid]").val("");
	},
	toggleCompleted: function (e) {
		this.model.forEach(function (task) {
			task.toggle(e.currentTarget.checked);
		})
	},
	proceedRemoving: function () {
		$("#remove-task").modal("hide");
		STM.eventDispatcher.trigger(STM.Events.PROCEED_REMOVING);
	},
	onRemoveDialogClosed: function () {
		STM.eventDispatcher.off(STM.Events.PROCEED_REMOVING);
	}
});