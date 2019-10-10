import { JsonServiceClient } from "@servicestack/client";

const isDev = false;
//console.log(location.host);
export const BaseUrl = isDev
  ? "http://localhost:63333/"
  : "https://sabankratesapi.azurewebsites.net/"; // .NET Core App Server on Azure

export const client = new JsonServiceClient(BaseUrl);

export const getBankRates = async params => {
  console.log(params);
  const response = await client.postToUrl("/depositRates", params);
  return response;
};
