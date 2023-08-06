import gql from "graphql-tag";

export const EMAIL_SIGN_IN = gql`
mutation EmailLogIn($email:String!){
    emailLogin(loginWithEmail:{email:$email}){
      code
    }
  }
`;

export const VERIFICATION_CODE = gql`
mutation VerifyEmail($email:String!, $code:String!){
    verifyEmail(verifyEmail:{email:$email,code:$code}){
      token
    }
  }
`;

export const GOOGLE_SIGN_IN = gql`
mutation GoogleSignIn($token:String!){
    googleLogin(loginWithGoogle:{token:$token}){
      token
    }
  }
`;

export const META_SIGN_IN = gql`
mutation MetaSignIn($token:String!){
    metaLogin(loginWithMeta:{token:$token}){
      token
    }
  }
`;

export const GET_USER_TOPICS = gql`
query GetUserTopics($type:String!, $page:Float!, $pageSize:Float!){
  getUserTopics(filter:{type:$type ,isDelete:false},pagination:{page:$page,pageSize:$pageSize}){
    userTopics{
      id,
      type,
      shortName,
      topic,
      completeTopic,
      score,
      createdAt
    }
  }
}
`;

export const GET_USER_ESSAY = gql`
query GetUserEssay($id:String!, $page:Float!, $pageSize:Float!){
  getUserEssay(getEssayInput:{id:$id },pagination:{pageSize:$pageSize,page:$page}){
    essaies{
      essay,
      date,
      taskAchievementScore,
      taskAchievementSummery,
      coherenceAndCohesionScore,
      coherenceAndCohesionSummery,
      lexicalResourceScore,
      lexicalResourceSummery,
      grammaticalRangeAndAccuracyScore,
      grammaticalRangeAndAccuracySummery
    }
  }
}
`;

export const GET_RANDOM_GENERAL_TASK1_WRITING = gql`
query{
  getRandomWriting(type:GENERAL_TASK_1){
    id,
    topic,
    body,
    tone
  }
}
`;

export const SELECT_TOPIC = gql`
mutation SelectTopic($type:String! , $body:String, $id:String){
  selectTopic(selecetTopic:{type:$type ,body:$body, id:$id})
  {
    id,
    type,
    shortName,
    topic,
    completeTopic,
    score,
    createdAt
  }
}
`;

export const ADD_ESSAY = gql`
mutation AddEssay($id:String! , $body: String!){
  addEssay(addEssay:{id:$id ,body:$body}){
    taskAchievementScore,
    taskAchievementSummery,
    coherenceAndCohesionScore,
    coherenceAndCohesionSummery,
    grammaticalRangeAndAccuracyScore,
    grammaticalRangeAndAccuracySummery,
    essay,
    date,
  }
}
`;