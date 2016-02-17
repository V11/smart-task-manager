/**
 * Created by kurpav on 2/14/16.
 */
var TaskListView = Backbone.View.extend({
	el: $("#stm"),
	model: TaskList,
	statsTemplate: _.template($("#stats-template").html()),
	events: {},
	initialize: function () {
		/*this.input = this.$("#new-todo");
		this.allCheckbox = this.$("#toggle-all")[0];

		this.listenTo(this.model, 'add', this.addOne);
		this.listenTo(this.model, 'reset', this.addAll);
		this.listenTo(this.model, 'all', this.render);

		this.footer = this.$('footer');
		this.main = $('#main');

		Todos.fetch();*/
	},
	render: function () {
		/*var done = this.model.done().length;
		var remaining = this.model.remaining().length;

		if (Todos.length) {
			this.main.show();
			this.footer.show();
			this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
		} else {
			this.main.hide();
			this.footer.hide();
		}

		this.allCheckbox.checked = !remaining;*/
	},
	addOne: function(todo) {
		/*var view = new TodoView({model: todo});
		this.$("#todo-list").append(view.render().el);*/
	},
	addAll: function() {
		/*this.model.each(this.addOne, this);*/
	},
	createOnEnter: function(e) {
		/*if (e.keyCode != 13) return;
		if (!this.input.val()) return;

		Todos.create({title: this.input.val()});
		this.input.val('');*/
	},
	clearCompleted: function() {
		/*_.invoke(Todos.done(), 'destroy');
		return false;*/
	},
	toggleAllComplete: function () {
		/*var done = this.allCheckbox.checked;
		Todos.each(function (todo) { todo.save({'done': done}); });*/
	}
});