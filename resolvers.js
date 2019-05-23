const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user;
	return jwt.sign({ username, email }, secret, { expiresIn });
}

module.exports = {
	Query: {
		getAnimals: async (_, args, { Animal }) => {
			const animals = await Animal.find({}).sort({ createdDate: 'desc' });
			return animals;
		},
		getPets: async (_, args, { Pet }) => {
			const pets = await Pet.find({}).sort({ createdDate: 'desc' }).populate({
				path: 'createdBy', 
				model: 'User',
				path: 'race', 
				model: 'Animal'
			});
			return pets;
		}
	},
	Mutation: {
		signinUser: async (_, { username, password }, { User }) => {
			const user = await User.findOne({ username });
			if(!user){
				throw new Error('User not found');
			}
			const isValidPassword = await bcrypt.compare(password, user.password);
			if(!isValidPassword){
				throw new Error('Invalid Password');
			}	
			return { token: createToken(user, process.env.SECRET, '1hr') };
		},

		signupUser: async (_, { username, email, password }, { User }) => {
			const user = await User.findOne({ username });	
			if(user){
				throw new Error('User already exists');				
			}

			const newUser = await new User({
				username,
				email,
				password
			}).save();
			return { token: createToken(newUser, process.env.SECRET, '1hr') };
		},

		addAnimal: async(_, {name, description, image}, { Animal }) => {
			const animal = await Animal.findOne({ name });
			if(animal){
				throw new Error('Animal already exists');
			}

			const newAnimal = await new Animal({
				name,
				description,
				image
			}).save();
			return newAnimal;
		},

		addPet: async(_, {name, description, raceID, image, creatorID}, { Pet }) => {
			const newPet = await new Pet({
				name, 
				description, 
				race: raceID, 
				image, 
				createdBy: creatorID
			}).save();
			return newPet;
		},
	}
}