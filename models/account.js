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
		// validate(value) {
		// 	if (value < 0) {
		// 		throw new Error('must include at least 2 pics');
		// 	}
		// },
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
