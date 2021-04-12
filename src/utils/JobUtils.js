
module.exports =  {
    remainingDays(job){
         //cálculos de tempo de restante
         const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
         const createdDate = new Date(job.created_at)
         const dueDay = createdDate.getDate() + Number(remainingDays)
         const dueDateInMs = createdDate.setDate(dueDay)
    
         const timeDiffInMs = dueDateInMs - Date.now()
         // TRANSFORMAR MILISSEGUNDOS EM DIAS
         const dayInMs = 1000 * 60 * 60 * 24
         const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
         // restam tantos dias
         return dayDiff
    
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
}
    //findId(job){
     //    const jobId = req.params.id
         //find = procurar o numero 
     //    const job = Job.data.find(job => Number(job.id) === Number(jobId) )

     //    if (!job){
     //        return res.send('Job not found!')
     //    }

     //    return findId()
   // }

