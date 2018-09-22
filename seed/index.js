const {
    sequelize,
    Users,
    Countries,
    Languages,
    Companies
} = require('../models')

const Promise = require('bluebird')
const users = require('./users.json')
const countries = require('./countries.json')
const languages = require('./languages.json')
const companies = require('./companies.json')


sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
    .then(function(results) {
        sequelize.sync({force: true})
            .then(async function () {

                await Promise.all(
                    countries.map(country => {
                        Countries.create(country)
                    })
                )

                await Promise.all(
                    languages.map(language => {
                        Languages.create(language)
                    })
                )

                await Promise.all(
                    companies.map(company => {
                        Companies.create(company)
                    })
                )

                await Promise.all(
                    users.map(user => {
                        Users.create(user)
                    })
                )
            })
    })

