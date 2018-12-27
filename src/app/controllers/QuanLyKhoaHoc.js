import { KhoaHocService } from '../services/khoahocservice';
import { KhoaHoc } from '../models/khoahoc';
import Swal from 'sweetalert2';

var dsKhoaHoc = [];
var khoaHocService = new KhoaHocService();

//function get Element By Id
function getEl(id) {
    return document.getElementById(id);
}

// Hiển thị khóa học từ api
khoaHocService.layDSKH().then(function (res) {
    // console.log(res.data);
    for (var i = 0; i < res.data.length; i++) {
        var maKH = res.data[i].MaKhoaHoc;
        var tenKH = res.data[i].TenKhoaHoc;
        var moTa = res.data[i].MoTa;
        var hinhAnh = res.data[i].HinhAnh;
        var luotXem = res.data[i].LuotXem;
        var nguoiTao = res.data[i].NguoiTao;

        var khoaHoc = new KhoaHoc(maKH, tenKH, moTa, hinhAnh, luotXem, nguoiTao);

        dsKhoaHoc.push(khoaHoc);
    }
    // console.log(dsKhoaHoc);
    taoBang(dsKhoaHoc);
})
    .catch(function (ex) {
        console.log(ex.message);
    })

//function xóa khóa học
function xoaKhoaHoc(index) {
    Swal({
        title: 'Bạn chắc chắn?',
        text: "Bạn không thể trở lại được ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'blue',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.value) {
            khoaHocService.xoaKH(dsKhoaHoc[index]).then(function (res) {
                // console.log(res)
                dsKhoaHoc.splice(index, 1);
                taoBang(dsKhoaHoc);
            })
                .catch(function (err) {
                    console.log(err.message);
                })

            Swal(
                'Đã xóa!',
                'Khóa học đã được xóa.',
                'success'
            )
        }
    })
}

window.xoaKhoaHoc = xoaKhoaHoc;

// Hiển thị lại thông tin lên form
function HienThiLenForm(event) {

    var button = event.target;
    var makh = button.getAttribute('data-makh');
    var tenkh = button.getAttribute('data-tenkh');
    var mota = button.getAttribute('data-mota');
    var hinhanh = button.getAttribute('data-hinhanh');
    var luotxem = button.getAttribute('data-luotxem');
    var nguoitao = button.getAttribute('data-nguoitao');

    getEl('maKH').value = makh;
    getEl('tenKH').value = tenkh;
    getEl("moTa").value = mota;
    getEl('hinhAnh').value = hinhanh;
    getEl('luotXem').value = luotxem;
    getEl('nguoiTao').value = nguoitao;

    getEl('maKH').setAttribute("readonly", true);
    getEl('btnThemKH').style.display = "none";
    getEl('btnCapNhatKH').style.display = "block";
}
window.HienThiLenForm = HienThiLenForm;



//function tìm kiếm khóa học theo mã
function timKiemTheoMa() {
    var danhSachCanTim = [];
    var keyword = getEl('txtSearch').value;

    var index = findIndex(dsKhoaHoc, keyword);
    if (index !== -1) {
        danhSachCanTim.push(dsKhoaHoc[index]);
        return danhSachCanTim;
    }
}

//function tìm kiếm khóa học theo tên
function timKiemTheoTen() {
    var danhSachCanTim = [];
    var keyword = getEl('txtSearch').value;

    for (var i = 0; i < dsKhoaHoc.length; i++) {
        if (dsKhoaHoc[i].TenKhoaHoc.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1) {
            danhSachCanTim.push(dsKhoaHoc[i]);
        }
    }
    return danhSachCanTim;
}

// function tìm kiếm
function timKiemKhoaHoc() {
    var dSHienThi = [];
    var keyword = getEl('txtSearch').value;
    if (timKiemTheoMa()) {
        dSHienThi = timKiemTheoMa();
    }
    else if (timKiemTheoTen()) {
        dSHienThi = timKiemTheoTen();
    }
    if (dSHienThi.length === 0) {
        Swal({
            type: 'error',
            title: 'Không tìm thấy...',
            text: 'Khóa học không tồn tại!',
        })
    }
    else {
        taoBang(dSHienThi);
    }
    if (keyword === '') taoBang(dsKhoaHoc);

}

//function thêm khóa học
function themKhoaHoc() {
    var makh = getEl('maKH').value;
    var tenkh = getEl('tenKH').value;
    var mota = getEl("moTa").value;
    var hinhanh = getEl('hinhAnh').value;
    var luotxem = getEl('luotXem').value;
    var nguoitao = getEl('nguoiTao').value;

    var khoaHocMoi = new KhoaHoc(makh, tenkh, mota, hinhanh, luotxem, nguoitao);
    khoaHocService.themKH(khoaHocMoi).then(function (res) {
        // console.log(res);
        dsKhoaHoc.push(khoaHocMoi);
        taoBang(dsKhoaHoc);
    })
        .catch(function (err) {
            console.log(err.message);
        })
}



//Cập nhật khóa học
function findIndex(arr, ma) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].MaKhoaHoc === ma) {
            return i;
        }
    }
    return -1;
}

//function clear giá trị trong form
function clearFormKH() {
    getEl('maKH').value = '';
    getEl('tenKH').value = '';
    getEl("moTa").value = '';
    getEl('hinhAnh').value = '';
    getEl('luotXem').value = '';
    getEl('nguoiTao').value = '';

    getEl('maKH').removeAttribute("readonly", true);
    getEl('btnThemKH').style.display = "block";
    getEl('btnCapNhatKH').style.display = "none";
}



//function cập nhật khóa học
function capNhatKH() {
    var makh = getEl('maKH').value;
    var tenkh = getEl('tenKH').value;
    var mota = getEl("moTa").value;
    var hinhanh = getEl('hinhAnh').value;
    var luotxem = getEl('luotXem').value;
    var nguoitao = getEl('nguoiTao').value;
    var khoaHocCapNhat = new KhoaHoc(makh, tenkh, mota, hinhanh, luotxem, nguoitao);

    khoaHocService.capNhatKH(khoaHocCapNhat).then(function (res) {
        // console.log(res);
        var index = findIndex(dsKhoaHoc, makh);
        dsKhoaHoc[index] = khoaHocCapNhat;
        taoBang(dsKhoaHoc);
        clearFormKH();
    })
        .catch(function (err) {
            console.log(err.message);
        })
}


//function tạo bảng
function taoBang(arr) {
    var content = '';
    for (var i = 0; i < arr.length; i++) {
        var KH = arr[i];
        content += `
            <tr">
                <td class="align-middle">${KH.MaKhoaHoc}</td>
                <td class="align-middle">${KH.TenKhoaHoc}</td>
                <td class="align-middle">${KH.MoTa}</td>
                <td class="align-middle"><img src="${KH.HinhAnh}" alt="hinh anh" width="150px"></td>
                <td class="align-middle">${KH.LuotXem}</td>
                <td class="align-middle">${KH.NguoiTao}</td>
                <td class="align-middle">                
                    <a href="#formKH">
                    <button class="btn btn-info"
                        data-makh = "${KH.MaKhoaHoc}"
                        data-tenkh = "${KH.TenKhoaHoc}"
                        data-mota = "${KH.MoTa}"
                        data-hinhanh = "${KH.HinhAnh}"
                        data-luotxem = "${KH.LuotXem}"
                        data-nguoitao = "${KH.NguoiTao}"
                        onclick = "HienThiLenForm(event)"
                >Cập Nhật</button>
                    </a>
                
                <button class="btn btn-danger" onclick="xoaKhoaHoc('${i}')">Xóa</button>
                </td>
            </tr>
        `
    }
    getEl('tbodyKH').innerHTML = content;
}

getEl('btnTimkiem').addEventListener('click', timKiemKhoaHoc);
getEl('btnThemKH').addEventListener('click', themKhoaHoc);
getEl('btnCapNhatKH').addEventListener('click', capNhatKH);
