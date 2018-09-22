'use strict';
module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Relationships', {
        visits      : { type: DataTypes.INTEGER,    allowNull: true, defaultValue: 1 },
        time        : { type: DataTypes.DATE,       allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    },{
        timestamps : false
    });

    Model.associate = function(models){
        Model.belongsTo(models.Users);
        Model.belongsTo(models.Companies);
    };

    Model.monthlyNewGuests = function (companyId) {
        return sequelize.query(`SELECT DATE_FORMAT(time, '%M') as date, time, COUNT(*) as cnt FROM Relationships WHERE CompanyId = :companyId GROUP BY date ORDER BY time`, { replacements: {companyId: companyId}, type: sequelize.QueryTypes.SELECT})
            .then(ads => {
                return ads;
            })
            .catch(err => {
                console.log(err);
                TE(err)
            })
    };

    Model.prototype.incrementVisits = function () {
        this.visits += 1;
    };

    Model.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
