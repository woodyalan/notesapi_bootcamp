module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define(
    "Checklist",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      notaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "nota",
          key: "id",
        },
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "checklist",
      timestamps: false,
    }
  );

  return Checklist;
};
