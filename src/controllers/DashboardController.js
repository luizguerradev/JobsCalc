const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    //async por causa do await no profile.get
    async index(req, res){
        
        const jobs = Job.get();
        //await ligado ao async do Profile model
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done:  0,
            total: jobs.length
        }
        //total de horas de por dia de cada Job em andamento
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            //ajustes no job
                const remaining = JobUtils.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                //somando a quantidade de status
                statusCount[status] +=1;
                //total de horas de por dia de cada Job em andamento
                //if(status == 'progress'){
                //jobTotalHours += Number(job['daily-hours'])
               // }
                //↑ normal em ↓ ternário
                jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours  


                return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
                }
    })


    const freeHours = profile["hours-per-day"] - jobTotalHours;
    
    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })

    }
    }