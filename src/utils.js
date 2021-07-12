import moment from "moment";

const formatDateTime = (val) => {
    if ((moment().valueOf() - val) / (1000 * 60 * 60) < 24) {
        return moment(val).fromNow()
    }
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

const copyToClipboard = (val, self) => {
    navigator.clipboard.writeText(val).then(function() {
        self.$toast.success(`Copied`)
        setTimeout(self.$toast.clear, 3000)
    }, function(err) {
        console.error('Async: Could not copy text: ', err)
    })
}
export default {
    formatDateTime,
    copyToClipboard
}