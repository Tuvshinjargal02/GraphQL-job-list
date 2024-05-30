import { ApolloClient, InMemoryCache, createHttpLink, gql, ApolloLink, concat } from '@apollo/client';


const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

const authenticationLink = new ApolloLink( (operation, forward) => {
  const token = localStorage.getItem("job_app_token");
  if(token) {
    operation.setContext({
      headers: {Authorization: `Bearer ${token}`},
    },)
  };
  return forward(operation);
});

const roundTripLink = new ApolloLink((operation, forward) => {
 
  operation.setContext({ start: new Date() });

  return forward(operation).map((data) => {
    
    const time = new Date() - operation.getContext().start;
    console.log(`Operation ${operation.operationName} took ${time} to complete`);
    return data;
  });
});

const clientApollo = new ApolloClient({
  link: concat(authenticationLink, httpLink, roundTripLink),
  cache: new InMemoryCache(),
});

export async function updateJob(id, title, description) {
  const mutation = gql`
    mutation updateJob($input: UpdateJobInput) {
      job: updateJob(input: $input) {
        id
        title
        description
      }
    }
  `;
  
  const { data } = await clientApollo.mutate({ mutation, variables: {
    input: { id, title, description },
  }, });
  return data.job;
};

export async function deleteJob(id) {
  const mutation = gql`
    mutation deleteJob($id: String!) {
      job: deleteJob(id: $id) {
        id
        title
        description
      }
    }
  `;

  const { data } = await clientApollo.mutate({ mutation, variables: { id }, });
  return data.job;
};

export async function createJob(title, description) {
  const mutation = gql`
    mutation createJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
 
  const { data } = await clientApollo.mutate({ mutation, variables: {
    input: { title, description },
  },});
  return data.job;
};

export async function getCompanyById(companyId) {
  const query = gql`
    query getCompany($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description
        jobs {
          id
          title
          description
          date
          company {
            id
            name
          }
        }
      }
    }
  `;

  const { data } = await clientApollo.query({ query, variables: { companyId } });
  return data.company;
};

export async function getJobById(jobId) {
  const query = gql`
    query getJob($jobId: ID!) {
      job(id: $jobId) {
        title
        description
        date
        company {
          id
          name
        }
      }
    }
  `;

  const { data } = await clientApollo.query({ query, variables: { jobId } });
  return data.job;
};

export async function getJobs() {
  const query = gql`
    query getJobs {
      jobs {
        id
        title
        description
        date
        company {
          id
          name
        }
      }
    }
  `;

  const { data } = await clientApollo.query({ query, fetchPolicy: "network-only" });
  return data.jobs;
};
