const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {

    create(req, res){
        return res.render("job")
    },

    async save(req, res,){
            //req.body =  { name: 'null', 'daily-hours': '3.5', 'total-hours': '4' }
            //const job = req.body
            //job.created_at = Date.now() //atribuindo uma nova data
                  
        await Job.create({
            name: req.body.name, 
            "daily-hours": req.body["daily-hours"], 
            "total-hours": req.body["total-hours"],
            created_at: Date.now() //atribuindo data de hoje
            });

            return res.redirect('/')
    },

    async show(req, res){
        const jobId = req.params.id

        const jobs = await Job.get();

        //find = procurar o numero 
        const job = jobs.find(job => Number(job.id) === Number(jobId) )

        if (!job){
            return res.send('Job not found! -async show-')
          
        }
        const profile = await Profile.get()


        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])


        return res.render("job-edit", { job })
    },

    async update (req, res){
        
        const jobId = req.params.id
        
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },
    
     async delete ( req, res){
        const jobId = req.params.id
        
        await Job.delete(jobId)
      
        
        // redirect to index page
        return res.redirect('/')


    }
}