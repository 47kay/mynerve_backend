export const docComponents = {
  securityDefinitions: {
    JWTAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
  schemas: {
    // id model
    id: {
      type: "string", // data type
      description: "An id", // desc
      example: "64d0f745b57d80d91f3aa3e0", // example of an id
    },
    // file
    file: {
      type: "file", // data type
      description: "a  image", // desc
      required: true,
    },
    // email model
    email: {
      type: "object", // data type
      properties: {
        email: {
          type: "string", // data type
          description: "email of user", // desc
          example: "chris@gmail.com",
        },
      },
    },
    //User model
    User: {
      type: "object", // data type
      properties: {
        nerveId: {
          type: "string", // data-type
          description: "user nerveId", // desc
          example: "b8987hgh7878hh", // example of an id
          require,
        },
        email: {
          type: "string", // data-type
          description: "user email", // desc
          example: "chris@gmail.com", // example of an id
          require,
        },
      },
    },
    // update user passsword
    UpdatePassword: {
      type: "object", // data type
      properties: {
        userId: {
          type: "string", // data-type
          description: "user identification number", // desc
          example: "77676544334", // example of an id
        },
        password: {
          type: "string", // data-type
          description: "user password", // desc
          example: "12121", // example of an id
        },
      },
    },
    //signup user
    Signup: {
      type: "object", // data type
      properties: {
        username: {
          type: "string", // data-type
          description: "user name", // desc
          example: "bh8888s88hshs8", // example of an id
          require,
        },
        email: {
          type: "string", // data-type
          description: "user email", // desc
          example: "chris@gmail.com", // example of an id
          require,
        },
        password: {
          type: "string", // data-type
          description: "user password", // desc
          example: "12121", // example of an id
          require,
        },
      },
    },
    // signin user
    SiginUser: {
      type: "object", // data type
      properties: {
        nerveId: {
          type: "string", // data-type
          description: "user nerveId", // desc
          example: "chris123", // example of an username
          require,
        },
        password: {
          type: "string", // data-type
          description: "user password", // desc
          example: "12121", // example of an password
          require,
        },
      },
    },

    // resend mail
    ResendMail: {
      type: "object", // data type
      properties: {
        userId: {
          type: "string", // data type
          description: "user id", // desc
          example: "12345677", // example of a id
        },
        email: {
          type: "string", // data type
          description: "user email", // desc
          example: "email@gmail.com", // example of a example
        },
      },
    },
    // verify mail
    VerifyEmail: {
      type: "object", // data type
      properties: {
        userId: {
          type: "string", // data type
          description: "user id", // desc
          example: "1234567aswssaa7", // example of a id
        },
        otp: {
          type: "string", // data type
          description: "otp code", // desc
          example: "123456", // example of a example
        },
      },
    },
    // profile
    Profile: {
      type: "object", // data type
      properties: {
        userId: {
          type: "string", // data-type
          description: "user name", // desc
          example: "ssas1122j", // example of an username
        },
        firstName: {
          type: "string", // data-type
          description: "user name", // desc
          example: "chris123", // example of an username
        },
        middleName: {
          type: "string", // data-type
          description: "user password", // desc
          example: "12121", // example of an password
        },
        lastName: {
          type: "string", // data-type
          description: "user name", // desc
          example: "chris123", // example of an username
        },
        dateOfBirth: {
          type: "string", // data-type
          example: "12.03.2002", // example of an username
        },
        placeOfBirth: {
          type: "string", // data-type
          example: "abuja", // example of an username
        },
        gender: {
          type: "string", // data-type
          example: "male", // example of an username
        },
        nationality: {
          type: "string", // data-type
          example: "nigeria", // example of an username
        },
        stateOfOrigin: {
          type: "string", // data-type
          example: "lorem", // example of an username
        },
        maritalStatus: {
          type: "string", // data-type
          example: "lorem", // example of an username
        },
        permanentAddress: {
          type: "string", // data-type
          example: "lorem", // example of an username
        },
        phoneNumber: {
          type: "string", // data-type
          example: "lorem", // example of an username
        },
        //next of kin

        nextOfKinFirstName: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinLastName: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinMiddleName: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinGender: {
          type: "string", // data-type
          example: "lorem", // example
        },

        nextOfKinPlaceOfBirth: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinNationality: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinStateOfOrigin: {
          type: "string", // data-type
          example: "lorem", // example
        },

        nextOfKinMaritalStatus: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinPermanentAddress: {
          type: "string", // data-type
          example: "lorem", // example
        },
        nextOfKinPhoneNumber: {
          type: "string", // data-type
          example: "lorem", // example
        },
        //medical information
        bloodGroup: {
          type: "string", // data type
        },
        height: {
          type: "string", // data type
        },
        weight: {
          type: "string", // data type
        },
        allergies: {
          type: "string", // data type
        },
        medicalCondition: {
          type: "string", // data type
        },
        medications: {
          type: "string", // data type
        },
        immunizations: {
          type: "string", // data type
        },
        surgeries: {
          type: "string", // data type
        },
        familyMedicalHistory: {
          type: "string", // data type
        },
        emergencyContactName: {
          type: "string", // data type
        },
        emergencyContactRelationship: {
          type: "string", // data type
        },
        emergencyContactPhoneNumber: {
          type: "string", // data type
        },
        emergencyContactEmail: {
          type: "string", // data type
        },
        healthInsurance: {
          type: "string", // data type
        },
      },
    },
    //Medical Records
    MedicalRecords: {
      type: "object", // data type
      properties: {
        userId: {
          type: "string", // data type
          description: "user id", // desc
          example: "123567854", // example of a id
        },
        clinic: {
          type: "string", // data type
        },
        consultationNote: {
          type: "string", // data type
        },
        ICD10Code: {
          type: "string", // data type
        },
        labRequest: {
          type: "string", // data type
        },
        labResult: {
          type: "string", // data type
        },
        drugs: {
          type: "string", // data type
        },
        procedureName: {
          type: "string", // data type
        },
        procedureNotes: {
          type: "string", // data type
        },
        procedureImage: {
          type: "string", // data type
        },
        radiologyRequest: {
          type: "string", // data type
        },
        radiologyResultImage: {
          type: "string", // data type
        },
        radiologyNote: {
          type: "string", // data type
        },
        scanRequested: {
          type: "string", // data type
        },
        scanResult: {
          type: "string", // data type
        },

        scanNote: {
          type: "string", // data type
        },
        scanImage: {
          type: "string", // data type
        },
      },
    },
    // request
    Request: {
      type: "object", // data type
      properties: {
        note: {
          type: "string", // data type
          description: "user email", // desc
          example: "medical practitioner note", // example of a example
        },
        hospitalId: {
          type: "string", // data type
          description: "hospital id", // desc
          example: "HCPID", // example of a example
        },
        requestBy: {
          type: "string", // data type
          description: "request by", // desc
          example: "chris", // example of a example
        },
        validatedBy: {
          type: "string", // data type
          description: "user email", // desc
          example: "validated by", // example of a example
        },
      },
    },
    // error model
    Error: {
      type: "object", //data type
      properties: {
        message: {
          type: "string", // data type
          description: "Error message", // desc
          example: "Not found", // example of an error message
        },
        internal_code: {
          type: "string", // data type
          description: "Error internal code", // desc
          example: "Invalid parameters", // example of an error internal code
        },
      },
    },
  },
};
