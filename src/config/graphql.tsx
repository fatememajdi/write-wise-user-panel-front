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
      overallBandScore,
      createdAt,
      visuals{
        id,
        url,
        image
      }
    }
  }
}
`;

export const GET_USER_ESSAY = gql`
query GetUserEssay($id:String!, $page:Float!, $pageSize:Float!){
  getUserEssay(getEssayInput:{id:$id },pagination:{pageSize:$pageSize,page:$page}){
    essaies{
      id,
      essay,
      date,
      taskAchievementScore,
      taskAchievementSummery,
      coherenceAndCohesionScore,
      coherenceAndCohesionSummery,
      lexicalResourceScore,
      lexicalResourceSummery,
      grammaticalRangeAndAccuracyScore,
      grammaticalRangeAndAccuracySummery,
      overallBandScore,
      durationMillisecond,
      essayRecommendations,
      essayInsights
    }
  }
}
`;

export const GET_RANDOM_WRITING = gql`
query GetRandomWriting($type:String!,$questionType:String!){
  getRandomWriting(randomWritingInput:{type:$type,questionType:$questionType}){
    id,
    topic,
    body,
    tone,
    questionType
  }
}
`;

export const GET_RANDOM_WRITING_AC_TASK = gql`
query GetRandomWriting($type:String!){
  getRandomWriting(randomWritingInput:{type:$type,questionType:""}){
    id,
    topic,
    body,
    tone,
    questionType,
    visuals{
      id,
      url,
      image
    }
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
    overallBandScore,
    createdAt,
    overallBandScore,
    visuals{
      id,
      url,
      image
    }
  }
}
`;

export const ADD_ESSAY = gql`
mutation AddNewEssay($id:String! , $body: String! ,$durationMillisecond:Float!){
  addNewEssay(addEssay:{id:$id ,body:$body ,durationMillisecond:$durationMillisecond}){
    id,
    essay,
    date
  }
}
`;


export const SCORE_ESSAY = gql`
mutation ScoreEssay($id:String!){
  scoreEssay(scoreEssay:{test:false,id:$id}){
    recommendation
  }
}
`;

export const GET_PROFILE = gql`
query{
  getUserProfile{
    firstName,
    lastName,
    email,
    age,
    gender,
    profile
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($firstName:String, $age:Float, $lastName:String, $gender:String){
  updateUserProfile(updateUser:{firstName:$firstName ,age:$age ,lastName:$lastName ,gender:$gender}){
    firstName,
    lastName,
    email,
    age,
    gender
  }
}
`;

export const UPLOAD_PROFILE_FILE = gql`
mutation UploadProfile($file:File!){
  uploadProfileFile(file:$file){
    url,
    fileSize
  }
}
`;


export const DELETE_TOPIC = gql`
mutation DeleteTopic($id:String!){
  deleteTopic(deleteTopic:{id:$id}){
    isDelete
  }
}
`;


export const DELETE_ESSAY = gql`
mutation DeleteEssay($id:String!){
  deleteEssay(deleteEssay:{id:$id}){
    id
  }
}
`;