const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const {
        admissionDate,
        class: classParam,
        currentAddress,
        dob,
        email,
        fatherName,
        fatherPhone,
        gender,
        guardianName,
        guardianPhone,
        motherName,
        motherPhone,
        name,
        permanentAddress,
        phone,
        relationOfGuardian,
        roll,
        section,
        systemAccess
    } = req.body;

    const payload = { 
        admissionDate,
        class: classParam,
        currentAddress,
        dob,
        email,
        fatherName,
        fatherPhone,
        gender,
        guardianName,
        guardianPhone,
        motherName,
        motherPhone,
        name,
        permanentAddress,
        phone,
        relationOfGuardian,
        roll,
        section,
        systemAccess
    };
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        admissionDate,
        class: classParam,
        currentAddress,
        dob,
        email,
        fatherName,
        fatherPhone,
        gender,
        guardianName,
        guardianPhone,
        motherName,
        motherPhone,
        name,
        permanentAddress,
        phone,
        relationOfGuardian,
        roll,
        section,
        systemAccess
    } = req.body;

    const payload = {
        userId: id,
        admissionDate,
        class: classParam,
        currentAddress,
        dob,
        email,
        fatherName,
        fatherPhone,
        gender,
        guardianName,
        guardianPhone,
        motherName,
        motherPhone,
        name,
        permanentAddress,
        phone,
        relationOfGuardian,
        roll,
        section,
        systemAccess
    };
    const message = await updateStudent(payload);
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const studentDetail = await getStudentDetail(id);
    res.json(studentDetail);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        status
    } = req.body;

    const { id: reviewerId } = req.user;

    const payload = {
        userId: id,
        reviewerId,
        status
    };
    const message = await setStudentStatus(payload);
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
