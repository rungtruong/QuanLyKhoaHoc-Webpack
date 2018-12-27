import axios from 'axios';

export function KhoaHocService() {
    this.layDSKH = function () {
        var url = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc';
        return axios({
            method: 'GET',
            url: url,
        })
    }
    this.themKH = function (khoaHocMoi) {
        var url = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc';
        return axios({
            method:'POST',
            url: url,
            data: khoaHocMoi,
        })
    }
    this.xoaKH = function (id) {
        var url = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${id.MaKhoaHoc}`;
        return axios({
            method:'DELETE',
            url: url,
        })
    }
    this.capNhatKH=function name(khoaHocCapNhat) {
        var url = `http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc`;
        return axios({
            method:'PUT',
            url: url,
            data: khoaHocCapNhat,
        })        
    }
}