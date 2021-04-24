const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://maor:11HPrGuDOb3UUrBY@cluster0.ictbi.mongodb.net/bankApi?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		// useFindAndModify: false,
	}
);
