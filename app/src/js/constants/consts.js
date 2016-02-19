/**
 * Created by kurpav on 2/14/16.
 */
var STM = STM || {};

STM.TaskStatuses = {
	OPENED: "Opened",
	PENDING: "Pending",
	CLOSED: "Closed"
};

STM.TaskPriorities = {
	LOW: "Low",
	MEDIUM: "Medium",
	HIGH: "High"
};

STM.TaskActions = {
	CREATE: "create",
	EDIT: "edit"
};

STM.Events = {
	TOGGLE: "toggle",
	ARCHIVED: "archived",
	PROCEED_REMOVING: "proceed-removing"
};