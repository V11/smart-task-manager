/**
 * Created by kurpav on 2/14/16.
 */
var TaskList = Backbone.Collection.extend({
	model: Task,
	localStorage: new Backbone.LocalStorage("stm")
});