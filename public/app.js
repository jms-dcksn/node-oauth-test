console.log('Watch here for updates on how OAuth2.0 is working!')
const CLIENT_ID = "OLqCA3fN3St8i1FNGBCB9yzbO4l5JZkp";
const redirect_uri = "http%3A%2F%2Flocalhost%3A8080%2Fauthorize"
const scope = "ead%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20read%3Ajira-user%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider"
const tokenURL= `https://auth.atlassian.com/oauth/token`
const codeURL = `https://auth.atlassian.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${redirect_uri}&state=1234&prompt=consent`

const authButton = document.querySelector('#authenticate')

authButton.addEventListener('click', (e)=>{
    e.preventDefault()
    window.open(codeURL, "authCodeTab");
    
})