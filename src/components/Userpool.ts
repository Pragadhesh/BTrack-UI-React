import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-south-1_OxR5TqGLu",
    ClientId: "77hdkuplmoei7g5j3dslt365h4"
}

export default new CognitoUserPool(poolData);