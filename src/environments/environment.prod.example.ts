export const environment = {
  production: true,
  url: (path)=>{
    return "BASE_URL/" + path;
  },
  client_id: "CLIENT_ID",
  client_secret: "CLIENT_SECRET"  
};
