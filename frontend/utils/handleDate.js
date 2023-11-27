export default HandleDate = (timestamp) => {
    const today = new Date();
    const inputDate = new Date(timestamp * 1000)

    const diffInDays = Math.floor((today - inputDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 'Hôm nay';
      } else if (diffInDays > 0 && diffInDays < 7) {
        return `${diffInDays} ngày trước`;
      } else if (diffInDays >= 7 && diffInDays < 31) {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} tuần trước`;
      } else if (diffInDays >= 31 && diffInDays < 365) {
        const diffInMonths = Math.floor(diffInDays / 31);
        return `${diffInMonths} tháng trước`;
      } else {
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} năm trước`;
      }
}