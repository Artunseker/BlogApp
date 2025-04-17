const { DataTypes }=require('sequelize');
const sequelize=require('../data/db.js');

const Categories=sequelize.define('category',{
    categoryid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    },{
        timestamps:false
});

async function sync(){
    await Categories.sync({alter:true});
    console.log("Category table created");
    //test verisi koyabilirsin
    if(Categories.count==0){
        const c1=await Categories.create({
            name:"mobile"
        });

        console.log(c1.name);

        await Categories.bulkCreate([
            {name:"mobile"},
            {name:"laptop"},
            {name:"tablet"},
        ]);
    }
}

sync();

module.exports=Categories;