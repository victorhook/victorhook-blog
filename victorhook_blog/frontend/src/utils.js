class Utils {

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
        const minutes = Math.round(words / 180);
        return minutes === 0 ? 1 : minutes;
    }

};


export default Utils;

