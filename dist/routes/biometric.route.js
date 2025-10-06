"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.biometricRouter = void 0;
const express_1 = require("express");
const Student_1 = __importDefault(require("../models/Student"));
const router = (0, express_1.Router)();
router.post("/register-face", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, descriptions } = req.body;
    if (!id) {
        return res.status(400).send({
            message: "Id is required",
        });
    }
    const student = yield Student_1.default.findById(id);
    if (!student) {
        return res.status(404).send({
            message: "Student not found.",
        });
    }
    student.descriptions = descriptions;
    yield student.save();
}));
exports.biometricRouter = router;
