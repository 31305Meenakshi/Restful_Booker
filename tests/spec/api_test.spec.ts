import { test, expect } from "@playwright/test";
import Get from "../allRequests/1-getRequest";
import data from "../data/dataOne.json";
import Post from "../allRequests/2-postRequest";
import Put from "../allRequests/3-putRequest";
import Auth from "../allRequests/6-authToken";
import Patch from "../allRequests/4-patchRequest";
import Delete from "../allRequests/5-deleteRequest";
let ID: string;
let token: string;
for (let i = 0; i < data.length; i++) {
  test.describe(data[i].suiteName, async () => {
    let getRequest: Get,
      postRequest: Post,
      putRequest: Put,
      patchRequest: Patch,
      deleteRequest: Delete,
      authRequest: Auth;
    test.beforeEach(async ({ request }) => {
      getRequest = new Get(request);
      postRequest = new Post(request);
      putRequest = new Put(request);
      patchRequest = new Patch(request);
      deleteRequest = new Delete(request);
      authRequest = new Auth(request);
    });
    test(data[i].testcase, async () => {
      if (data[i].httpMethod == "GetAll") {
        console.log("GETALL");
        await getRequest.getAllRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod == "GetByName") {
        console.log("GETBYNAME");
        await getRequest.getNameRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod == "GetByCheckIn/CheckOut") {
        console.log("GETBYCHECKIN");
        await getRequest.getByCheckIn_CheckOutRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod == "GetByID") {
        console.log("GETBYID");
        await getRequest.getByIdRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType,
          ID
        );
      } else if (data[i].httpMethod == "Post") {
        console.log("POST");
        ID = await postRequest.postRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType
        );
      } else if (data[i].httpMethod == "Put") {
        console.log("PUT");
        await putRequest.putRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType,
          token,
          ID
        );
      } else if (data[i].httpMethod == "Patch") {
        console.log("PATCH");
        await patchRequest.patchRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          data[i].contentType,
          token,
          ID
        );
      } else if (data[i].httpMethod == "Delete") {
        console.log("DELETE");
        await deleteRequest.deleteRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          ID,
          token
        );
      } else if (data[i].httpMethod == "ValidateDelete") {
        console.log("VALIDATE-DELETE");
        await deleteRequest.validateDeleteRequestMethod(
          data[i].endpoint,
          data[i].statusCode,
          ID
        );
      } else if (data[i].httpMethod == "AuthToken") {
        console.log("AuthToken");
        token = await authRequest.token(
          data[i].endpoint,
          process.env.authUsername,
          process.env.authPassword,
          data[i].statusCode,
          data[i].contentType
        );
      } else {
        console.log("No Request");
      }
    });
  });
}
