let data =  {
   name: "Luiz Guerra",
   avatar: "https://github.com/luizguerradev.png",
   "monthly-budget": 4200,
   "hours-per-day": 7,
   "days-per-week": 3,
   "vacation-per-year":5,
   "value-hour":75    
};

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }
}