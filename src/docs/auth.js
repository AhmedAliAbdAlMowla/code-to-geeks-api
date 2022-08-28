module.exports.signIn = {

    summary: 'Signin',
    operationId: 'signin',
    description: 'you can use this end point to signin',
    parameters: [],
    responses: {
        '200': {
            description: '',
            headers: {}
        }
    },
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: "object"
                },
                example: {
                    email: "ahmedshekh@student.aast.edu",
                    password: "#Ahmed123"
                }

            }
        }
    },
    tags: ['Auth']

}


module.exports.signup = {
    summary: 'Signup',
    operationId: 'signup',
    description: 'you can use this end point to  signup',
    parameters: [],
    responses: {
        '200': {
            description: '',
            headers: {}
        }
    },
    requestBody: {
        required: true,
        content: {
           'application/json':  {
               example: {
                firstName: 'ahmed',
                lastName: 'ali',
                email: 'a7med3li2008@yahoo.com',
                password: '#Secret123'
              },
              schema: { type: 'object' },
        }
    }
    },
    tags: ['Auth']
}

module.exports.emailVerification = {

  "summary": "verify  account email ",
  "operationId": "verify account",
  "description": "you can use this end point to verify account",
  parameters: [
    {
      name: "token",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  "responses": { "200": { "description": "", "headers": {} } },
  "tags": ["Auth"]

}
module.exports.resendConfirmationEmail = {
    
        "summary": "Resend confirmation email.",
        "description": "you can use this end point to resend confirmation email.",
        "operationId": "Resend confirmation email",
        "responses": { "200": { "description": "", "headers": {} } },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object"
                
              },
              "example": {
                "email": "a7med3li2008@yahoo.com"
              }
            }
          }
        },
        "tags": ["Auth"]
      
}

module.exports.recover = {

    "summary": "Accunt  recover ",
    "operationId": "recover",
    "description": "you can use this end point to  recover accunt by give the email and send code to email",
    "parameters": [],
    "responses": { "200": { "description": "", "headers": {} } },
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object"
            
          },
          "example": {  "email": "a7med3li2008@yahoo.com" }
        }
      }
    },
    "tags": ["Auth"]
}


module.exports.AuthCodeCheck ={

    "summary": "Check code is valid or not valid",
          "operationId": "checkCode",
          "description": "you can use this end point to  check if the code is valid or not valid",
          "parameters": [],
          "responses": { "200": { "description": "", "headers": {} } },
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": { "type": "object"},
                "example": { "code": "1234" } 
              }
            }
          },
          "tags": ["Auth"]
}


module.exports.AuthPasswordReset = {

    "summary": "Reset password",
    "operationId": "resetPassword",
    "description": "you can use this end point to  reset password , you should have a code to confirm this operation ",
    "parameters": [],
    "responses": { "200": { "description": "", "headers": {} } },
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object"
           
          },
          "example": { "code": "1234", "password": "#Ahmed123" }
        }
      }
    },
    "tags": ["Auth"]
}



module.exports.AuthPasswordUpdate =  {
  
      "summary": "update password",
      "operationId": "update password",
      "description": "you can use this end point to  update password , you should have a old password and new password",
      "responses": { "200": { "description": "", "headers": {} } },
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
            },
            "example": { "password":"#Ahmed888",   "newPassword":"#Ahmed97"}
          
        }
      },
    
    },
    "tags": ["Auth"]
  
}


//                                Oauth 

module.exports.googleSignIn  = {

  summary: 'google signin',
  operationId: 'google signin',
  description: 'you can use this end point to signin with google',
  parameters: [],
  responses: {
      '200': {
          description: '',
          headers: {}
      }
  },
  requestBody: {
      required: true,
      content: {
          'application/json': {
              schema: {
                  type: "object"
              },
              example: {
               token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNvZGV0b2dlZWtzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Di4bLOrrOGCrQIhHz8CIkI9zIytBilZq1Q1WGThkYOU"
              }

          }
      }
  },
  tags: ['Auth']
}


module.exports.facebookSignIn  = {

  summary: 'facebook signin',
  operationId: 'facebook signin',
  description: 'you can use this end point to signin with facebook',
  parameters: [],
  responses: {
      '200': {
          description: '',
          headers: {}
      }
  },
  requestBody: {
      required: true,
      content: {
          'application/json': {
              schema: {
                  type: "object"
              },
              example: {
               token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNvZGV0b2dlZWtzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Di4bLOrrOGCrQIhHz8CIkI9zIytBilZq1Q1WGThkYOU"
              }

          }
      }
  },
  tags: ['Auth']
}




module.exports.linkedinSignIn  = {

  summary: 'linkedin signin',
  operationId: 'linkedin signin',
  description: 'you can use this end point to signin with linkedin',
  parameters: [],
  responses: {
      '200': {
          description: '',
          headers: {}
      }
  },
  requestBody: {
      required: true,
      content: {
          'application/json': {
              schema: {
                  type: "object"
              },
              example: {
               token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImNvZGV0b2dlZWtzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Di4bLOrrOGCrQIhHz8CIkI9zIytBilZq1Q1WGThkYOU"
              }

          }
      }
  },
  tags: ['Auth']
}


module.exports.validateToken ={

  "summary": "Check if token  is valid or not valid",
        "operationId": "token",
        "description": "you can use this end point to check if token  is valid or not valid",
        "parameters": [],
        "responses": { "200": { "description": "", "headers": {} } },
        "tags": ["Auth"]
}