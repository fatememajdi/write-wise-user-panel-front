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
      shortId,
      topic,
      overallBandScore,
      createdAt,
      visuals{
        id,
        url,
        image
      },
      subType
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
      essayInsights,
      shortId
    }
  }
}
`;

//-------------------------------------------------------------get random topic
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
    shortId,
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
mutation ScoreEssay($id:String!,$test:Boolean!){
  scoreEssay(scoreEssay:{test:$test,id:$id}){
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
    profile,
    token,
    country{
      commonName,
      id,
      officialName,
      flag
    }
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

export const GET_CURRENCIES = gql`
query{
  getCurrencies{
    code,
    symbol,
    name,
    icon
  }
}
`;

export const GET_PACKAGES = gql`
query GetPackages($userToken:String!){
  getPackages(filter:{userToken:$userToken}){
    id,
    name,
    discountPercent,
    currencyName,
    originalAmount,
    description,
    title,
    subDescription,
    amountWithDiscount,
    showingPrice,
    showingPriceWithDiscount,
    currency,
    adjustableQuantity,
    discountName,
    showingDiscountAmount,
    isPopup
  }
}
`;

//-------------------------------------------------------get transactions list
export const TRANSACTION_HISTORY = gql`
query TransactionHistory($page:Float!,$pageSize:Float!,$paymentHistory:Boolean!){
  transactionHistory(pagination:{page:$page,pageSize:$pageSize,paymentHistory:$paymentHistory}){
    transactions{
      id,
      shortId, 
      invoiceNumber,
      paymentServiceType,
      originalAmount,
      discountPercent,
      amountAfterDiscount,
      amountPaidShow,
      tax,
      tokenNumber,
      currency,
      paymentStatus,
      paidDate,
      essayShortId,
      essayShortName
    }
  }
}
`;

export const RECEIPT_LINK = gql`
query ReceiptLink($id:String!){
  receiptLink(getPayment:{id:$id}){
    link
  }
}
`;

export const REGENERATE_PAYMENT_LINK = gql`
query RegeneratePaymentLink($id:String!){
  regeneratePaymentLink(getPayment:{id:$id}){
    link
  }
}
`;


export const CREATE_PAYMENT_LINK = gql`
mutation CreatePaymentLink($id:String!, $adjustedQuantity:Float!, $promotionCode:String!){
  createPaymentLink(createPaymentLink:{id:$id,adjustedQuantity:$adjustedQuantity,promotionCode:$promotionCode}){
    link
  }
}
`;

//--------------------------------------------------------check promotion code
export const VALIDATION_PROMOTION_CODE = gql`
query validationPromotionCode($id:String!, $adjustedQuantity:Float!, $promotionCode:String!){
  validationPromotionCode(createPaymentLink:{
    id:$id,
    adjustedQuantity:$adjustedQuantity,
    promotionCode:$promotionCode
  }){
    name,
    percentOff,
    amountAfterDiscount,
    discountAmount
  }
}`;


//--------------------------------------------------------get payment data after transaction
export const AFTER_PAYMENT = gql`
query AfterPayment($id:String!){
  afterPayment(getPayment:{id:$id}){
    amountPaidShow,
    tokenNumber,
    id, 
    currency
  }
}
`;

//--------------------------------------------------------check IP 
export const IS_FROM_IRAN = gql`
query{
  isFromIran
}
`;

//--------------------------------------------------------get list of countries
export const SEARCH_COUNTRIES = gql`
query SearchContries($page:Float!,$pageSize:Float!,$value:String!){
  searchCountry(search:{page:$page,pageSize:$pageSize,value:$value}){
    countries{
      id,
      commonName,
      officialName,
      flag
    }
  }
}
`;

export const SELECT_CURRENCY = gql`
mutation SelectCurrency($id:String!){
  selectCurrency(selectCurrency:{countryId:$id}){
    email
  }
}
`;