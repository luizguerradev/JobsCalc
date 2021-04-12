let data = [
    {
        id: 1,
        name: "Pizzaria Guloso", 
        "daily-hours": 2, 
        "total-hours": 5,
        created_at: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project", 
        "daily-hours": 3, 
        "total-hours": 47,
        created_at: Date.now(),
    },
];

module.exports = {
    get(){
        return data;
    },
    update(newJob){
        data = newJob
    },
    delete(id){
        data = data.filter(job => Number(job.id) !== Number(id))

          //atualiza o id dos jobs caso o id do job deletado seja menor
          data.forEach(job => {
            if (id < job.id) id = id - 1
        })
    }
}