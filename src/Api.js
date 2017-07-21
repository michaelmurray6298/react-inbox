export default class Api {
  static fetchMessages() {
    return fetch('http://localhost:8181/api/messages')
      .then(response => response.json())
      .then(json => json._embedded.messages)
      .catch((err) => {
        throw err;
      });
  }
}
