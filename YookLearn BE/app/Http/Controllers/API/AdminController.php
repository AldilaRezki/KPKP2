<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Imports\AkunImport;
use App\Imports\GuruImport;
use App\Imports\SiswaImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Lecturer;
use App\Models\Account;
use App\Models\Student;
use App\Models\Classes;
use App\Models\Subject;
use Maatwebsite\Excel\Facades\Excel;
use stdClass;

class AdminController extends Controller
{
    public function addAccount(Request $request)
    {

        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
            'role' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $akun = Account::create($input);

        // $success['token'] = $akun->createToken('auth_token')->plainTextToken;
        // $succes['name'] = $akun->nama_user;
        // $succes['role'] = $akun->role;
        // $succes['id'] = $akun->id;

        $res = [
            'succes' => true,
            'massage' => 'Akun berhasil dibuat',
        ];

        return response()->json($res);
    }

    public function getAccount()
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $account = DB::table('accounts')->get();

        return response()->json($account);
    }

    public function getAccountById($id)
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $account = DB::table('accounts')->get(['id', 'role', 'username'])->where('id', $id)->first();

        return response()->json($account);
    }

    public function deleteAccount($id)
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $res = [
            'success' => true,
            'massage' => 'Akun berhasil di hapus'
        ];

        Account::where('id', $id)->delete();

        return response()->json($res);
    }

    public function editAccount(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
            'role' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        if (!$account = DB::table('accounts')->get()->where('id', $id)) {
            $res = [
                'success' => false,
                'message' => 'akun tidak ditemukan'
            ];

            return response()->json($res);
        }


        $input = $request->all();
        $affected = DB::table('accounts')->where('id', $id)->update($input);

        $res = [
            'success' => true,
            'message' => 'akun berhasil di update'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'akun gagal di update'
            ];
        }

        return response()->json($res);
    }

    public function addGuru(Request $request)
    {

        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
            'nama_lengkap' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $guru = $request->all();

        $account['username'] =  $guru['username'];
        $account['password'] = bcrypt($guru['password']);
        $account['role'] = 'guru';
        $account['nama_user'] = $guru['nama_lengkap'];

        if ($akun = Account::create($account)) {

            $guru['id'] = $akun['id'];

            Lecturer::create($guru);

            $res = [
                'success' => true,
                'massage' => 'Berhasil Menambahkan Guru dan Membuat akun guru',
                'id_guru' => $guru['id']
            ];
        } else {
            $res = [
                'success' => false,
                'massage' => 'Gagal Menambahkan guru',
            ];
        }

        return response()->json($res);
    }

    public function getGuru()
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $lecture = DB::table('lecturers')->get();

        return response()->json($lecture);
    }

    public function getGuruById($id)
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $lecture = DB::table('lecturers')->get()->where('id', $id)->first();

        return response()->json($lecture);
    }

    public function updateGuru(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'required',
            'nip' => 'required',
            'golongan' => 'required',
            'pangkat' => 'required',
            'matpel' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        if (!$lecture = DB::table('lecturers')->get()->where('id', $id)) {
            $res = [
                'success' => false,
                'message' => 'guru tidak ditemukan'
            ];

            return response()->json($res);
        }


        $input = $request->all();
        $affected = DB::table('lecturers')->where('id', $id)->update($input);

        if ($affected) {
            $input = [];
            $input['nama_user'] = $request->nama_lengkap;
            DB::table('accounts')->where('id', $id)->update($input);
            $res = [
                'success' => true,
                'message' => 'guru berhasil di update'
            ];
        } else {
            $res = [
                'success' => false,
                'message' => 'guru gagal di update'
            ];
        }

        return response()->json($res);
    }

    public function deleteGuru($id)
    {
        $affected = Account::find($id)->delete();

        $res = [
            'success' => true,
            'message' => 'Guru berhasil dihapus'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'Guru gagal dihapus'
            ];
        }

        return response()->json($res);
    }

    public function addSiswa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'nama_lengkap' => 'required',
            'jenis_kelamin' => 'required',
            'nisn' => 'required',
            'agama' => 'required',
            'id_kelas' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $siswa = $request->all();

        $account['username'] =  $siswa['nisn'];
        $account['password'] = bcrypt($siswa['password']);
        $account['role'] = 'siswa';
        $account['nama_user'] = $siswa['nama_lengkap'];

        if ($akun = Account::create($account)) {

            $siswa['id'] = $akun['id'];

            Student::create($siswa);

            $res = [
                'success' => true,
                'massage' => 'Berhasil Menambahkan siswa dan Membuat akun siswa',
                'id_siswa' => $siswa['id'],
            ];
        } else {

            $res = [
                'success' => false,
                'massage' => 'Gagal Menambahkan siswa'
            ];
        }

        return response()->json($res);
    }

    public function getSiswa()
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $student = DB::table('students')->get();

        return response()->json($student);
    }

    public function getSiswaById($id)
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $student = DB::table('students')->get()->where('id', $id)->first();
        $class = DB::table('classess')->get(['id', 'nama_kelas'])->where('id', $student->id_kelas)->first();
        $student->nama_kelas = $class->nama_kelas;

        return response()->json($student);
    }

    public function updateSiswa(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nisn' => 'required',
            'nama_lengkap' => 'required',
            'jenis_kelamin' => 'required',
            'agama' => 'required',
            'id_kelas' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        if (!$student = DB::table('students')->get()->where('id', $id)) {
            $res = [
                'success' => false,
                'message' => 'siswa tidak ditemukan'
            ];

            return response()->json($res);
        }


        $input = $request->all();
        $affected = DB::table('students')->where('id', $id)->update($input);

        if ($affected) {
            $input = [];
            $input['nama_user'] = $request->nama_lengkap;
            DB::table('accounts')->where('id', $id)->update($input);

            $res = [
                'success' => true,
                'message' => 'siswa berhasil di update'
            ];
        } else {
            $res = [
                'success' => false,
                'message' => 'siswa gagal di update'
            ];
        }

        return response()->json($res);
    }

    public function deleteSiswa($id)
    {
        $affected = Account::find($id)->delete();
        $res = [
            'success' => true,
            'message' => 'Siswa berhasil dihapus'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'Siswa gagal dihapus dihapus'
            ];
        }

        return response()->json($res);
    }

    public function addKelas(Request $request)
    {

        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'nama_kelas' => 'required',
            'id_guru' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $input = $request->all();

        $res = [
            'succes' => true,
            'massage' => 'Kelas berhasil dibuat'
        ];

        $success = Classes::create($input);

        if (!$success) {
            $res = [
                'succes' => false,
                'massage' => 'Kelas Gagal dibuat'
            ];
        }

        return response()->json($res);
    }

    public function getKelas()
    {
        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $class = DB::table('classess')->get();
        $students = DB::table('students')->get();
        $lecturers = DB::table('lecturers')->get();

        foreach ($class as $i) {
            $total = 0;
            foreach ($students as $student) {
                if ($student->id_kelas === $i->id) {
                    $total += 1;
                }
            }
            foreach ($lecturers as $lecturer) {
                if ($lecturer->id === $i->id_guru) {
                    $nama_guru = $lecturer->nama_lengkap;
                }
            }
            $i->nama_guru = $nama_guru;
            $i->jumlah_siswa = $total;
        }

        return response()->json($class);
    }

    public function getSiswaByKelas($classID)
    {
        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $students = DB::table('students')->get()->where('id_kelas', $classID);

        return response()->json($students);
    }

    public function getMapelByKelas($classID)
    {
        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $mapel = DB::table('subjects')->get()->where('id_kelas', $classID);

        foreach ($mapel as $i) {
            $lecture = DB::table('lecturers')->get()->where('id', $i->id_guru)->first();
            $i->nama_guru = $lecture->nama_lengkap;
        }

        return $mapel;
    }

    public function getKelasById($id)
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $class = DB::table('classess')->get()->where('id', $id)->first();
        $lecture = DB::table('lecturers')->get(['id', 'nama_lengkap'])->where('id', $class->id_guru)->first();
        $class->nama_guru = $lecture->nama_lengkap;

        // $subjects = DB::table('subjects')->get()->where('id', $class->id);

        // $class->subjects = $subjects;

        // $res = [
        //     'success' => true,
        //     'class' => $class,
        // ];

        return response()->json($class);
    }

    public function editKelas(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_kelas' => 'required',
            'id_guru' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        if (!$class = DB::table('classess')->get()->where('id', $id)) {
            $res = [
                'success' => false,
                'message' => 'kelas tidak ditemukan'
            ];

            return response()->json($res);
        }


        $input = $request->all();
        $affected = DB::table('classess')->where('id', $id)->update($input);

        $res = [
            'success' => true,
            'message' => 'Kelas berhasil di update'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'Kelas gagal di update'
            ];
        }

        return response()->json($res);
    }

    public function deleteKelas($id)
    {
        $affected = Classes::find($id)->delete();

        $res = [
            'success' => true,
            'message' => 'Kelas berhasil dihapus'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'Kelas gagal dihapus'
            ];
        }

        return response()->json($res);
    }

    public function addMatpel(Request $request)
    {

        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'nama_matpel' => 'required',
            'id_guru' => 'required',
            'id_kelas' => 'required',
            // 'jadwal' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $input = $request->all();

        $res = [
            'succes' => true,
            'massage' => 'Matpel berhasil dibuat'
        ];

        $success = Subject::create($input);

        if (!$success) {
            $res = [
                'succes' => false,
                'massage' => 'Matpel Gagal dibuat'
            ];
        }

        return response()->json($res);
    }

    public function getMatpel()
    {
        $user = auth()->user();

        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $subjects = Subject::get();

        return response()->json($subjects);
    }

    public function getMatpelById($id)
    {
        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        $subject = DB::table('subjects')->get(['id', 'nama_matpel', 'id_guru', 'id_kelas'])->where('id', $id)->first();
        $lecture = DB::table('lecturers')->get(['id', 'nama_lengkap'])->where('id', $subject->id_guru)->first();
        $subject->nama_guru = $lecture->nama_lengkap;

        return response()->json($subject);
    }

    public function editMatpel(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_matpel' => 'required',
            // 'jadwal' => 'required',
            'id_kelas' => 'required',
            'id_guru' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada Kesalahan',
                'data' => $validator->errors(),
            ]);
        }

        $user = auth()->user();
        if ($user['role'] != 'admin') {
            return response()->json([
                'success' => false,
                'massage' => 'Tidak memiliki otoritas',
            ]);
        }

        if (!$subjet = DB::table('classess')->get()->where('id', $id)) {
            $res = [
                'success' => false,
                'message' => 'mata pelajaran tidak ditemukan'
            ];

            return response()->json($res);
        }


        $input = $request->all();
        $affected = DB::table('subjects')->where('id', $id)->update($input);

        $res = [
            'success' => true,
            'message' => 'mata pelajaran berhasil di update'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'mata pelajaran gagal di update'
            ];
        }

        return response()->json($res);
    }

    public function deleteMatpel($id)
    {
        $affected = Subject::find($id)->delete();

        $res = [
            'success' => true,
            'message' => 'mata pelajaran berhasil dihapus'
        ];

        if (!$affected) {
            $res = [
                'success' => false,
                'message' => 'mata pelajaran gagal dihapus'
            ];
        }

        return response()->json($res);
    }

    public function importExcelSiswa(Request $request, $id_kelas)
    {
        $file = $request->file('excel_file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads'), $filename);

        $path = public_path('uploads/' . $filename);

        Excel::import(new SiswaImport, $path);

        $data = DB::table("students")->get(['id', 'nisn', 'nama_lengkap', 'jenis_kelamin', 'agama', 'id_kelas'])->where('id_kelas', $id_kelas);

        return $data;
    }
    public function importExcelGuru(Request $request)
    {

        $file = $request->file('excel_file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads'), $filename);

        $path = public_path('uploads/' . $filename);

        Excel::import(new GuruImport, $path);

        $data = DB::table("lecturers")->get(['id', 'nip', 'nama_lengkap', 'golongan', 'pangkat', 'matpel']);

        return $data;
    }
    public function importExcelAkun(Request $request)
    {

        $file = $request->file('excel_file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads'), $filename);

        $path = public_path('uploads/' . $filename);

        Excel::import(new AkunImport, $path);

        $data = DB::table("accounts")->get(['id', 'username', 'role', 'nama_user']);

        return $data;
    }
}
