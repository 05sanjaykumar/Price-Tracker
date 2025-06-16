// utils/decodeToken.ts
export const decodeToken = (token: string) => {
  try {
    const base64Payload = token.split('.')[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
