const {
    sequelize,
		Gym,
		Gym_Branch,
		Account,
} = require('../models')

const Promise = require('bluebird')
const gyms = require('./gyms.json')
const accounts = require('./accounts.json')
const gym_branches = require('./gym_branches.json')

let faker = require('faker');
let _ = require('lodash');

const seed = function() {
	sequelize
		.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
		.then(function(results) {
			sequelize.sync({force: true})
				.then(async function () {

					// Gyms from file
					await Promise.all(
						gyms.map(async gym => {
							await Gym.create(gym)
						})
					);

					// Fake gyms
					_.range(1, 200).map(async () => {
						await Gym.create({
							name: faker.company.companyName(),
							email: faker.internet.email().toLowerCase(),
							phone: '+'+(faker.phone.phoneNumberFormat().replace('-','')).replace('-',''),
							logo: faker.image.avatar(),
							desc: faker.lorem.words(30)
						})
					})


					// Gym Branches from file
					await Promise.all(
						gym_branches.map(async gb => {
							await Gym_Branch.create(gb)
						})
					);

					// Fake gym branches
					_.range(1, 400).map(async () => {
						await Gym_Branch.create({
							address: faker.address.streetAddress(),
							city: faker.address.city(),
							country: faker.address.country(),
							GymId: faker.random.number({min:1, max:100})
						})
					})


					// Accounts from file
					await Promise.all(
						accounts.map(async gb => {
							await Account.create(gb)
						})
					);
					// Fake accounts
					_.range(1, 400).map(async () => {
						await Account.create({
							name: faker.name.findName(),
							username: faker.internet.userName().toLowerCase(),
							gender: faker.random.boolean() ? 'male' : 'female',
							role: faker.random.number() % 2 === 0 ? 'trainer' : (faker.random.number() % 3 === 0) ? 'manager' : 'user',
							is_verified: faker.random.boolean(),
							photo_url: faker.image.avatar(),
							password: faker.lorem.words(3),
							desc: faker.lorem.words(33),
							rate: faker.random.number(),
							permissions: [],
						})
					})
				})
		})
};

module.exports.seed = seed;
