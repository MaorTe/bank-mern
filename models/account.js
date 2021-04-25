const mongoose = require('mongoose');

// function makeAccount (id) {
const Account = mongoose.model('Account', {
	// @ts-ignore
	isActive: {
		type: Boolean,
		default: true,
	},
	cash: {
		type: Number,
		min: 0,
		default: 0,
	},

	credit: {
		type: Number,
		min: 0,
		default: 0,
	},
	// _id:id
});
// return Account;
// }
// const account = makeAccount(id)
module.exports = Account;
