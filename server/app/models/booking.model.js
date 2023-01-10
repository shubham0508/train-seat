const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("seat_booking", 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seatsAllocated: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allocatedSeatsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }
  );

  return Tutorial;
};
