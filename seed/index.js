const {
    sequelize,
		Gym,
		Gym_Branch,
		Account,
		Training,
} = require('../models')

const { asyncForEach } = require('../services/UtilService');
const Promise = require('bluebird')
const gyms = require('./gyms.json')
const accounts = require('./accounts.json')
const trainings = require('./trainings.json')
const gym_branches = require('./gym_branches.json')

let faker = require('faker');
let _ = require('lodash');


const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();


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
					await asyncForEach(_.range(1, 200), async () => {
						await Gym.create({
							name: faker.company.companyName(),
							email: faker.internet.email().toLowerCase(),
							phone: '+'+(faker.phone.phoneNumberFormat().replace('-','')).replace('-',''),
							logo: faker.image.avatar(),
							desc: faker.lorem.words(10)
						})
					});


					// Gym Branches from file
					await Promise.all(
						gym_branches.map(async gb => {
							await Gym_Branch.create(gb)
						})
					);

					// Fake gym branches
					await asyncForEach(_.range(1, 400), async () => {
						await Gym_Branch.create({
							address: faker.address.streetAddress(),
							city: faker.address.city(),
							country: faker.address.country(),
							GymId: faker.random.number({min:1, max:100})
						})
					});


					// Accounts from file
					await Promise.all(
						accounts.map(async gb => {
							await Account.create(gb)
						})
					);
					// Fake accounts
					await asyncForEach(_.range(1, 200), async () => {
						await Account.create({
							name: faker.name.findName(),
							username: faker.internet.userName().toLowerCase(),
							gender: faker.random.boolean() ? 'male' : 'female',
							role: faker.random.number() % 2 === 0 ? 'trainer' : (faker.random.number() % 3 === 0) ? 'manager' : 'user',
							is_verified: faker.random.boolean(),
							photo_url: faker.image.avatar(),
							password: faker.lorem.words(3),
							desc: faker.lorem.words(10),
							rate: faker.random.number(),
							permissions: [],
						})
					});


					// Accounts from file
					await Promise.all(
						trainings.map(async t => {
							await Training.create(t)
						})
					);
					// Fake accounts
					await asyncForEach(_.range(1, 200), async () => {

						const dayFactor = faker.random.number({min:1, max:30});
						const minFactor = faker.random.number({min:1, max:24});
						const is_free = faker.random.boolean();

						await Training.create({
							type: faker.random.boolean() ? 'cardio' : 'power',
							TrainerId: is_free ? null : faker.random.number({min:1, max:100}),
							GymBranchId: faker.random.number({min:1, max:100}),
							is_free: is_free,
							title: faker.random.boolean() ? 'Cardio Training' : faker.random.boolean() ? 'Stretching Training' : 'Power Training',
							className: is_free ? 'event-green' : faker.random.boolean() ? 'event-default' : 'event-red',
							ManagerId: "1",
							start: (new Date(y, m, d + dayFactor, minFactor, 0)).getTime(),
							end:   (new Date(y, m, d + dayFactor, minFactor + 3, 0)).getTime(),
						})
					});

				})
		})
};

module.exports.seed = seed;
