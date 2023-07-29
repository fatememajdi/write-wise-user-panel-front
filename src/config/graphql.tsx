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
query GetUserTopics($type:String!){
  getUserTopics(filter:{type:$type ,isDelete:false},pagination:{page:1,pageSize:1000}){
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
query GetUserEssay($id:String!){
  getUserEssay(getEssayInput:{id:$id },pagination:{pageSize:50,page:1}){
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
`