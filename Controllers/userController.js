const User = require('../Models/userModel');

// Create a new user
exports.addUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const newUser = new User({
			name,
			email,
			password,
		});

		const user = await newUser.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create user' });
	}
};

// Get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch users' });
	}
};

// Get a specific user
exports.getUser = async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId);

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user' });
	}
};

// Update a user
exports.updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const { name, email, password } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{ name, email, password },
			{ new: true }
		);

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to update user' });
	}
};

// Delete a user
exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await User.findByIdAndRemove(userId);

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete user' });
	}
};
