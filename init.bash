sequelize model:generate --name users --attributes userName:string,password:string,email:string,followers:string,following:string,profilePic:string,roleID:integer

sequelize model:generate --name roles --attributes name:string

sequelize model:generate --name drawings --attributes title:string,body:text,userID:integer,is_published:boolean
