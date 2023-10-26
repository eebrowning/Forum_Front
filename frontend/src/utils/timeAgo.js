export default function timeAgo(timestamp) {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);

    const timeDifference = currentTime - pastTime;

    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursAgo < 24) {
        if (hoursAgo === 0) {
            return "Less than an hour ago";
        } else if (hoursAgo === 1) {
            return "1 hour ago";
        } else {
            return `${hoursAgo} hours ago`;
        }
    } else {
        // Format as "mm/dd/yy"
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return pastTime.toLocaleDateString(undefined, options);
    }
}
