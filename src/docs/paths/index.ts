// user
import { getSingleUser } from "../user/get-single-user";
import { updateUser } from "../user/update-user";
import { forgetPassword } from "../user/forget-password";

import { getUsers } from "../user/get-users";
import { createUser } from "../user/create-user";
import { userSignIn } from "../user/user-signin";
import { findUserByNerve } from "../user/find-user-by-nerve";
// email and phone verification
import { resendEmail } from "../email-verification/resend-mail";
import { verifyEmail } from "../email-verification/verify-email";

import { updatePassword } from "../user/update-password";
import { deleteUser } from "../user/delete-user";
// profile
import { createProfile } from "../profile/create-profile";
import { deleteProfile } from "../profile/delete-profile";
import { getAllProfile } from "../profile/get-all-profile";
import { getSingleUserProfile } from "../profile/get-single-user-profile";
import { updateProfile } from "../profile/update-profile";
// medical records
import { saveRecords } from "../medical-records/save-records";
import { deleteRecords } from "../medical-records/delete-records";
import { getMedicalRecords } from "../medical-records/get-all-records";
import { getUserRecords } from "../medical-records/get-user-records";
import { updateRecords } from "../medical-records/update-records";
//request
import { sendRequest } from "../request/send-request";
import { deleteRequest } from "../request/delete-request";
import { disapproveRequest } from "../request/disapprove-request";
import { approveRequest } from "../request/approve-request";
import { getAllRequest } from "../request/get-all-request";
import { getHospitalRequest } from "../request/get-hospital-request";
import { getUserRequest } from "../request/get-user-request";

// module
export const paths = {
  // user
  "/user/all": {
    ...getUsers,
  },
  "/user/find/{nerveId}": {
    ...findUserByNerve,
  },
  "/user/single/{id}": {
    ...getSingleUser,
  },
  "/user/signup": {
    ...createUser,
  },
  "/user/signin": {
    ...userSignIn,
  },
  "/user/forget-password": {
    ...forgetPassword,
  },
  "/user/update/{id}": {
    ...updateUser,
  },
  "/user/delete/{id}": {
    ...deleteUser,
  },
  "/user/update-password": {
    ...updatePassword,
  },

  // email verification
  "/email/resend-otp": {
    ...resendEmail,
  },
  "/email/verify-otp": {
    ...verifyEmail,
  },
  //profile
  "/profile/create": {
    ...createProfile,
  },
  "/profile/all": {
    ...getAllProfile,
  },
  "/profile/delete/{id}": {
    ...deleteProfile,
  },
  "/profile/user/{id}": {
    ...getSingleUserProfile,
  },
  "/profile/update/{id}": {
    ...updateProfile,
  },
  //medical records
  "/medical-records/update/{id}": {
    ...updateRecords,
  },
  "/medical-records/add": {
    ...saveRecords,
  },
  "/medical-records/delete/{id}": {
    ...deleteRecords,
  },
  "/medical-records/all": {
    ...getMedicalRecords,
  },
  "/medical-records/user/{id}": {
    ...getUserRecords,
  },
  //request
  "/request/all": {
    ...getAllRequest,
  },
  "/request/bymail": {
    ...sendRequest,
  },
  "/request/user/{userId}": {
    ...getUserRequest,
  },
  "/request/hospital/{hospitalId}": {
    ...getHospitalRequest,
  },
  "/request/approve/{requestId}": {
    ...approveRequest,
  },
  "/request/disapprove/{requestId}": {
    ...disapproveRequest,
  },
  "/request/delete": {
    ...deleteRequest,
  },
  // paystack
  // "/paystack/verify/{ref}/{userId}": {
  //   ...paystackVerifyPayment,
  // },
  // "/paystack/banks": {
  //   ...paystackGetAllBanks,
  // },
  // "/paystack/user-bank-details": {
  //   ...paystackGetAllBankDetials,
  // },

  // "/paystack/initiate/withdrawal": {
  //   ...paystackInitiateWithdrawal,
  // },
  // "/paystack/finalize/withdrawal": {
  //   ...paystackFinalizeWithdrawal,
  // },
};
