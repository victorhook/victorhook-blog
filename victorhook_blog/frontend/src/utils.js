class Utils {

    static NO_CONTENT() {return 204};
    static CREATED() {return 201};

    static getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    static getDate(post) {
        return post.timestamp.split('T')[0];
    }

    static createCsrfToken() {
        const element = document.createElement('input');
        element.hidden = true;
        element.name = 'csrfmiddlewaretoken';
        element.value = Utils.getCookie('csrftoken');
        return element;
    }

    static getReadMinutes(words) {
        // WPM taken from https://en.wikipedia.org/wiki/Words_per_minute
        const WORDS_PER_MINUTE = 180;
        const minutes = Math.round(words / WORDS_PER_MINUTE);
        return minutes === 0 ? 1 : minutes;
    }

    static baseQuery(endpoint, method, body, callback) {
        fetch(endpoint, {
            method: method,
                headers: new Headers({
                    'X-CSRFToken': Utils.getCookie('csrftoken'),
                    'Content-type': 'application/json'
                }),
                body: JSON.stringify(body)
        }).then(res => res.status != Utils.NO_CONTENT() ? res.json() : res.status)
          .catch(err => console.log(`ERROR: ${err}`))
          .then(res => {
                if (callback != undefined)
                    callback(res);
                else
                    console.log(res);
          })
    }

};


export default Utils;

