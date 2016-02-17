/**
 * Created by kurpav on 2/15/16.
 */
var TaskView = Backbone.View.extend({
	tagName: "li",
	template: _.template($("#task-template").html()),
	events: {

	},
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		//this.$el.toggleClass('done', this.model.get('done'));
		//this.input = this.$('.edit');
		return this;
	},
	edit: function () {

	},
	close: function () {

	},
	updateOnEnterKey: function (e) {
		//if (e.keyCode == 13) this.close();
	},
	clear: function() {
		this.model.destroy();
	}
});