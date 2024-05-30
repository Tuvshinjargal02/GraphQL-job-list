import { GraphQLError } from "graphql";
import { getJobs, getJobsByCompanyId, createJob, deleteJob, updateJob } from "./controllers/jobs.js";
import { getCompanyById } from "./controllers/company.js";
import { getJobById } from "./controllers/job.js";

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: async (root, { id }) => {
            const job = await getJobById(id);
            if (!job) throwNotFoundError(`${id} id-тэй зар олдсонгүй!`);
            return job;
        },
        company: async (root, { id }) => {
            const company = await getCompanyById(id);
            if (!company) throwNotFoundError(`${id} id-тэй компани олдсонгүй!`);
            return company;
        },
    },

    Mutation: {
        createJob: (root, { input: { description, title } }, { user }) => {
            if (!user) {
                throwUnauthenicated(`Зарыг үүсгэхийн тулд та логин хийсэн байх ёстой !`);
              }
            return createJob(user.companyId, title, description);
        },
        deleteJob: async (root, { id }, { user }) => {
          if(!user) {
            throwUnauthenicated('Зарыг устгахын тулд нэвтэрж орсон байх шаардлагатай !')
          };
          let job = null;
          try{
            job = await deleteJob(id, user.companyId);
          } catch(error) {
            throwNotFoundError(error.message);
          };
          return job;
        },
        updateJob: async (root, { input: { id, title, description } }, { user }) => {
          if(!user){
            throwUnauthenicated('Зарыг өөрчлөхийн тулд нэвтэрж орсон байх шаардлагатай !')
          };
          let job = null;
          try{
            job = await updateJob({ id, title, description, companyId: user.companyId});
          }catch(error){
            throwNotFoundError(error.message);
          };
          return job
        },
    },

    Job: {
        date: (root) => root.createdAt.slice(0, "yyyy-mm-dd".length),
        company: (root) => getCompanyById(root.companyId),
    },

    Company: {
        jobs: (root) => getJobsByCompanyId(root.id),
    },
};

function throwNotFoundError(message) {
    throw new GraphQLError(message, {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  function throwUnauthenicated(message) {
    throw new GraphQLError(message, {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
