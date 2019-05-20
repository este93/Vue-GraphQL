module.exports = {
	Query: {
		getPets: async (_, args, { Pet }) => {
			const pets = await Pet.find({}).sort({ createdDate: 'desc' }).populate({
				path: 'createdBy', 
				model: 'User'
			});
			return pets;
		}
	},
	Mutation: {
		addPet: async(_, {name, description, race, image, creatorID}, {Pet}) => {
			const newPet = await new Pet({
				name, 
				description, 
				race, 
				image, 
				createdBy: creatorID
			}).save();
			return newPet;
		},
		signupUser: async (_, { username, email, password }, { User}) => {
			const user = await User.findOne({ username: username });
			if(user){
				throw new Error('User already exists');
			}

			const newUser = await new User({
				username, 
				email, 
				password
			}).save();
			return newUser;
		}
	}
}