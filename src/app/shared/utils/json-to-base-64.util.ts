export default function jsonToBase64(object: object) {
    const json = JSON.stringify(object);
    return Buffer.from(json).toString("base64");
}