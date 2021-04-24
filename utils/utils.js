//---- withdraw ----
const withdraw = (account, cash) => {
	if (account.cash > 0) {
		if (cash > account.cash + account.credit)
			return `cant withdraw more than ${account.cash + account.credit}`;
		account.cash -= cash;
		if (account.cash < 0) {
			account.credit += account.cash;
		}
	} else if (account.credit > 0 && account.cash <= 0) {
		if (account.credit - cash < 0)
			return `cant withdraw more than ${account.credit}`;
		account.credit -= cash;
		account.cash -= cash;
	} else return 'cannot withdraw anymore';
	return { cash: account.cash, credit: account.credit };
};

module.exports = {
	withdraw,
};
