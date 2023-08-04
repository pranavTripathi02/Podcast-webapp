export default ({ user_name, url }: { user_name: string; url: string }) => {
  let htmlElement = '';
  htmlElement += `<div style="text-align:center">
  <h2>Hi ${user_name}! Welcome to our podcast application</h2>
  <h4>Please click on the link to verify your account.</h4>
  <a href=${url} style="padding:0.5rem; border-radius:10%; background-color:#0099ff; color:#fff;text-decoration:none">
  Verify
  </a>
  </div>`;
  return htmlElement;
};
