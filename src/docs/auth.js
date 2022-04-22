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
    "description": "you can use this end point to  recover accunt by give the email and send tokent to email",
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
                "example": { "token": "12a9r2" } 
              }
            }
          },
          "tags": ["Auth"]
}


module.exports.AuthPasswordReset = {

    "summary": "Reset password",
    "operationId": "resetPassword",
    "description": "you can use this end point to  reset password , you should have a tokent to confirm this operation ",
    "parameters": [],
    "responses": { "200": { "description": "", "headers": {} } },
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object"
           
          },
          "example": { "token": "12a9", "password": "#Ahmed123" }
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
