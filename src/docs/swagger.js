const auth = require("./auth");
const account = require("./account");
const homePage = require("./homePage");
const post = require("./post");
const tag = require("./tag");
const message = require("./message");
const about = require("./aboutAs");
const file = require("./file");
const savedPost = require('./savedPost')
module.exports = {
  openapi: "3.0.0",
  servers: [
   
    {
      url: "http://localhost:4000/api/v1/",
      description: "Devlopment server (uses test data)",
      variables: {},
    },
    {
      url: "http://3.8.56.231/api/v1/",
      description: "AWS",
      variables: {},
    },

    {
      url: "https://codetogeeksapi.herokuapp.com/api/v1/",
      description: "Heroku server ",
      variables: {},
    },
    {
      url: "http://169.50.37.227/api2/v1/",
      description: "Production server (uses live data)",
      variables: {},
      basePath: "",
    },
  ],
  info: {
    version: "v1",
    title: "CODE-TO-GEEKS API",
    description:
      "This api was developed  by codetogeeks TECH Company, @copyright CODETOGEEKS 2022",
    termsOfService: "",
    contact: {},
    license: { name: "" },
  },

  tags: [
    {
      name: "Auth",
      description: "Everything about authentication and authorization.",
    },
    {
      name: "Account",
      description: "Everything about user accounts.",
    },

    {
      name: "Post",
      description: "Everything about posts.",
    },
    {
      name: "Tag",
      description: "Everything about tags.",
    },
   
    {
      name: "File",
      description: "Everything about files.",
    },
    {
      name: "Saved Post",
      description: "Everything about saved post.",
    },
    /*
       {
      name: "HomePage",
      description: "Everything about home page",
    },
    
    {
      name: "AboutUs",
    },
    {
      name: "Message",
    },*/
  ],

  paths: {
    "/auth/signin": {
      post: auth.signIn,
    },
    "/auth/signup": {
      post: auth.signup,
    },
    "/auth/resend/confirmation/email": {
      post: auth.resendConfirmationEmail,
    },
    "/auth/account/recover": {
      post: auth.recover,
    },
    "/auth/code/check": {
      post: auth.AuthCodeCheck,
    },
    "/auth/password/reset": {
      post: auth.AuthPasswordReset,
    },

    "/auth/account/confirm" :{
      post: auth.confirmAccount
    },
    "/auth/password": {
      patch: auth.AuthPasswordUpdate,
    },

    "/auth/google" :{
      post : auth.googleSignIn  
    },
    "/auth/facebook" :{
      post : auth.facebookSignIn  
    },
    "/auth/linkedin" :{
      post : auth.linkedinSignIn  
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    "/account": {
      get: account.getAccountData,
      patch: account.updateAccountData,
      
    },
    "/account/profile/image" :{
      get :account.getProfileImage,
      post : account.uploadAccountProfileImage
     
    },

    "/account/profile/social":{
      get : account.getAllSocialLink,
      post: account.createSocialLink
    },
    "/account/author/profile/{author_id}":{
      get : account.getAuthorProfiletData
 
    },

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*"/home": {
      get: homePage.getHomePage,
    },
    "/home/banner/": {
      get: homePage.getBanners,
      post: homePage.addBanner,
    },
    "/home/banner/{bannerId}": {
      delete: homePage.deleteBanner,
    },*/
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    "/post": {
      get: post.getPosts,
      post: post.create
    },
    "/post/cover/image/{post_id}" :{
      post : post.uploadPostCoverImage,
 
    },
    "/post/cover/image/reset/{post_id}" :{
      post : post.resetPostCoverImage,
 
    },
    "/post/id/{post_id}": {
      get: post.getOnePostByPostId,
    },
    "/post/{slug}": {
      get: post.getOnePostBySlug,
    },
    "/post/tag/{tag_id}": {
      get: post.getOnePostByTagId,
    },
    "/post/{post_id}": {
      patch:  post.update,
      delete: post.deletePost,
    },

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "/tag": {
      get: tag.getTags,
      post: tag.create,
    },
    "/tag/{tag_id}": {
      get: tag.getOneTagByTagId,
      patch: tag.update,
      delete: tag.deleteTag,
    },


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "/file" : {
      get : file.getFiles,
      post : file.upload
     
    },
    "/file/{file_id}" :{
      get : file.getFile,
      patch : file.update,
      delete : file.deleteFile
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "/saved" : {
      get  : savedPost.getSavedPosts,
      post : savedPost.create,
     
    },
    "/saved/{saved_post_id}" :{
      delete : savedPost.deleteSavedPost
    },
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /*  "/messages/": {
      get: message.getAllMessages,
      post: message.createMessage,
    },
    "/messages/{messageId}": {
      get: message.getOneMessage,
      delete: message.deleteMessage,
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    "/about/": {
      get: about.getAboutUs,
    },
    "/about/paragraphs": {
      patch: about.updateAboutUsParagraphs,
    },
    "/about/files": {
      get: about.getAboutUsFiles,
      post: about.uploadAboutUsFiles,
    },
    "/about/banner/": {
      get: about.getBanners,
      post: about.addBanner,
    },
    "/about/banner/{bannerId}": {
      delete: about.deleteBanner,
    },
    "/about/video": {
      post: about.uploadVideo,
    },*/
  },

  components: {
    parameters: {
      "x-auth-token": {
        name: "x-auth-token",
        in: "header",
        required: true,
        style: "simple",
        schema: {
          type: "string",
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        name: "x-auth-token",
        scheme: "bearer",
        description: "Enter JWT token",
        in: "header",
      },
    },
  },
  security: [{ ApiKeyAuth: [] }],

  externalDocs: { url: "", description: "" },
  warnings: [],
};
