export const formatCommentTimestamp = (timestamp) => {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);

    const timeDifference = currentDate - inputDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return "Vừa xong";
    } else if (minutes === 1) {
        return "1 phút trước";
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours === 1) {
        return "1 giờ trước";
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else if (days === 1) {
        return "1 ngày trước";
    } else if (days < 30) {
        return `${days} ngày trước`;
    } else if (months === 1) {
        return "1 tháng trước";
    } else if (months < 12) {
        return `${months} tháng trước`;
    } else if (years === 1) {
        return "1 năm trước";
    } else {
        return `${years} năm trước`;
    }
}