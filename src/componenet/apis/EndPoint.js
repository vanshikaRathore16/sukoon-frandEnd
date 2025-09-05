

// export const BASE_URL = "http://localhost:3000"; 
export const BASE_URL = "https://sukoonbk-1.onrender.com" 
export default{
    SIGN_UP : BASE_URL+"/user/create",
    SiGN_IN : BASE_URL+"/user/authUser",
    // self relation part
    GETMOODOPTION : BASE_URL+"/mood/getMoodOptions",
    SUBMITMOOD  : BASE_URL + "/mood/create",
    SUBMITNOTE  : BASE_URL + "/mood/note",
    SUBMITGRATITUDES : BASE_URL + "/mood/submitGratitudes",
    GETONLYMOOD : (id) => `${BASE_URL}/mood/getMood/${id}`,
    GETONLYNOTES : (id) => `${BASE_URL}/mood/getNote/${id}`,
    
    
    QOUTE_CATEGORY : BASE_URL + "/quote/QouteCategory",
    Qoute_BY_CATEGORY : BASE_URL +"/quote/quoteByCategory",
    ADD_POSE : BASE_URL + "/pose/create",
    POSE_CATEGORY : BASE_URL + "/pose/typeOfPose",
    POSE_by_type : BASE_URL + "/pose/list",
    FATCH_POSE_ID: (id) => `${BASE_URL}/pose/get/${id}`,
    CREATE_PERSONAL_PLANE : BASE_URL + "/personalPlan/create",
    Admin_Add_Routine : BASE_URL + "/routine/create",
    LIST_ROUTINE  : BASE_URL + "/routine/routineCategory",
    ROUTINE_GET_BY_ID : BASE_URL + "/routine/getById",
    ADD_TO_FAVORITE : BASE_URL + "/favorite/create",
    LIST_FAVORITE  : (userId) => `${BASE_URL}/favorite/list/${userId}`,
    // update profile
    UPDATE_PROFILE  : BASE_URL + "/user/profile",
    USER_ROUTINE_LIST : (userId) => `${BASE_URL}/favorite/routineList/${userId}`,
    FAVORITE_BY_ID : (id) => `${BASE_URL}/favorite/favorite/${id}`,
    USER_PERSONALROUTINE_LIST : (userId) => `${BASE_URL}/personalPlan/list/${userId}`,
    USER_QOUTE_LIST : (userId) =>`${BASE_URL}/favorite/favorite/quote/${userId}`,
    DELETE_FAV_QOUTE : (userId) =>`${BASE_URL}/favorite/delete/${userId}`,
    USER_FAV_POSE : (userId) => `${BASE_URL}/favorite/pose/${userId}`,
    USER_MOOD_HISTORY  : (userId) => `${BASE_URL}/mood/list/${userId}`,
    RONDOM_QOUTE : BASE_URL + "/quote/rondomQuote",
    FEEDBACK_BY_USER : (userId) => `${BASE_URL}/feedback/create/${userId}`,
    ADMIN_FEEDBACK_LIST : BASE_URL + "/feedback/getAllFeedback",
    APPROVE_FEEDBACK : (id) => `${BASE_URL}/feedback/feedBack-approve/${id}`,
    LIST_OF_APPROVE_LIST : BASE_URL + "/feedback/listOfApproveFeedback",
    MEDIDATION_CATEGORY_LIST : BASE_URL + "/medidation/category",
    FATCH_AND_SAVE_MEDIDATION : BASE_URL + "/medidation/fatchAndSaveMedidation",
    // using api article fatch
    Article_FATCH : BASE_URL + "/medidation/article",
    MEDITATION_FORM : BASE_URL + "/medidation/add",
    GETMEDITATION : BASE_URL + "/medidation/getMedidationFromDB",
    // create by admin
    //  article 
    GETARTICLETAGS : BASE_URL + "/article/allowedtags",
    CREATE_ARTICLE  : BASE_URL + "/article/create",
    GET_ARTICLE : BASE_URL + "/article/get",
    ARTICLE_BY_ID : (id) => `${BASE_URL}/article/${id}`,
    GETARTICLEBYTAG : (tag) => `${BASE_URL}/article/tags/${tag}`,

    // home
    RECCOMENDMEDIDATION : (userId) => `${BASE_URL}/mood/getMetidationByLastMood/${userId}`,
    RECCOMENDARTICLE  : (userId) => `${BASE_URL}/mood/getArticlesByLastMood/${userId}`,
    SLEEP_MEDIDATION_FOR_BL  : BASE_URL + "/medidation/getRondomMeditationSleepStory",
    soundScapes_FOR_BL  : BASE_URL + "/medidation/getRondomSoundscapes",
    PADCAST_FOR_BL : BASE_URL + "/medidation/getRondomPadcast"
     
}