export default ConvertTimestamp = (timestamp) => {
    var date = new Date(timestamp * 1000);

    // Lấy thông tin về ngày, tháng, năm
    var day = date.getDate();
    var month = date.getMonth() + 1; //Tháng trong JavaScript bắt đầu từ 0, nên cộng thêm 1
    var year = date.getFullYear();

    // Định dạng chuỗi ngày tháng
    var formattedDate = (day < 10 ? '0' : '') + day + '/' +
                        (month < 10 ? '0' : '') + month + '/' +
                        year;

    return formattedDate;
}