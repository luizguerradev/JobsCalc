module.exports = {

    index(req, res){
    const updatedJobs = Job.data.map((job) => {
      //ajustes no job
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
  
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
    })

    
      
    return res.render("index", { jobs: updatedJobs })
    
    },

    create(req, res){
        return res.render("job")
    },

    save(req, res,){
            //req.body =  { name: 'null', 'daily-hours': '3.5', 'total-hours': '4' }
            //const job = req.body
            //job.created_at = Date.now() //atribuindo uma nova data
            // busca o ultimo id e pergunta.. se já tem id faz o -1 ou se não tiver posição é 1
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name, 
                "daily-hours": req.body["daily-hours"], 
                "total-hours": req.body["total-hours"],
                created_at: Date.now() //atribuindo data de hoje
            })

            return res.redirect('/')
    },

    show(req, res){
        const jobId = req.params.id
        //find = procurar o numero 
        const job = Job.data.find(job => Number(job.id) === Number(jobId) )

        if (!job){
            return res.send('Job not found!')
        }


        job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])


        return res.render("job-edit", { job })
    },

    update (req, res){
        const jobId = req.params.id
        //find = procurar o numero 
        const job = Job.data.find(job => Number(job.id) === Number(jobId) )

        if (!job){
            return res.send('Job not found!')
        }

        const updateJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        Job.data = Job.data.map(job => {
            
            if(Number(job.id) === Number(jobId)){
                job = updateJob
            }
            return job
        })

        res.redirect('/job/' + jobId)
    },
    
    delete ( req, res){
        const deleteJobId = req.params.id
        
        // se o id do job for igual ao passado, não retorna ele
        Job.data = Job.data.filter(job => Number(job.id) !== Number(deleteJobId))

        //atualiza o id dos jobs caso o id do job deletado seja menor
        Job.data.forEach(job => {
            if (deleteJobId < job.id) job.id = job.id - 1
        })
        
        // redirect to index page
        return res.redirect('/')


    }
}