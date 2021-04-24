const express = require('express');
// @ts-ignore
const router = new express.Router();
const Account = require('../models/account');
const {
	withdraw,
} = require('../utils/utils');

//get all accounts ---------------
router.get('/api/accounts', async (req, res) => {
	try {
		//empty '{}' will find and fetch all users
		const accounts = await Account.find({});
		res.status(201).send(accounts);
	} catch (e) {
		//internal server error
		res.status(500).send();
	}
});

//add a new account --------------
router.post('/api/accounts', async (req, res) => {
	const account = new Account(req.body);
	try {
		await account.save();
		res.status(201).send(account);
	} catch (e) {
		res.status(400).send(e);
	}
});

//fetch accounts by amount of cash they have----------------
router.get('/api/accounts/filter/cash', async (req, res) => {
	const { mincash } = req.query;
	try {
		const accounts = await Account.find({ cash: { $gte: mincash } });
		res.status(201).send(accounts);
	} catch (e) {
		//internal server error
		res.status(500).send();
	}
});

//get a single user----------------
router.get('/api/accounts/:id', async (req, res) => {
	// const { id } = req.params;
	const _id = req.params.id;
	try {
		const account = await Account.findById(_id);
		if (!account) {
			res.status(404).send({ error: 'No account found' });
		}
		res.status(200).send(account);
	} catch (e) {
		res.status(500).send();
	}
});

//transfer cash from user1 to user2
router.patch(`/api/accounts/:id1&:id2/transfer`, async (req, res) => {
	const updates = Object.keys(req.body);
	const { id1 } = req.params;
	const { id2 } = req.params;
	const allowedUpdates = Object.keys(Account.schema.obj);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		//validate if accounts are active or exist
		const acc1 = await Account.findById(id1);
		const acc2 = await Account.findById(id2);
		if (!acc1) {
			return res.status(404).send({ error: 'first account not found' });
		} else if (!acc2) {
			return res.status(404).send({ error: 'second account not found' });
		}
		// @ts-ignore
		if (!acc1.isActive) {
			return res.status(400).send({ error: 'first account is not active' });
			// @ts-ignore
		} else if (!acc2.isActive) {
			return res.status(400).send({ error: 'second account is not active' });
		}

		//if both account are active/exist, transfer cash from user1 to user 2:
		const account1 = await Account.findByIdAndUpdate(
			req.params.id1,
			// @ts-ignore
			withdraw(acc1, req.body['cash']),
			{
				new: true,
				runValidators: true,
			}
		);
		const account2 = await Account.findByIdAndUpdate(
			req.params.id2,
			// @ts-ignore
			{
				$inc: { cash: req.body['cash'] },
			},
			{
				new: true,
				runValidators: true,
			}
		);
		res.send({ account1, account2 });
	} catch (e) {
		//possible to have server related issue or validation related issue
		res.status(400).send({ error: 'something went wrong' });
	}
});

//update an account info (Depositing,Update credit,Withdraw money)
router.patch(`/api/accounts/:id1/:type`, async (req, res) => {
	//lines 77-84:
	//error handling, for the user will not impact the functionality, we were not already able to update properties that didnt exist.
	//its in order to provide the user with more info.
	const updates = Object.keys(req.body);

	const { type } = req.params;
	const { id1 } = req.params;
	const allowedUpdates = Object.keys(Account.schema.obj);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const acc1 = await Account.findById(id1);
		// @ts-ignore
		if (!acc1.isActive) {
			return res.status(400).send({ error: 'User account is not active' });
		}
		if (!acc1) {
			return res.status(404).send({ error: 'Account not found' });
		}
		const account = await Account.findByIdAndUpdate(
			req.params.id1,
			// @ts-ignore
			(type === 'cash' && {
				$inc: { cash: req.body['cash'] },
			}) ||
				(type === 'credit' && { credit: req.body['credit'] }) ||
				(type === 'withdraw' && withdraw(acc1, req.body['cash'])),
			{
				new: true,
				runValidators: true,
			}
		);
		res.send(account);
	} catch (e) {
		//possible to have server related issue or validation related issue
		res.status(400).send({ error: 'something went wrong' });
	}
});

module.exports = router;
