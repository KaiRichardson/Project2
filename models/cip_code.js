/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var CipTable = sequelize.define("CipTable", {
    cip_code: {
      type: DataTypes.DECIMAL(6, 4),
      allowNull: false
    },
    cip_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stem: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  CipTable.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    CipTable.belongsTo(models.Student, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return CipTable;
};
